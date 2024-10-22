import type { Metadata } from "next";
import{Roboto}from 'next/font/google'
import "./globals.css";
import ClientProvider from './../hoc/ClientProvider';
import { Toaster } from "@/components/ui/sonner";


const font= Roboto({
weight:['100','300','400','500','700','900'],
subsets:['latin']
});
export const metadata: Metadata = {
  title: "KidQuest Academy",
  description: "E-learning platform for kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}>
    
        <ClientProvider>{children}
        <Toaster/>
        </ClientProvider>
        
      </body>
    </html>
  );
}
