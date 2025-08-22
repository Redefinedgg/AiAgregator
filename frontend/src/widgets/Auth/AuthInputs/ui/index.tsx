"use client";
import Input from "@/shared/ui/Input";
import { addSpacesToCamelCase } from "@/shared/helpers/addSpacesToCamelCase";
import { useAuthStore } from "@/shared/stores/auth";

export const AuthInputs = () => {
  const {
    registerForm,
    setRegisterForm,
    loginForm,
    setLoginForm,
    isRegisterOrLoginPage,
  } = useAuthStore();

  return (
    <div className="flex flex-col gap-[24px]">
      {Object.keys(
        isRegisterOrLoginPage === "Register" ? registerForm : loginForm
      ).map((item: string) => (
        <Input
          key={item}
          value={
            isRegisterOrLoginPage === "Register"
              ? registerForm[item as keyof typeof registerForm]
              : loginForm[item as keyof typeof loginForm]
          }
          onChange={(value) =>
            isRegisterOrLoginPage === "Register"
              ? setRegisterForm({ ...registerForm, [item]: value })
              : setLoginForm({ ...loginForm, [item]: value })
          }
          className="w-[600px] h-[60px] text-[24px] px-[12px] py-[6px]"
          placeholder={addSpacesToCamelCase(item)}
        />
      ))}
    </div>
  );
};

export default AuthInputs;
