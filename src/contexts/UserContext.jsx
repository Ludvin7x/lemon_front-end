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
  refreshAccessToken,
} from "../components/api/auth";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const [loading, setLoading] = useState(false);

  // Actualizar token y storage
  const updateToken = useCallback((newToken) => {
    setToken(newToken);
    localStorage.setItem("accessToken", newToken);
  }, []);

  // Logout: limpia todo
  const handleLogout = useCallback(() => {
    apiLogout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  // Refrescar token si es posible
  const tryRefreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return false;

    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      updateToken(newAccessToken);
      return true;
    } catch {
      handleLogout();
      return false;
    }
  }, [handleLogout, updateToken]);

  // Obtener info usuario y refrescar token si es necesario
  const fetchUserInfo = useCallback(async () => {
    if (!token) {
      setUser(null);
      localStorage.removeItem("user");
      return;
    }

    setLoading(true);

    try {
      const u = await getUserInfo(token);
      setUser(u);
      localStorage.setItem("user", JSON.stringify(u));
    } catch (error) {
      if (
        error.message.toLowerCase().includes("token_not_valid") ||
        error.message.toLowerCase().includes("token is expired")
      ) {
        const refreshed = await tryRefreshToken();
        if (refreshed) {
          // Reintentar obtener usuario con nuevo token
          try {
            const u = await getUserInfo(localStorage.getItem("accessToken"));
            setUser(u);
            localStorage.setItem("user", JSON.stringify(u));
          } catch {
            handleLogout();
          }
        } else {
          handleLogout();
        }
      } else {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [token, tryRefreshToken, handleLogout]);

  // Efecto para cargar usuario cuando cambia token
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  // Login
  const handleLogin = useCallback(async ({ username, password }) => {
    try {
      const data = await apiLogin(username, password);
      localStorage.setItem("refreshToken", data.refresh);
      updateToken(data.access);

      const u = await getUserInfo(data.access);
      setUser(u);
      localStorage.setItem("user", JSON.stringify(u));
    } catch (error) {
      throw error;
    }
  }, [updateToken]);

  const value = {
    user,
    token,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!token,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};