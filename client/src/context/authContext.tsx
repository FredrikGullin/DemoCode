import {
  ReactNode,
  createContext,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";
import { AuthStateInterface } from "../interfaces/authState";

/* Lägger till två funkgioner som props, setAuthData för att uppdatera 
authData och logout för att hantera utloggning av användare */
interface AuthContextProps extends AuthStateInterface {
  setAuthData: (data: AuthStateInterface) => void;
  logout: () => void;
}

/* Definitierar de props som AuthContextProvider ska ha, i detta fall 
"children", det vill säga innehållet som ska omslutas av providern */
interface AuthContextProviderProps {
  children: ReactNode;
}

/* En kontext skapas som undefined, vilket innebär att den inte har något värde från början */
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

/* AuthContextProvidern använder sig av useState för att spara och hantera
 användares authensieringsdata som lagras i sessionStorage */
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

  /* Använder useRef för att hålla koll på ett JWT accessTokens 
  återstående tid för att kunna logga ut en användare när accessToken har utgått */
  const logoutTimerId = useRef<NodeJS.Timeout | null>(null);

  /* Funktionen beräknar återstående tid i millisekunder till ett JWT accessToken 
  löper ut genom av avkoda och jämföra utgånstiden med nuvarande tid */
  const getTokenExpireTime = (token: string): number => {
    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return (decoded.exp - currentTime) * 1000;
    } catch (error) {
      console.error("Context timer error: ", error);
      return 0;
    }
  };

  /* Logout funktionen uppdaterar authData och tar bort JWT accessToken från sessionStorage */
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

  /* Funktionen uppdaterar authData och sessionStorage med nya 
  autensieringsuppgifter och kan användas vid behov */
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

  /* useEffect används för att initialt lägga in authData från sessionStorage */
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

/* Context Provider komponenten kan användas med useAuth hook för att skydda routes 
samt för att spara och tillgängliggöra autensieringsuppgifter i de komponenter som 
omfattas av t.ex "protected-routes" med mera. */
