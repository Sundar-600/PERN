 import { Router } from "express";
 import { deleteUser,createNewUser, getAllUsers ,getSingleUser,updateUser} from "./controllers.js";
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
 //All users and search filtered users by name
 router.get("/",getAllUsers);

 // Note : Put the named routes first or else it picks the dynamic routes
 router.get("/tasks",
 	body("userId").exists().isInt(),
 	validator,
 	getUserTasks);

 // Read by Id 
 router.get("/:id",getSingleUser);


 //UPDATE
 router.put("/:id",
 	body("name")
 	.exists()
 	.isString(),
 	validator,
 	updateUser);

 //DELETE
 router.delete("/:id",deleteUser);


 export default router;