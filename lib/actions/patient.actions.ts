"use server"
import { ID, Query } from "node-appwrite"
import { database, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils"
import {InputFile} from "node-appwrite/file"

export const createUser = async (user : CreateUserParams)=>{
   try {
      const newUser = await users.create(ID.unique(),user.email,user.phone,undefined,user.name);

      return parseStringify(newUser);

   } catch (error:any) {
      if(error && error?.code===409){
         const documents = await users.list([
            Query.equal('email',[user.email])
         ])
         return documents?.users[0]
      }
      console.error("An error occurred while creating a new user:", error);
   }
}

export const getUser=async (userId:string)=>{
   try {
      const user = await users.get(userId);

      return parseStringify(user)
   } catch (error) {
      console.log("Registerr user error: ",error)
   }
}

export const registerPatient = async({identificationDocument,...patient}:RegisterUserParams)=>{

   try {
      let file;
      if(identificationDocument){
         const inputFile = identificationDocument && InputFile.fromBuffer(
            identificationDocument?.get('blobFile') as Blob,
            identificationDocument?.get('fileName') as string,
         )

         file = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!,ID.unique(),inputFile)
      }

      const newPatient = await database.createDocument(
         process.env.NEXT_PUBLIC_DATABASE_ID!,
         process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
         ID.unique(),
         {
            identificationDocumentId:file?.$id||null,
            identificationDocumentUrl:file?.$id?`${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`:null,
            ...patient
         }
      )
      return parseStringify(newPatient);

   } catch (error) {
      console.log("An error occurred while creating a new patient:", error)
   }
}