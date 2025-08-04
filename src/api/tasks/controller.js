import prisma from "../../db.js";

//Get all tasks
export const getTasks = async (req, res) => {
	// Get Every Tasks created by all users
	try {
		const tasks = await prisma.task.findMany();
		const formattedTasks  = tasks.map(task => ({...task,id: task.id.toString(),userId:task.userId.toString()}));
		return res.status(200).json({data : formattedTasks});
	}catch (err){
		return res.status(404).json({error: err});
	}
}

// Get all the tasks for the particular user
export const getUserTasks = async (req, res) => {
	try {
		const tasks = await prisma.task.findMany({
			where:{
				userId: req.body.userId
			}
		});
		const formattedTasks  = tasks.map(task => ({...task,id: task.id.toString(),userId:task.userId.toString()}));
		return res.status(200).json({data : formattedTasks});
	}catch (err){
		return res.status(404).json({err : "Something went wrong need to chec"});
	}

}

//Get a particular task by it's id
export const getSingleTask = async (req, res) => {
	const id = req.params.id;
	try {
		const task = await prisma.task.findFirst({
			where:{
				id,
			}
		});
		const formattedTask = {...task,id:task.id.toString(),userId: task.userId.toString()};
		return res.status(200).json({data : formattedTask});
	}catch (err){
		return res.status(404).json({error: err});
	}
}

// Create a new task associated with particular user id
export const createTask = async (req, res) => {
    try {
    	const task  = await prisma.task.create({
    		data : {
    			name : req.body.name,
    			userId : req.body.userId
    		}
    	})
    	const formattedTask = {...task,id: task.id.toString(),userId : task.userId.toString()};
    	return res.status(201).json({data:formattedTask})
    } catch (err) {
    	return res.status(500).json({error : err})
    }
}

// Update a Task by id
export const updateTask = async (req, res) => {
	//Currently testing for now we only update status of the tasks
	const id = req.params.id;
	try {
		const task = await prisma.task.update({where : { 
			id,
		},data:{
			status:req.body.status
		}})
		const formattedTask = {...task,id:task.id.toString(),userId:task.userId.toString()};
		return res.status(201).json({data:formattedTask})
	}catch (err){
		return res.status(500).json({error : err})
	}
}

// Delete task by id
export const deleteTask = async (req,res) =>{
	const id = req.params.id;
	try{
		const task = await prisma.task.delete({where:{id}});
		const formattedTask = {...task,id:task.id.toString(),userId:task.id.toString()}
		return res.status(200).json({data:formattedTask})
	}catch(err){
		return res.status(404).json({error : err })
	}
}