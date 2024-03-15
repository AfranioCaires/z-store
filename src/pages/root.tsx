import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import CartProvider from "@/hooks/cart";
import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <>
      <CartProvider>
        <Header />
        <Outlet />
        <Footer />
        <Toaster />
      </CartProvider>
    </>
  );
}
