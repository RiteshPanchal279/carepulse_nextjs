import RegisterForm from "@/components/froms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex min-h-screen w-screen">
      <section className="w-2/3 flex justify-center p-4">
        <div className="w-full p-2 sm:p-10 sm:ml-4   ">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-auto "
          />
          <RegisterForm user={user} />

          <p className="text-[#76828D]  justify-items-end text-center pt-10 text-[12px] xl:text-left ">©2025 CarePulse</p>
        </div>
      </section>

      {/* right image div */}
      <div className="w-1/3 h-screen fixed right-0 top-0">
        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
