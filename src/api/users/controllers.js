import prisma from "../../db.js";

export const createNewUser = async (req, res) => {
	try {
		const user = await prisma.user.create({
			data: {
				name: req.body.name,
			},
		});

		const safeUser = {...user,id : user.id.toString()};

		res.status(201).json({ message : `User ${req.body.name} is successfully created`,data : safeUser });

	} catch (err) {
		res.status(500).json({ error: err });
	}
};

export const getAllUsers = async (req,res) => {
	try {
		const name = req.query.name;
		if(name){
			const filteredUsers = await prisma.user.findMany({
				where : {
					name: {
						contains : name,
						mode: "insensitive"
					}
				}
			});
			const safeFilteredUsers = filteredUsers.map(user => ({
				...user,
				id: user.id.toString(),
			}));
			res.status(200).json({data : safeFilteredUsers})

		} else {
			const users = await prisma.user.findMany();
			// TypeError: Do not know how to serialize a BigInt at JSON.stringify (<anonymous>)
			// Got this error why sending ther users back to the client so either we do not user BigInt in the db fields or use toString() needs to decide
			const safeUsers = users.map(user => ({
				...user,
				id: user.id.toString(),
			}));

			res.status(200);
			res.json({data : safeUsers});
		}

	}catch(err) {
		res.status(500);
		res.json({error : `${err}`});
	}
}


export const getSingleUser = async (req,res) => {
	const id = req.params.id;

	try {
		//NOTE : don't forgot the const before variable it make it global
		const user = await prisma.user.findUnique({
			where : {
				id: id 
			}
		});
		const safeUser = {...user , id : user.id.toString()}
		return  res.status(200).json({data : safeUser});
	}catch(err){
		return res.status(404).json({error:err})
	}	
}

//Update the user name with id 
export const updateUser = async (req,res) => {
	const id = req.params.id;
	const name = req.body.name;

	try {
		const user = await prisma.user.update({
			where : {
				id: id
			},
			data: {
				name : req.body.name
			}
		})

		const safeUser = {...user, id: user.id.toString()};
		return res.status(200).json({data : safeUser})
	}catch(err){
		return res.status(404).json({error:err})
	}
}

//Delete the User with the id
export const deleteUser = async (req,res) => {
	const id = req.params.id 
	try{	
		const user = await prisma.user.delete({
			where : {
				id : id
			}
		});

	const safeUser = {...user, id: user.id.toString()};
	return res.status(200).json({data : safeUser})

	}catch(err){
		return res.status(404).json({error:err})
	}
}