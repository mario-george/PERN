import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";


export const metadata: Metadata = {
  title: "Todo list",
  description: "PERN To do list tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>{children} </Layout>
    
  );
}
