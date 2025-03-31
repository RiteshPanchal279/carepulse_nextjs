import PatientForm from "@/components/froms/PatientForm";
import PasskeyModel from "@/components/PasskeyModel";
import Image from "next/image";
import Link from "next/link";

export default function Home({searchParams}:SearchParamProps) {

const isAdmin = searchParams?.admin==='true';

  return (
    <div className="flex min-h-screen w-screen">
      {isAdmin && (<PasskeyModel/>)}
      <section className="w-full sm:w-1/2 flex items-center justify-center p-4">
        <div className="w-[426px]  ">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-auto "
          />
          <PatientForm />
          <div className="text-14-regular text-white mt-20 flex justify-between items-center space-x-4">
            <p className="text-[#76828D] text-[12px]">©2025 CarePulse</p>
            <Link href="/?admin=true" className="text-[#24AE7C] text-[14px]">
              Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Right Section - Image Covering Half Screen */}
      <div className="w-1/2 h-screen">
        <Image
          src="/assets/images/onboarding-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
