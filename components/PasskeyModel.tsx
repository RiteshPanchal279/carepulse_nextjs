"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModel = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey]);

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedKey);
      setOpen(false);
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  const closeModel = () => {
    setOpen(false);
    router.push("/");
  };
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="space-y-5 bg-[#1a1d21] border-[#363A3D] outline-none !important  ">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src={"/assets/icons/close.svg"}
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModel()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="w-full flex justify-between !important">
              <InputOTPSlot
                className=" text-[25px] sm:text-[30px] md:text-[36px] font-bold justify-center flex border border-[#363A3D] rounded-lg size-11 sm:size-13 md:size-16 gap-4 !important"
                index={0}
              />
              <InputOTPSlot
                className=" text-[25px] sm:text-[30px] md:text-[36px] font-bold justify-center flex border border-[#363A3D] rounded-lg size-11 sm:size-13 md:size-16 gap-4 !important"
                index={1}
              />
              <InputOTPSlot
                className=" text-[25px] sm:text-[30px] md:text-[36px] font-bold justify-center flex border border-[#363A3D] rounded-lg size-11 sm:size-13 md:size-16 gap-4 !important"
                index={2}
              />
              <InputOTPSlot
                className=" text-[25px] sm:text-[30px] md:text-[36px] font-bold justify-center flex border border-[#363A3D] rounded-lg size-11 sm:size-13 md:size-16 gap-4 !important"
                index={3}
              />
              <InputOTPSlot
                className=" text-[25px] sm:text-[30px] md:text-[36px] font-bold justify-center flex border border-[#363A3D] rounded-lg size-11 sm:size-13 md:size-16 gap-4 !important"
                index={4}
              />
              <InputOTPSlot
                className=" text-[25px] sm:text-[30px] md:text-[36px] font-bold justify-center flex border border-[#363A3D] rounded-lg size-11 sm:size-13 md:size-16 gap-4 !important"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="text-red-400 !important text-[14px] font-semibold mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className="bg-green-500 text-white hover:bg-green-500 !important w-full cursor-pointer"
          >
            Enter Admin Passkey{" "}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModel;
