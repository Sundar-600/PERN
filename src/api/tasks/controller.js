import prisma from "../../db.js";

//Get all tasks
export const getTasks = async (req, res) => {
	try {
		const tasks = await prisma.task.findMany();
		const formattedTasks  = tasks.map(task => ({...task,id: task.id.toString(),userId:task.userId.toString()}));
		return res.status(200).json({data : formattedTasks});
	}catch (err){
		return res.status(404).json({error: err});
	}
}

export const getUserTasks = async (req, res) => {
    // 
    if (!req.body.userId) {
        return res.status(400).json({
            error: "userId field is required in the body"
        })
    }
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
//Get a particular task
export const getSingleTask = async (req, res) => {
    // 
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

// Create a new task
// TODO : Continue Here
export const createTask = async (req, res) => {
    if (!req.body.name || !req.body.userId) {
        return res.status(400).json({
            error: "name and userId field is required in the body"
        })
    }

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

// TODO : Continue from here
export const updateTask = async (req, res) => {
	const id = req.params.id;

	try {
		const task = await prisma.task.update({where : {

		}})
	}catch (err){

	}
}