import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export function StatsCard({ title, value, icon: Icon, description }: StatsCardProps) {
  return (
    <Card data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className="h-4 w-4 text-muted-foreground" data-testid={`icon-${title.toLowerCase().replace(/\s+/g, '-')}`} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold" data-testid={`text-stat-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1" data-testid={`text-stat-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
