import "./globals.css";
import Navbar from "../components/Navbar";

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
        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}



