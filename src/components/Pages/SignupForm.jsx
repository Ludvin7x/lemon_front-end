import React, { useState } from "react";
import { register } from "../api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserPlus, X } from "phosphor-react";

export default function SignupForm({ onCancel }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setAlert({ type: "error", message: "Passwords do not match" });
      return;
    }

    try {
      await register({
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        password: password1,
        password2: password2,
      });
      setAlert({ type: "success", message: "Account created! Please login." });
      setTimeout(() => onCancel(), 2000);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.message || "Registration failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <UserPlus size={24} /> Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          {alert && (
            <Alert variant={alert.type} className="mb-4">
              <div className="flex justify-between items-center w-full">
                <div>
                  <AlertTitle>{alert.type === "success" ? "Success" : "Error"}</AlertTitle>
                  <AlertDescription>{alert.message}</AlertDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setAlert(null)}>
                  <X size={18} />
                </Button>
              </div>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Register
            </Button>
            <Button variant="outline" className="w-full" onClick={onCancel}>
              Back to Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}