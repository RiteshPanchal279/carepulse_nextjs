'use server'

import { ID, Query } from "node-appwrite";
import { database, messaging } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { formatDateTime } from "@/lib/utils";
import { revalidatePath } from "next/cache";

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

export const getRecentAppointmentList = async ()=>{
   try {
      const appointments = await database.listDocuments(
         process.env.NEXT_PUBLIC_DATABASE_ID!,
         process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
         [Query.orderDesc('$createdAt')]
      );

      const initialCounts={
         scheduledCount:0,
         pendingCount:0,
         cancelledCount:0
      }

      const counts=(appointments.documents as Appointment[]).reduce((acc,appointment)=>{
         if(appointment.status==='scheduled'){
            acc.scheduledCount +=1;
         }else if(appointment.status ==='pending'){
            acc.pendingCount +=1;
         }
         else if(appointment.status ==='cancelled'){
            acc.cancelledCount +=1;
         }

         return acc;
      },initialCounts)

      const data={
         totalCount:appointments.total,
         ...counts,
         documents:appointments.documents
      }

      return parseStringify(data)

   } catch (error) {
      console.log("Error getRecentAppointmentList: ",error)
   }
}

export const updateAppointment=async({appointmentId,userId,appointment,type}:UpdateAppointmentParams)=>{
   try {
      const updatedAppointment = await database.updateDocument(
         process.env.NEXT_PUBLIC_DATABASE_ID!,
         process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
         appointmentId,
         appointment
      )
      if(!updatedAppointment){
         throw new Error('Appointment not found');
      }
      // todo SMS notification
      const smsMessage=`
      Hi, it's CarePulse. ${type==='schedule'? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}.`: `We regret to inform you that appointment has been cancelled for the following reason: ${appointment.cancellationReason}`
      } `

      await sendSMSNotification(userId,smsMessage);
      revalidatePath('/admin')
      return parseStringify(updatedAppointment)

   } catch (error) {
      console.log(error)
   }
}

export const sendSMSNotification = async(userId:string,content:string)=>{
   try {
      const message=await messaging.createSms(
         ID.unique(),
         content,
         [],
         [userId]
      )
      return parseStringify(message)
      
   } catch (error) {
      console.log(error)
   }
}