import Button from "@/shared/ui/Button";
import { useAuthStore } from "@/shared/stores/auth";

const AuthSwitchButton = () => {
  const { isRegisterOrLoginPage, setIsRegisterOrLoginPage } = useAuthStore();

  return (
    <Button
      label={
        isRegisterOrLoginPage === "Register"
          ? "Already have an account?"
          : "Don't have an account?"
      }
      onClick={() =>
        setIsRegisterOrLoginPage(
          isRegisterOrLoginPage === "Register" ? "Login" : "Register"
        )
      }
      className="bg-transparent hover:bg-transparent hover:scale-[1] border-none text-[24px]"
    />
  );
};

export default AuthSwitchButton;
