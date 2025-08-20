import Link from "next/link";
import { FC } from "react";

export const ForgottenPassword: FC = () => {
    return <Link className="text-[24px]" href="/forgotten-password">
      Forgotten Password?
    </Link>
}

export default ForgottenPassword
