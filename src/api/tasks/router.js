import {
    Router
} from "express";
import {
    createTask,
    getTasks,
    getSingleTask,
    updateTask,
    deleteTask
} from "./controller.js";

const router = Router();

// CREATE Task
router.post("/", createTask);

// Read All Tasks
router.get("/", getTasks);
router.get("/:id", getSingleTask)

// UPDATE
router.put("/:id", updateTask);

// DELETE 
router.delete("/:id",deleteTask);

export default router;