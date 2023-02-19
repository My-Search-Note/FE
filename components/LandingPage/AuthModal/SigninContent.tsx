import Reac, { useRef } from "react";
import axios from "axios";

type Props = {
  handleAuthModal: (authType?: string) => void;
};

const SigninContent = ({ handleAuthModal }: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/signin", {
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      });
      const { token } = response.data;
      console.log(token); //token 저장하기
      handleAuthModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Sign in</h2>
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
        <div className="mb-2">
          <label className="flex items-center">
            <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm">Remember me</span>
          </label>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => handleSignin()}
          >
            Sign up
          </button>
        </div>
      </form>
      <div className="mt-4 text-sm text-center">
        <span>
          Don't have an account yet?
          <button
            className="font-bold underline cursor-pointer ml-1"
            onClick={() => {
              handleAuthModal("Signup");
            }}
          >
            Sign up
          </button>
        </span>
      </div>
    </div>
  );
};

export default SigninContent;
