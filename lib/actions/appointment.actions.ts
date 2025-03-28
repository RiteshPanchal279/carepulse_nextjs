'use server'

import { ID } from "node-appwrite";
import { database } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment =async (appointment:CreateAppointmentParams)=>{
   try {
      const newAppointment = await database.createDocument(
         process.env.NEXT_PUBLIC_DATABASE_ID!,
         process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
         ID.unique(),appointment
      )
      return parseStringify(newAppointment);
   } catch (error) {
      console.log( "Error create new Appointment",error)
   }
}

export const getAppointment=async(appointmentId:string)=>{
   try {
      const appointment = await database.getDocument(
         process.env.NEXT_PUBLIC_DATABASE_ID!,
         process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
         appointmentId
      )
      return parseStringify(appointment);

   } catch (error) {
      console.log("error get appintment ",error)
   }

}