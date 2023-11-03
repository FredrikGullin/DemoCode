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
    accessToken: null,
  });

  return (
    <AuthContext.Provider value={{ ...authData, setAuthData }}>
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
