"use client";

import { signIn } from "next-auth/react";
import axios from "axios";
import { Fira_Code } from "next/font/google";
import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../navbar/Button";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      // name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if(callback?.ok) {
        toast.success("Logged in");
        router.refresh()
        LoginModal.onClose()
      }
      if(callback?.error) {
        toast.error(callback.error)
      }
    });

    // axios
    //   .post("/api/register", data)
    //   .then(() => {
    //     registerModal.onClose();
    //   })
    //   .catch((error) => {
    //     toast.error("aaaa");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="login to your account account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {/* <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      /> */}
      <Input
        id="password"
        label="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="continue with fg"
        icon={AiFillGoogleCircle}
        onClick={() => {}}
      />
      <Button outline label="continue with gf" icon={AiFillGithub} onClick={() => {}} />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="text-neutral-800 cursor-pointer hower:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={LoginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;