import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import CartProvider from "@/hooks/cart";
import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <>
      <CartProvider>
        <Header />
        <Outlet />
        <Footer />
      </CartProvider>
    </>
  );
}
