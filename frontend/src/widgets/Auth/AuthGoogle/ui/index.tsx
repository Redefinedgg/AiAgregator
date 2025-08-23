import Button from "@/shared/ui/Button";
import Image from "next/image";

export const AuthGoogle = () => {
  return (
    <Button
      label={
        <div className="flex items-center">
          <div className="flex items-center bg-[#fff] rounded-[12px] p-[6px]">
            <Image src="/logo/google.png" alt="Google" width={24} height={24} />
          </div>
          <p className="ml-[216px]">Google</p>
        </div>
      }
      className="w-[600px] h-[60px] text-[24px]"
      onClick={() => {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!backendUrl) return;
        
        const url = backendUrl.startsWith('http') 
          ? `${backendUrl}/auth/google`
          : `https://${backendUrl}/auth/google`;
          
        window.location.href = url;
      }}
    />
  );
};

export default AuthGoogle;
