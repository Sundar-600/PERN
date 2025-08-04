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
		const users = await prisma.user.findMany()
		// TypeError: Do not know how to serialize a BigInt at JSON.stringify (<anonymous>)
		// Got this error why sending ther users back to the client so either we do not user BigInt in the db fields or use toString() needs to decide
		const safeUsers = users.map(user => ({
		      ...user,
		      id: user.id.toString(),
		    }));
		res.status(200);
		res.json({data : safeUsers});
	}catch(err) {
		res.status(500);
		res.json({error : `${err}`});
	}
}


// export const getUsers = (req,res) =>