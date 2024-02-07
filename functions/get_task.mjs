import getConnection from '../lib/db.mjs';

export async function handler(event, context) {
    try {
        const client = await getConnection();
        
        const database = client.db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);

        // Get Params
        const { queryStringParameters } = event;
        const { id } = queryStringParameters;
        let filter = {};
        if (id){
            filter = { title: new RegExp(id, 'i') };
        }

        // Replace with the actual logic for your function
        const data = await collection.find(filter).limit(10).toArray();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error'
        };
    }
};