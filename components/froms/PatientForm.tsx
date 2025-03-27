"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
} from "@/components/ui/form"
import CaustomeFormField from "../CaustomeFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"


export enum FormFieldType{
  INPUT="input",
  TEXTAREA="textarea",
  PHONE_INPUT="phone input",
  CHECKBOX="checkbox",
  DATE_PICKER="datepiker",
  SELECT="select",
  SKELETON="skeleton",
}


const  PatientForm=()=> {

  const router = useRouter();
  const[isLoading,setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })


const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
  setIsLoading(true);

  try {
    const user = {
      name: values.name,
      email: values.email,
      phone: values.phone,
    };

    const newUser = await createUser(user);
    console.log(newUser)

    if (newUser) {
      router.push(`/patients/${newUser.$id}/register`);
    }
  } catch (error) {
    console.log(error);
  }

  setIsLoading(false);
};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex-1 ">
        <section className="mb-12 space-y-3">
          <h1 className="text-2xl font-semibold">Hi there 🤚👋</h1>
          <p className="text-[#ABB8C4] text-sm">Schedule your first appointment.</p>
        </section>

        <CaustomeFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full name"
        placeholder="Ritesh Panchal"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />
        <CaustomeFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="email"
        label="Email"
        placeholder="ritesh@example.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
        />
        <CaustomeFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Phone Number"
        placeholder="(555) 123-4567"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}


export default PatientForm