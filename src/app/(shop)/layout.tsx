import Navbar from "@/components/navbar/Navbar";
import LayoutSocket from "@/components/sockets/LayoutSocket";
import { SocketProvider } from "@/components/contexts/SocketContext";

const ShopLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <LayoutSocket>
        <div className="h-full relative">
          <Navbar />
          {children}
        </div>
      </LayoutSocket>
    </SocketProvider>
  );
};

export default ShopLayout;
