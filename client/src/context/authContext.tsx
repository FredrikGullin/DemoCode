import {
  ReactNode,
  createContext,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";
import { AuthStateInterface } from "../interfaces/authState";

interface AuthContextProps extends AuthStateInterface {
  setAuthData: (data: AuthStateInterface) => void;
  logout: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<AuthStateInterface>({
    accessToken: sessionStorage.getItem("accessToken"),
    userId: sessionStorage.getItem("userId") ?? undefined,
    username: sessionStorage.getItem("username") ?? undefined,
    email: sessionStorage.getItem("email") ?? undefined,
    role: sessionStorage.getItem("role") ?? undefined,
  });

  const logoutTimerId = useRef<NodeJS.Timeout | null>(null);

  const getTokenExpireTime = (token: string): number => {
    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return (decoded.exp - currentTime) * 1000;
    } catch (e) {
      return 0;
    }
  };

  const logout = () => {
    if (logoutTimerId.current) {
      clearTimeout(logoutTimerId.current);
    }
    sessionStorage.removeItem("accessToken");
    setAuthData({
      accessToken: null,
      userId: undefined,
      username: undefined,
      email: undefined,
      role: undefined,
      owned_courses: undefined,
    });
  };

  const updateAuthData = (data: AuthStateInterface) => {
    if (logoutTimerId.current) {
      clearTimeout(logoutTimerId.current);
    }

    if (data.accessToken) {
      sessionStorage.setItem("accessToken", data.accessToken);

      const remainingTime = getTokenExpireTime(data.accessToken);

      logoutTimerId.current = setTimeout(() => {
        logout();
      }, remainingTime);
    } else {
      logout();
    }

    setAuthData(data);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setAuthData({ ...authData, accessToken: token });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...authData, setAuthData: updateAuthData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider!");
  }
  return context;
};
