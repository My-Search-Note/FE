import axiosConfig from "./axiosConfig";
import axios from "axios";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { verificationCodeAtom } from "@/atoms/userAtoms";

interface userInfo {
  email: string;
  verificationCode: number;
}

const BASE_URL = "http://localhost:8080/user";

export const signIn = () => {
  return useMutation(
    async (data) => {
      const url = `${BASE_URL}/signin`;
      const res = await axios.post(url, data);
      return res.data;
    },
    {
      onSuccess: (data) => {
        const { token, name, picture } = data;
        Cookies.set("token", token);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("picture", picture);
      },
      onError: (error: AxiosError) => {
        const status = error.response?.status;
        if (status === 404) {
          alert("Email does not exist.");
        } else if (status === 401) {
          alert("Invalid password.");
        } else {
          throw new Error("Error signing in user");
        }
      },
    }
  );
};

export const signUp = () => {
  return useMutation(
    async (data) => {
      const url = "/user/signup";
      const res = await axiosConfig.post(url, data);
      return res;
    },
    {
      onSuccess: () => {
        alert("User registered successfully!");
      },
      onError: () => {
        throw new Error("Error during sign up");
      },
    }
  );
};

export const deleteAccount = () => {
  return useMutation(
    async () => {
      const url = "/user";
      await axiosConfig.delete(url);
    },
    {
      onSuccess: () => {
        Cookies.remove("token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("picture");
        alert("User account deleted successfully.");
      },
      onError: () => {
        throw new Error("Error deleting user account");
      },
    }
  );
};

export const emailVerification = () => {
  const setVerificationCode = useSetAtom(verificationCodeAtom);
  return useMutation(
    async (email: string) => {
      const url = `${BASE_URL}/email-verification`;
      const res = await axios.post<userInfo>(url, { email });
      return res.data.verificationCode;
    },
    {
      onSuccess: (verificationCode) => {
        setVerificationCode(verificationCode);
        alert("Verification code sent");
      },
      onError: () => {
        throw new Error("Error requesting email verification");
      },
    }
  );
};

export const googleOAuth = () => {
  return useMutation(
    async (accessToken: string) => {
      const url = `${BASE_URL}/oauth`;
      const res = await axios.post(url, { accessToken });
      return res.data;
    },
    {
      onSuccess: (data) => {
        const { token, name, picture } = data;
        Cookies.set("token", token);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("picture", picture);
      },
      onError: () => {
        throw new Error("Error during Google OAuth");
      },
    }
  );
};
