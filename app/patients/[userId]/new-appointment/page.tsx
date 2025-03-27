import AppointmentForm from "@/components/froms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

import Image from "next/image";

export default async function NewAppointment({params:{userId}}:SearchParamProps) {

const patient = await getPatient(userId);

  return (
    <div className="flex min-h-screen w-screen">
      <section className="w-2/3 flex justify-center p-4">
        <div className="w-full p-2 sm:p-10 sm:ml-4">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-auto "
          />
          <AppointmentForm type="create" userId={userId} patientId ={patient.$id} />

          <p className="text-[#76828D] text-[12px]">©2025 CarePulse</p>
          
        </div>
      </section>

      {/* Right Section - Image Covering Half Screen */}
      <div className="w-1/3 h-screen">
        <Image
          src="/assets/images/appointment-img.png"
          height={1000}
          width={1000}
          alt="appointment"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
