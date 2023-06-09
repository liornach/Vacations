import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import vacationsRoutes from "./6-routes/vacations-routes";
import routeNotFound from "./3-middleware/router-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import authRoute from "./6-routes/auth-routes";
import path from "path";

const server = express();

// CORS:
server.use(cors());

// Create request body if json was sent:
server.use(express.json());

// Get files sent by front
server.use(expressFileUpload());

// Route requests:
server.use("/api" , vacationsRoutes);
server.use("/api", authRoute)



// Serve static assets
server.use(express.static(path.join(__dirname, "../../Frontend/public")));

// Handle SPA fallback for any route
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../Frontend/public", "index.html"));
});

// Route not found:
server.use(routeNotFound);

// Handle all errors that are not handled above:
server.use(catchAll);

// Run server:
server.listen(appConfig.port , ()=> console.log("Listening on http://localhost:" + appConfig.port));
