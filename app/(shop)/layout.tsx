import Navbar from "@/app/components/Navbar/Navbar";
import CartSync from "../components/CartSync";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartSync />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
