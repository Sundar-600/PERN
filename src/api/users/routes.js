 import { Router } from "express";
 import { createNewUser, getAllUsers } from "./controllers.js";
import { getUserTasks } from "../tasks/controller.js";

 const router = Router();

 //CREATE
 router.post("/",createNewUser);
 //READ
 router.get("/",getAllUsers);
 //NOT IMPLEMENTED 
 // Read by Id 
 // router.get("/:id",getSingleUser);
 router.get("/tasks",getUserTasks);

 //UPDATE
 // router.put("/:id",updateUser);
 // router.patch("/:id",updateUser); // Update Partially ??

 //DELETE
 // router.delete("/:id",deleteUser);
 export default router;