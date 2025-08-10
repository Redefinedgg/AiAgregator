import { toast } from "react-toastify";

export const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
};