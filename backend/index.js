/**
 * -----------------------------------------
 * Basic Express Server Setup
 * -----------------------------------------
 * Initializes an Express app with:
 *  - CORS enabled for cross-origin requests
 *  - JSON body parsing middleware
 *
 * Routes:
 *  - GET "/" → simple health check endpoint
 *
 * The server listens on PORT 5001 (localhost)
 * and logs a confirmation message when running.
 *
 * This serves as the backend entry point for
 * the Pisayian Hackathon project.
 * 
 * By: Nolan Dela Rosa
 * October 3, 2025
 */
import express from "express";
import cors from "cors";
import transformRoute from "./routes/transform.js";
import normalizeRoute from "./routes/normalize.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => res.send("Backend is running!"));
app.use("/api/transform", transformRoute);
app.use("/api/normalize", normalizeRoute);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
