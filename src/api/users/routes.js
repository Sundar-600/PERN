 import { Router } from "express";
 import { createNewUser, getAllUsers } from "./controllers.js";
import { getUserTasks } from "../tasks/controller.js";
import { body } from "express-validator";
import { validator } from "../../../middlewares/validation.js";

 const router = Router();

 //CREATE
 // future the body().ex... all things will be in a schema with the appropriate error messages
 router.post("/",
 	body("name")
 	.exists()
 	.isString()
 	.isLength({min:1,max:10})
 	.withMessage("The name length must be between 1 to 10"),
 	validator,
 	createNewUser);

 //READ
 router.get("/",getAllUsers);
 //NOT IMPLEMENTED 

 // Read by Id 
 // router.get("/:id",getSingleUser);

 router.get("/tasks",
 	body("userId").exists().isInt(),
 	validator,
 	getUserTasks);

 //UPDATE
 // router.put("/:id",updateUser);
 // router.patch("/:id",updateUser); // Update Partially ??

 //DELETE
 // router.delete("/:id",deleteUser);
 export default router;