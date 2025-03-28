"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CaustomeFormField from "../CaustomeFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation} from "@/lib/validation";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploder from "../FileUploder";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };
      // @ts-ignore
      const patient = await registerPatient(patientData);
      if (patient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9 flex-1">
        <section className="mb-12 space-y-3">
          <h1 className="text-2xl font-semibold">Welcome👋</h1>
          <p className="text-[#ABB8C4] text-sm">
            Let us know more about yourself.
          </p>
        </section>
        <section className="mb-12 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="font-semibold text-2xl">Personal Information</h2>
          </div>
        </section>

        <CaustomeFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="FullName"
          placeholder="Ritesh Panchal"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CaustomeFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of Birth"
            dateFormate="MM/dd/yyy"
          />
          <CaustomeFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between "
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div
                      key={option}
                      className="flex items-center gap-2 border-2 border-dotted px-2 border-[#363A3D] py-1 bg-[#1A1D21] rounded-md  "
                    >
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CaustomeFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="14th Street, Mumbai"
          />
          <CaustomeFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CaustomeFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emergency contact name"
            placeholder="Guirdian's name"
          />

          <CaustomeFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency contact number"
            placeholder="(555) 123-4567"
          />
        </div>

        <section className="mb-12 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="font-semibold text-2xl">Medical Information</h2>
          </div>
        </section>

        <CaustomeFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select a physician"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className="rounded-full border border-[#363A3D] "
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CaustomeFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CaustomeFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="ex:BlueCorss  "
          />

          <CaustomeFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="ex:ABC1234567 "
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row ">
          <CaustomeFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies(if any)"
            placeholder="ex:Peanuts,Penicillin,Pollen  "
          />

          <CaustomeFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current Medication"
            placeholder="ex:lbuprofen200mg "
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CaustomeFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family medical history"
            placeholder="ex: Mother blood pressure "
          />

          <CaustomeFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="ex:Asthma diagnosis in childhood "
          />
        </div>

        <section className="mb-12 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="font-semibold text-2xl">
              Indetification and Verification
            </h2>
          </div>
        </section>

        <CaustomeFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select identification type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CaustomeFormField>

        <CaustomeFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="ex: 1234567"
        />

        <CaustomeFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocumentId"
          label="Scanned copy of identification document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploder files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="mb-12 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="font-semibold text-2xl">Consent and Privacy</h2>
          </div>
        </section>

        <CaustomeFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to reacive treatment for my health condition."
        />
        <CaustomeFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to the use and disclosure of my helth information for treatment purposes."
        />
        <CaustomeFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I acknowlrdge that i have reviewed and agree to the privacy policy."
        />

        <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
