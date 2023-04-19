import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { memo } from "react";
interface Props {
  children?: React.ReactNode;
}
function MainLayoutInner({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
const MainLayout = memo(MainLayoutInner);
export default MainLayout;
