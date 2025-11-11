import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

export default function LoginPage() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

      try {
      const response = await api.auth.login(adminId, password);
      // Backend only returns { message, token }, so create minimal adminData
      const adminData = {
        id: adminId, // Use adminId as id since backend does not provide a separate id
        adminId: adminId,
        name: "Admin",
      };
      login(adminData, response.token);
      toast({
        title: "Login successful",
        description: "Welcome back to E-Venue Admin",
      });
      setLocation("/");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast({
        title: "Login failed",
        description: axiosError.response?.data?.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="pointer-events-none absolute -inset-20 opacity-50">
        <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-chart-2/10 blur-3xl" />
      </div>
      <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl rounded-xl">
        <CardHeader className="space-y-4 text-center p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2 shadow-lg ring-1 ring-primary/30">
            <Building2 className="h-7 w-7 text-primary-foreground opacity-100" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 tracking-tight">E-Venue Admin</CardTitle>
            <CardDescription className="text-sm font-light">Sign in to manage exam venues and teachers</CardDescription>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold ring-1 ring-primary/30 border border-primary/20 backdrop-blur-sm tracking-tight">
              <Building2 className="w-3.5 h-3.5" />
              Admin
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/15 text-slate-300 text-xs font-semibold ring-1 ring-slate-500/30 border border-slate-500/20 backdrop-blur-sm tracking-tight">
              <Lock className="w-3.5 h-3.5" />
              Secure
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminId">Admin ID</Label>
              <Input
                id="adminId"
                type="text"
                placeholder="Enter your admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
                data-testid="input-admin-id"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-login">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
