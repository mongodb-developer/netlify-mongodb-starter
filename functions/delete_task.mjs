import { ObjectId } from "mongodb";
import getConnection from "../lib/db.mjs";

export async function handler(event, context) {
    // delete a task from the database
    try {
        // Get the connection to the database
        const client = await getConnection();
        const database = client.db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);

        // Get the task data from the request body
        const { queryStringParameters } = event;
        const { id } = queryStringParameters;
        console.log('id', id);

        // delete the task from the database
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

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