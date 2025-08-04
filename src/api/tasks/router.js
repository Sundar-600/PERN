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

// For validate the incomming data
import { body } from "express-validator";

// Custom middleware
import { validator } from "../../../middlewares/validation.js";

const router = Router();

// CREATE Task
router.post("/",
    body("userId").exists().isInt(),
    body("name").exists().isString(),
    validator,
    createTask);

// Read All Tasks
router.get("/", getTasks);
router.get("/:id", getSingleTask)

// UPDATE
router.put("/:id", 
    body("status")
    .isIn(["IN_PROGRESS" ,"COMPLETED" ,"FAILED"] ),
    validator,
    updateTask);

// DELETE 
router.delete("/:id",deleteTask);

export default router;