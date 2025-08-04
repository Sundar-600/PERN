import express from "express";
//import morgan from "morgan" // For now commented for deployment
import userRoutes from "./api/users/router.js";
import taskRoutes from "./api/tasks/router.js";

const app = express();

// We will add any Middlewares before it 

// Morgan gives us the logging info about the request 
// app.use(morgan("dev"));

// express.json automatically convert the body of the POST request to easily work with
app.use(express.json());

// This is for query parameters
app.use(express.urlencoded({"extended":true}))

// This is the main entry point of API Routes
// Here we will redirect to different Routes
app.use("/api/users",userRoutes);
app.use("/api/tasks",taskRoutes);

// TODO : Later understand and put the Error Handlers here and end of every other sub routes

export default app;
