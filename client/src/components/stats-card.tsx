import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, description, className }: StatsCardProps) {
  return (
    <Card
      className={`group relative overflow-hidden ${className ?? ""}`}
      data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Decorative gradient border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-0.5 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(140px 100px at 95% 10%, hsl(var(--primary)/.25), transparent 40%)" }}
      />
      {/* Gradient ring accent */}
      <div
        aria-hidden
        className="absolute -top-8 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/15 transition-colors duration-500"
      />
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-primary ring-1 ring-primary/30 shadow-sm shadow-primary/10 transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-4 w-4" data-testid={`icon-${title.toLowerCase().replace(/\s+/g, '-')}`} />
        </span>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold tracking-tight" data-testid={`text-stat-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1" data-testid={`text-stat-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {description}
          </p>
        )}
      </CardContent>
      {/* Bottom gradient accent bar */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, hsl(var(--primary)/.0) 0%, hsl(var(--primary)/.4) 50%, hsl(var(--primary)/.0) 100%)" }}
      />
    </Card>
  );
}
