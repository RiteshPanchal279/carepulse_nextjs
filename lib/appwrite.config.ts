import * as sdk from 'node-appwrite';

const client = new sdk.Client();

client
   .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
   .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
   .setKey(process.env.NEXT_PUBLIC_API_KEY!);


export const database = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const messaging = new sdk.Messaging(client)
export const users = new sdk.Users(client)
