import { Outfit } from "next/font/google";
import "./globals.css";
import App from "./App";
import { ThemeProvider } from "next-themes";


const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={outfit.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <App>{children}</App>
          </ThemeProvider>
        
      </body>
    </html>
  );
}