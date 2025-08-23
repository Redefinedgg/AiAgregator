import ForgottenPassword from "@/features/Auth/ForgottenPassword";
import Button from "@/shared/ui/Button";
import { useAuthStore } from "@/shared/stores/auth";
import useHandleAuth from "@/shared/hooks/useHandleAuth";
import AuthSwitch from "@/features/Auth/AuthSwitch";
import { AuthGoogle } from "@/widgets/Auth/AuthGoogle";

const AuthButtons = () => {
  const { isRegisterOrLoginPage } = useAuthStore();
  const { handleAuth } = useHandleAuth();

  return (
    <>
      <Button
        label={isRegisterOrLoginPage}
        className="w-[600px] h-[60px] text-[24px]"
        onClick={handleAuth}
        onKeyDown={(e) => e.key === "Enter" && handleAuth()}
      />
      {isRegisterOrLoginPage === "Login" && <ForgottenPassword />}
      <AuthSwitch />
      <AuthGoogle />
    </>
  );
};

export default AuthButtons;
