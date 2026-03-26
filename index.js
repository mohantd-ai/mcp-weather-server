import express from "express";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Create MCP server
const server = new Server({
  name: "weather-server",
  version: "1.0.0",
});

// Define a simple tool
server.tool(
  "getWeather",
  {
    city: "string"
  },
  async ({ city }) => {
    return {
      content: [
        {
          type: "text",
          text: `Weather in ${city}: Sunny, 30°C`
        }
      ]
    };
  }
);

// Health check route
app.get("/", (req, res) => {
  res.send("MCP Weather Server Running");
});

// IMPORTANT: SSE endpoint for MCP
app.get("/sse", async (req, res) => {
  await server.handleSSE(req, res);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
