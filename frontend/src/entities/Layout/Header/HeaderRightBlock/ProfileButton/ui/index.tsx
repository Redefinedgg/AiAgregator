import Link from "next/link";
import Button from "@/shared/ui/Button";
import { FaUser } from "react-icons/fa";
import { useAuthStore } from "@/shared/stores/auth";

export const ProfileButton = () => {
  const { isAuth } = useAuthStore();
  return (
    <Link href={isAuth ? "/dashboard" : "/auth"}>
      <Button label={<FaUser size={50} />} />
    </Link>
  );
};

export default ProfileButton;
