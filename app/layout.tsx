import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    title: "UA Portfolio", 
    description: "Software development",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={'${poppins.variable} ${inter.variable}'}>
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}



