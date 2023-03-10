import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "./authSchema";
import axios from "axios";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type Props = {
  handleAuthModal: (authType?: string) => void;
};

//conffirmpw 빼기
type formData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupContent = ({ handleAuthModal }: Props) => {
  const BASE_URL = "http://localhost:8080";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: formData) => {
    try {
      const request = await axios.post(`${BASE_URL}/signup`, data);
      console.log("회원가입 성공");
    } catch (error) {
      console.error(error);
    }
    handleAuthModal();
  };

  return (
    <div className="w-72 relative">
      <CloseRoundedIcon
        className="absolute -right-3 -top-2 cursor-pointer"
        onClick={() => {
          handleAuthModal();
        }}
      />
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign up</h2>
      </div>
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
        <div className=" mb-7">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            type="password"
            {...register("confirmPassword")}
            autoComplete="false"
            placeholder="********"
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-xs text-red-500 font-semibold">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-gray-900 hover:bg-[#fece2f] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupContent;
