import { IBM_Plex_Mono, Foldit, Rubik_Scribble } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";

const fontHeading = Rubik_Scribble({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: "400",
});

const fontBody = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: "400",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
