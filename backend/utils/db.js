    // Connecting a Node.js application to a MongoDB database using Mongoose

    import mongoose from"mongoose"

    const connectDB = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('Mongodb connected successfully');
        } catch (error) {
            console.log('Error: ',error); 
        }
    }
    export default connectDB;