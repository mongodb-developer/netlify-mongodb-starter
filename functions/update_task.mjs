import { ObjectId } from "mongodb";
import getConnection from "../lib/db.mjs";  
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
        const {_id, status} = JSON.parse(body);
        console.log('body', body);

        // update the task to the database
        const result = await collection.findOneAndUpdate({_id: new ObjectId(_id)}, {$set: {status: status}}, {returnDocument: 'after'});

        // Return a 200 response if the operation succeeded
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error'
        };
    }
}
