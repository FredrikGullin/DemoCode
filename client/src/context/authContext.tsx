import { ReactNode, createContext, useContext, useState } from "react";
import { AuthStateInterface } from "../interfaces/authState";

interface AuthContextProps extends AuthStateInterface {
  setAuthData: (data: AuthStateInterface) => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<AuthStateInterface>({
    accessToken: sessionStorage.getItem("accessToken") || null,
  });

  const getTokenExpireTime = (token: string): number => {
    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return (decoded.exp - currentTime) * 1000;
    } catch (e) {
      return 0;
    }
  };

  const updateAuthData = (data: AuthStateInterface) => {
    if (data.accessToken) {
      sessionStorage.setItem("accessToken", data.accessToken);

      const remainingTime = getTokenExpireTime(data.accessToken);
      setTimeout(() => {
        setAuthData({ accessToken: null });
        sessionStorage.removeItem("accessToken");
      }, remainingTime);
    } else {
      setAuthData({ accessToken: null });
      sessionStorage.removeItem("accessToken");
    }
    setAuthData(data);
  };

  return (
    <AuthContext.Provider value={{ ...authData, setAuthData: updateAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used with an AuthContextProvider!");
  }
  return context;
};
