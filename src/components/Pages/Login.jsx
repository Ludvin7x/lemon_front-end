import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";
import SignupForm from "./SignupForm";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeSlash, Lock, User } from "phosphor-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      await login({ username, password });
      setSuccessMsg(`¡Bienvenido, ${username}! Redirigiendo…`);
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setErrorMsg(
        err?.message || "Error inesperado. Por favor, intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isSignup) {
    return (
      <SignupForm
        onCancel={() => {
          setIsSignup(false);
          setErrorMsg("");
          setSuccessMsg("");
          setUsername("");
          setPassword("");
        }}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

      {errorMsg && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
      {successMsg && (
        <Alert variant="success" className="mb-4">
          <AlertTitle>Éxito</AlertTitle>
          <AlertDescription>{successMsg}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} aria-busy={loading} aria-live="polite">
        <div className="mb-4">
          <Label htmlFor="username" className="flex items-center gap-2">
            <User size={20} />
            Usuario
          </Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            disabled={loading}
            aria-disabled={loading}
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock size={20} />
            Contraseña
          </Label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              aria-disabled={loading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full mb-3" disabled={loading}>
          {loading ? "Ingresando…" : "Login"}
        </Button>

        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => setIsSignup(true)}
          disabled={loading}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}