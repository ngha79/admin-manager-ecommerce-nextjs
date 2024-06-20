"use client";

import { io, Socket } from "socket.io-client";
import { createContext, useState, useEffect } from "react";

import http, { HttpError } from "@/lib/http";
import { getSession } from "@/utils/actions/account";

interface SocketContextValue {
  socket: Socket | null;
  token: string | null;
  user: any | null;
}

export const SocketContext = createContext<SocketContextValue>({
  socket: null,
  token: null,
  user: null,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const getProfileShop = async () => {
    try {
      const response = await http.get("/shop/profile/me", {
        token: true,
        cache: "no-store",
      });
      setUser(response.payload);
    } catch (error) {
      console.log("Get Profile Shop Error");
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getSession();
      setToken(token);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (user) {
      const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
        extraHeaders: {
          user: JSON.stringify(user),
        },
      });
      setSocket(newSocket);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      getProfileShop();
    }
  }, [token]);
  return (
    <SocketContext.Provider value={{ socket, token, user }}>
      {children}
    </SocketContext.Provider>
  );
};
