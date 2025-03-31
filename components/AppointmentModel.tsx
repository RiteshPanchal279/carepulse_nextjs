"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import AppointmentForm from "./froms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";

const AppointmentModel = ({
  type,
  patientId,
  userId,
  appointmentId,
}: {
  type: "schedule" | "cancel";
  patientId:string;
  userId:string;
  appointmentId?:Appointment;
  
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-[#24AE7C]"}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className=" bg-[#1A1D21] border-[#363A3D]!important sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to cancel an appointment
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
         userId={userId}
         patientId={patientId}
         type={type}
         setOpen={setOpen}
         appointment={appointmentId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModel;
