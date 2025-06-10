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
      setSuccessMsg(`Welcome, ${username}! Redirecting…`);
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setErrorMsg(err?.message || "Unexpected error. Please try again.");
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
    <div className="max-w-md mx-auto mt-20 p-6 rounded-2xl shadow-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <h1 className="text-3xl font-semibold text-center mb-6 text-zinc-900 dark:text-zinc-100">
        Login
      </h1>

      {errorMsg && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
      {successMsg && (
        <Alert variant="success" className="mb-4">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMsg}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} aria-busy={loading} aria-live="polite">
        <div className="mb-4">
          <Label
            htmlFor="username"
            className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300"
          >
            <User size={20} />
            Username
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
            className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500"
          />
        </div>

        <div className="mb-6">
          <Label
            htmlFor="password"
            className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300"
          >
            <Lock size={20} />
            Password
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
              className="pr-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mb-3 bg-indigo-600 hover:bg-indigo-500 text-white"
          disabled={loading}
        >
          {loading ? "Logging in…" : "Login"}
        </Button>

        <Button
          variant="outline"
          className="w-full border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
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