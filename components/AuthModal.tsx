import React from "react";

type Props = {
  haldleAuthModal: (authType?: string) => void;
  isSignin: boolean;
  isSignup: boolean;
};

const AuthModal = ({ haldleAuthModal, isSignin, isSignup }: Props) => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
        <div className="bg-white rounded-lg p-6">
          {isSignin ? "로그인" : "회원가입"}
          <button
            onClick={() => {
              haldleAuthModal();
            }}
          >
            버튼
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
