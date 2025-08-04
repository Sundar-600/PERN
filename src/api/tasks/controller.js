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

export const getUserTasks = async (req, res) => {
    // Get only tasks created by a particular user
	try {
		const tasks = await prisma.task.findMany({
			where:{
				userId:req.body.userId,
			}
		});
		const formattedTasks  = tasks.map(task => ({...task,id: task.id.toString(),userId:task.userId.toString()}));
		return res.status(200).json({data : formattedTasks});
	}catch (err){
		return res.status(404).json({error: err});
	}

}

export const getSingleTask = async (req, res) => {
	//Get a particular task
	id = req.params.id;
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

export const createTask = async (req, res) => {
	// Create a new task associated with particular id
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

export const deleteTask = async (req,res) =>{
	// Delte task by id
	const id = req.params.id;
	try{
		const task = await prisma.task.delete({where:{id}});
		const formattedTask = {...task,id:task.id.toString(),userId:task.id.toString()}
		return res.status(200).json({data:formattedTask})
	}catch(err){
		return res.status(404).json({error : err })
	}
}