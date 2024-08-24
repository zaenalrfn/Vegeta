"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/services/auth";
import {signIn} from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";


type UserAuthForm = {
  email: string;
  password: string;
  name: string;
  confirm_password: string | undefined;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    name: yup.string().required(),
    confirm_password: yup.string().oneOf([yup.ref("password")], "Password must match!"),
  })
  .required();

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
  const searchParams = useSearchParams()
  const router = useRouter()
  const {toast} = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserAuthForm>({
    resolver: yupResolver(schema),
  });

  // redux
  const [registerMutation] = useRegisterMutation()

  const onSubmit = async (data: UserAuthForm) => {
    try {
      const res = await registerMutation(data).unwrap() // unwrap agar cuma ngambil data penting saja
      if (res.success) {
        const user = await signIn('credentials', {
          email: data.email,
          password: data.password,
          callbackUrl: searchParams.get('callbackUrl') ||  "/", // untuk ngedirect ke halaman yang sebelumnya kita akses terlebih dahulu
          redirect: false
        })
        router.push(user?.url || "/") 
      } else {
        toast({
          title: "Something went wrong",
          description: "Please check your email and password",
          variant: "destructive",
          duration: 2000
        })
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[100%]">
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">Buat akun baru</div>
      <Input className="w-[100%] p-4 rounded-sm mt-4" type="text" placeholder="Nama Lengkap" {...register("name")} error={errors.name?.message} />
      <Input className="w-[100%] p-4 rounded-sm" type="text" placeholder="Email" {...register("email")} error={errors.email?.message} />
      <Input
        className="w-[100%] p-4 rounded-sm mt-4"
        type={showPassword ? "text" : "password"}
        placeholder="Kata Sandi"
        suffix="Eye"
        onPressSuffix={() => setShowPassword(!showPassword)}
        {...register("password")}
        error={errors.password?.message}
      />
      <Input
        className="w-[100%] p-4 rounded-sm mt-4"
        type={showConfirmationPassword ? "text" : "password"}
        placeholder="Konfirmasi Kata Sandi"
        suffix="Eye"
        onPressSuffix={() => setShowConfirmationPassword(!showConfirmationPassword)}
        {...register("confirm_password")}
        error={errors.confirm_password?.message}
      />

      <Button type="submit" className={cn("w-[320px] bg-leaf mt-6 mx-auto", hover.shadow)}>
        Buat Akun
      </Button>
    </form>
  );
}

export default SignUpForm;
