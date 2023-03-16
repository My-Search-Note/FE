import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "./authSchema";
import Cookies from "js-cookie";
import axios from "axios";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type Props = {
  handleAuthModal: (authType?: string) => void;
};

type formData = {
  email: string;
  password: string;
};

const SigninContent = ({ handleAuthModal }: Props) => {
  const BASE_URL = "http://localhost:8080/api";

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = async (data: formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/signin`, data);
      const { token } = response.data;
      Cookies.set("token", token); //token 저장하기
      console.log(Cookies.get("token"));
      handleAuthModal(); //모달 닫는 함수

      router.push("/search");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-72 relative">
      <CloseRoundedIcon
        className="absolute -right-3 -top-2 cursor-pointer"
        onClick={() => {
          handleAuthModal();
        }}
      />
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign in</h2>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : ""
            }`}
            type="email"
            {...register("email")}
            autoComplete="off"
            placeholder="Email address"
          />
          {errors.email && (
            <p className="mt-2 text-xs text-red-500 font-semibold">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? "border-red-500" : ""
            }`}
            type="password"
            {...register("password")}
            autoComplete="off"
            placeholder="********"
          />
          {errors.password && (
            <p className="mt-2 text-xs text-red-500 font-semibold">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-2">
          <label className="flex items-center">
            <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm">Remember me</span>
          </label>
        </div>
        <div className="flex justify-center">
          <button
            className=" bg-gray-900 hover:bg-[#fece2f] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="mt-4 text-sm text-center">
        <span>
          Don't have an account yet?
          <button
            className="font-bold underline cursor-pointer ml-1"
            // // onClick={() => {
            //   //   handleAuthModal("Signup");
            // }}
          >
            Signup
          </button>
        </span>
      </div>
    </div>
  );
};

export default SigninContent;
