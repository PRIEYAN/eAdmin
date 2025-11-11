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
      className={`group relative ${className ?? ""}`}
      data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2.5">
        <p className="text-xs font-semibold text-muted-foreground tracking-tight uppercase">{title}</p>
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-4 w-4" data-testid={`icon-${title.toLowerCase().replace(/\s+/g, '-')}`} />
        </span>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black tracking-tight" data-testid={`text-stat-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1.5 font-light" data-testid={`text-stat-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
