import "./globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import { Nunito } from "next/font/google";
import Header from "@/widgets/Header";
import { ToastContainer } from 'react-toastify';
import ClientProvider from "./ClientProvider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Добавь нужные веса
  variable: "--font-nunito", // Для использования через CSS-переменную (если нужно)
  display: "swap",
});

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "AI Aggregator",
  description: "Dev version",
};

export default function RootLayout({ children }: Props) {
    return (
      <html lang="en" className={nunito.className}>
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body suppressHydrationWarning={true}>
          <main className="flex flex-col min-h-screen bg-[#070708] text-[#E9E9E9] p-[10px]">
            <Header />
            <main
              className="flex flex-col bg-[#11141C] rounded-[12px] text-[#E9E9E9] flex-1 mt-[10px]"
            >
              {children}
            </main>
          </main>
          <ToastContainer theme="dark" />
          <ClientProvider />
        </body>
      </html>
    );
  }
  