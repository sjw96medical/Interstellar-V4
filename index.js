import express from "express";
import http from "node:http";
import createBareServer from "@tomphttp/bare-server-node";
import path from "node:path";
import fs from "node:fs";
import * as dotenv from "dotenv";
dotenv.config();

const __dirname = process.cwd();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/bare/");
const popularityFile = path.join(__dirname, "data", "popular.json");

function readPopularity() {
  try {
    return JSON.parse(fs.readFileSync(popularityFile, "utf8"));
  } catch (error) {
    return {};
  }
}

function writePopularity(popularity) {
  const temporaryFile = `${popularityFile}.tmp`;
  fs.writeFileSync(temporaryFile, JSON.stringify(popularity, null, 2));
  fs.renameSync(temporaryFile, popularityFile);
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/api/popular", (req, res) => {
  const items = Object.values(readPopularity()).sort((left, right) => right.count - left.count);
  res.json({ item: items[0] || null });
});

app.post("/api/popular", (req, res) => {
  const { url, name, category, icon } = req.body || {};
  if (typeof url !== "string" || !/^https?:\/\//i.test(url) || url.length > 2048) {
    return res.status(400).json({ error: "A valid URL is required" });
  }

  const key = url.trim();
  const popularity = readPopularity();
  const current = popularity[key] || {};
  popularity[key] = {
    name: typeof name === "string" && name.trim() ? name.trim().slice(0, 120) : current.name || new URL(key).hostname,
    url: key,
    category: typeof category === "string" && category.trim() ? category.trim().slice(0, 40) : current.category || "Site",
    icon: typeof icon === "string" ? icon.slice(0, 2048) : current.icon || "",
    count: (current.count || 0) + 1,
  };
  writePopularity(popularity);
  return res.status(201).json({ item: popularity[key] });
});

app.use(express.static(path.join(__dirname, "static")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.get("/photography", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "search.html"));
});
  app.get("/blank", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "blank.html"));
  });

app.get("/mathematics", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "play.html"));
});

app.get("/forest", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "widgetbot.html"));
});

app.get("/go", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "go.html"));
});

app.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "settings.html"));
});

app.get("/donate", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "donate.html"));
});

app.get("/ocean", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "apps.html"));
});

app.get("/404", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "static", "404.html"));
});

app.get("/service/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "static", "404.html"));
});

app.get("/bare/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "static", "404.html"));
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "static", "404.html"));
});

// Bare Server
server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`Interstellar running at http://localhost:${process.env.PORT}`);
});

server.listen({
  port: process.env.PORT,
});