import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WarningCircle } from "phosphor-react";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-muted px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Card className="max-w-lg w-full text-center shadow-lg">
        <CardHeader>
          <CardTitle className="flex justify-center items-center gap-3 text-3xl font-semibold text-red-600">
            <WarningCircle size={32} weight="fill" />
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground mt-4 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </CardContent>
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mx-auto"
        >
          Go Home
        </Button>
      </Card>
    </motion.div>
  );
}