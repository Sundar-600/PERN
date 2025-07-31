import app from "./app.js";

// Here we get the values form .env file
const PORT = 5000;

//This is the main entry point of our app
// Here we make our app start and lisent to the particular port
app.listen(PORT,()=>{
	console.log(`server running on http://localhost:${PORT}`);
});
