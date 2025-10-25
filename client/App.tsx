import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OTPVerification from "./pages/OTPVerification";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordResetOTP from "./pages/PasswordResetOTP";
import ChangePassword from "./pages/ChangePassword";
import PasswordChangeSuccess from "./pages/PasswordChangeSuccess";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/success" element={<Success />} />
            {/* Password Reset Flow */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/verify" element={<PasswordResetOTP />} />
            <Route path="/reset-password/change" element={<ChangePassword />} />
            <Route path="/reset-password/success" element={<PasswordChangeSuccess />} />
            <Route path="/login" element={<Login />} />
          
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
