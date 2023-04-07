import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "./authSchema";
import { emailVerification } from "@/apis/User";
import { userInfoAtom } from "@/atoms/userAtoms";
import { SignUpInfoWithConfirm } from "@/interfaces/user";
import { atom, useAtom } from "jotai";
import SignupForm from "./SignupForm";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import VerificationInput from "./VerificationInput";

interface Props {
  handleAuthModal: (authType?: string) => void;
}

// 이전에 만들어 둔 Jotai atom
const showVerificationAtom = atom(false);

const SignupContent = ({ handleAuthModal }: Props) => {
  // useForm Hook을 사용하여 폼 상태를 관리
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInfoWithConfirm>({
    resolver: yupResolver(signupSchema), // yup으로 유효성 검사 스키마 적용
  });

  // Jotai Hook을 사용하여 showVerificationAtom 상태와 상호작용
  const [showVerification, setShowVerification] = useAtom(showVerificationAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  const emailVerificationMutation = emailVerification(); // 이메일 인증에 필요한 Mutation

  const handleSignup = async (data: SignUpInfoWithConfirm) => {
    const userInfo = {
      email: data.email,
      name: data.name,
      password: data.password,
    };
    setUserInfo(userInfo);
    emailVerificationMutation.mutateAsync(userInfo.email);
    setShowVerification(true);
  };

  const handleCloseVerification = () => {
    if (showVerification) {
      const confirmed = window.confirm("Would you like to cancel your Signup?");
      if (confirmed) {
        setShowVerification(false);
        handleAuthModal();
      }
    } else {
      handleAuthModal();
    }
  };

  return (
    <div className="w-72 relative">
      <CloseRoundedIcon
        className="absolute -right-3 -top-2 cursor-pointer"
        onClick={() => {
          handleCloseVerification();
        }}
      />
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign up</h2>
        <div className="w-full flex justify-center gap-x-2 items-center mb-4">
          <div
            className={`h-1 w-1/5 ${
              showVerification ? "bg-gray-700" : "bg-gray-600 dark:bg-gray-300"
            }`}
          />
          <div
            className={`h-1 w-1/5 ${
              showVerification ? "bg-gray-700" : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        </div>
      </div>
      {!showVerification ? (
        // SignupForm 컴포넌트를 렌더링
        <div>
          <SignupForm
            handleSubmit={handleSubmit}
            handleSignup={handleSignup}
            register={register}
            errors={errors}
          />
          <div className="mt-4 text-sm text-center">
            <span>
              Already a member?
              <button
                className="font-bold underline cursor-pointer ml-1"
                onClick={() => {
                  handleAuthModal("Signin");
                }}
              >
                Signin
              </button>
            </span>
          </div>
        </div>
      ) : (
        // VerificationInput 컴포넌트를 렌더링
        <VerificationInput
          userInfo={userInfo}
          handleAuthModal={handleAuthModal}
        />
      )}
    </div>
  );
};

export default SignupContent;
