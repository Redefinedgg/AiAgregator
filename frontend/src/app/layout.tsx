// layout.tsx
import "./globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import { Nunito } from "next/font/google";
import Header from "@/widgets/Header";
import { ToastContainer } from 'react-toastify';
import ClientProvider from "./ClientProvider";
import Footer from "@/widgets/Footer";
import { FC } from "react";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "AI Aggregator",
  description: "Dev version",
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en" className={nunito.className}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body suppressHydrationWarning={true} className="min-h-screen flex flex-col">
        <main className="flex flex-col flex-1 bg-[#070708] text-[#E9E9E9] p-[10px]">
          <Header />
          <main className="flex flex-col bg-[#11141C] rounded-[12px] text-[#E9E9E9] flex-1 mt-[10px]">
            {children}
          </main>
          <Footer />
        </main>
        <ToastContainer theme="dark" />
        <ClientProvider />
      </body>
    </html>
  );
}

export default RootLayout;
