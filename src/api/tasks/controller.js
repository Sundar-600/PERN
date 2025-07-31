
//Get all tasks
export const getAllTasks = (req,res) => {
// TODO : Once prisma configured and figured out how the ORM works query all the task created by the user 
}

//Get a particular task
export const getSingleTask = (req,res) => {
	// 
}

// Create a new task
export const createTask = (req,res) => {
	if(!req.body.name)
	{
		res.status(400);
		res.json({error :"name is Required"})
	}

	res.status(201);
	res.json({
			task:`${req.body.name} created successfully`
		});
}