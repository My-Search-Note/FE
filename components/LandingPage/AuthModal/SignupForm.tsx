import React from "react";
import FormInput from "./FormInput";

interface Props {
  handleSubmit: any;
  handleSignup: any;
  register: any;
  errors: any;
}

const SignupForm = ({
  handleSubmit,
  handleSignup,
  register,
  errors,
}: Props) => (
  <form onSubmit={handleSubmit(handleSignup)}>
    <FormInput
      label="Name"
      type="name"
      register={register}
      errors={errors}
      placeholder="Name"
    />
    <FormInput
      label="Email"
      type="email"
      register={register}
      errors={errors}
      placeholder="Email address"
    />
    <FormInput
      label="Password"
      type="password"
      register={register}
      errors={errors}
      placeholder="********"
    />
    <FormInput
      label="Confirm Password"
      type="password"
      register={register}
      errors={errors}
      placeholder="********"
    />
    <div className="flex justify-center">
      <button
        className="w-full bg-gray-900 hover:bg-[#fece2f] text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
    </div>
  </form>
);

export default SignupForm;
