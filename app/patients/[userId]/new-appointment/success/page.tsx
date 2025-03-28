import Image from "next/image";
import Link from "next/link";
import React from "react";

const Success = () => {
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="m-auto flex flex-1 flex-col items-center justify-between gap-10 py-10;">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center ">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={300}
            alt="success"
          />

          <h2 className="text-2xl font-bold md:text-36-bold mb-6 max-w-[470px] text-center">
            Your <span className="text-[#24AE7C]">Appointment request</span> has
            been successfully submited!
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>
        <section className="flex w-full flex-col items-center gap-8 border-y-2 border-[#1A1D21] py-8 md:w-fit md:flex-row">
          <p>Requested Appointment Details</p>
          <div className="flex items-center gap-3">
            {/* <Image 
            src=''
            /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Success;
