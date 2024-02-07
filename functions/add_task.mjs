import getConnection from "../lib/db.mjs";  
import { ObjectId } from "mongodb";
/*
    * This function is the main entry point for the Lambda function.
    * It uses the event data to add a task to the database.
    */
export async function handler(event, context) {
    try {
        // Get the connection to the database
        const client = await getConnection();
        const database = client.db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);

        // Get the task data from the request body
        const { body } = event;
        const task = JSON.parse(body);

        // Add the task to the database
        const result = await collection.insertOne(task);
        console.log(`Added task with id ${result.insertedId}`);

        // Return a 200 response if the operation succeeded
        return {
            statusCode: 200,
            body: JSON.stringify({...task, _id: result.insertedId})
        };
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error'
        };
    }
}
