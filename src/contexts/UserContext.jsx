import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  login as apiLogin,
  getUserInfo,
  logout as apiLogout,
} from "../components/api/auth";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  useEffect(() => {

    if (token && !user) {
      getUserInfo()
        .then((u) => {
          setUser(u);
          localStorage.setItem("user", JSON.stringify(u));
        })
        .catch(() => {
          handleLogout();
        });
    } else if (!token) {
      setUser(null);
      localStorage.removeItem("user");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleLogin = useCallback(async ({ username, password }) => {
    try {
      const data = await apiLogin(username, password);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      setToken(data.access);

      const u = await getUserInfo();
      setUser(u);
      localStorage.setItem("user", JSON.stringify(u));
    } catch (error) {
      throw error;
    }
  }, []);

  const handleLogout = useCallback(() => {
    apiLogout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!token,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
