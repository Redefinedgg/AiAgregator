import { toast } from "react-toastify";
import axiosInstance from "../client";
import { RegisterDto, RegisterResponse, LoginDto, LoginResponse } from "./types";

export const register = async (
  body: RegisterDto
): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post("/auth/register", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { user, token } = response.data;

    localStorage.setItem("accessToken", token);

    toast.success("Registered successfully");

    return { user, token };
  } catch (error: any) {
    toast.error(error.response?.data?.message + " (Failed to register)");
    throw error;
  }
};

export const login = async (
  body: LoginDto
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("/auth/login", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { user, token } = response.data;

    localStorage.setItem("accessToken", token);

    toast.success("Logged in successfully");

    return { user, token };
  } catch (error: any) {
    toast.error(error.response?.data?.message + " (Failed to login)");
    throw error;
  }
};
