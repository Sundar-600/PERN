import { Router } from "express";
import  {createTask}  from "./controller.js";

const router = Router();

// router.get("/",getTasks);
// create Task
router.post("/",createTask);

export default router;