import "./globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { Nunito } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Footer from "@/widgets/Layout/Footer";
import ClientHeader from "@/widgets/Layout/Header/ui/ClientHeader";
import { Metadata } from "next";
import Sidebar from "@/widgets/Layout/Sidebar";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "AI Aggregator",
  description: "Dev version",
};

export default async function RootLayout({ children }: Props) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body
        className={`min-h-screen flex flex-col ${nunito.className}`}
        suppressHydrationWarning={true}
      >

        <div className="flex min-h-screen bg-[#070708] text-[#E9E9E9]">
          <Sidebar />
          <div className="flex flex-col flex-1 p-[10px]">
            <ClientHeader />
            <main className="flex flex-col bg-[#11141C] rounded-[12px] text-[#E9E9E9] flex-1 mt-[10px]">
              {children}
            </main>
            <Footer />
          </div>
        </div>

        <ToastContainer theme="dark" />
      </body>
    </html>
  );
}
