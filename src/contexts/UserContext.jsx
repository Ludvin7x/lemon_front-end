import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  login as apiLogin,      // ⇨ POST /auth/token/login/  (Djoser)
  getUserInfo,            // ⇨ GET /auth/users/me/
  logout as apiLogout,    // ⇨ POST /auth/token/logout/
} from "../components/api/auth";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  /* -------------------------- Estado local -------------------------- */
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  /* --------------------------- Side-effects ------------------------- */
  // Si hay token pero no user (recarga de página), pide los datos al backend.
  useEffect(() => {
    if (token && !user) {
      getUserInfo(token)
        .then((u) => {
          localStorage.setItem("user", JSON.stringify(u));
          setUser(u);
        })
        .catch(() => handleLogout()); // token expirado o inválido
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /* ------------------------- Acciones ------------------------------ */
  // Login: guarda token, pide info de usuario y la persiste.
  const handleLogin = useCallback(async (credentials) => {
    const { auth_token } = await apiLogin(credentials);
    localStorage.setItem("accessToken", auth_token);
    setToken(auth_token);

    const u = await getUserInfo(auth_token);
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  }, []);

  // Logout: limpia todo local + backend
  const handleLogout = useCallback(() => {
    if (token) apiLogout(token).catch(() => {});
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, [token]);

  /* ------------------------ Context value -------------------------- */
  const value = {
    user,
    token,
    setUser,
    setToken,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!token,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};