import React, { useRef } from "react";
import axios from "axios";

type Props = {
  handleAuthModal: (authType?: string) => void;
};

const SignupContent = ({ handleAuthModal }: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignup = async () => {
    console.log({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    });
    try {
      const request = await axios.post("http://localhost:8080/signup", {
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      });
      console.log("signup successful!");
    } catch (error) {
      console.error(error);
    }
    handleAuthModal();
  };

  return (
    <div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Sign up</h2>
        <p className="text-gray-500 mb-6">
          Get started today by entering just a few details
        </p>
      </div>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            ref={emailRef}
            placeholder="Email address"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            ref={passwordRef}
            placeholder="********"
          />
        </div>
        <div className="mb-8">
          <label className="flex items-center">
            <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm">
              I agree to the
              <a href="#" className="text-blue-500 hover:underline">
                Terms of Service
              </a>
              and
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => handleSignup()}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupContent;
