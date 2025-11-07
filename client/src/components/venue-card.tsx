import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Trash2 } from "lucide-react";
import type { Venue } from "@shared/schema";

interface VenueCardProps {
  venue: Venue;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export function VenueCard({ venue, onDelete, isDeleting = false }: VenueCardProps) {
  const bookedCount = venue.bookedTeachers || 0;
  const capacity = venue.numberOfTeachersCanBook;
  const percentFull = (bookedCount / capacity) * 100;

  return (
    <Card data-testid={`card-venue-${venue.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold" data-testid={`text-venue-date-${venue.id}`}>
              {new Date(venue.Examdate).toLocaleDateString()}
            </span>
          </div>
          <Badge variant={percentFull >= 100 ? "destructive" : percentFull >= 75 ? "secondary" : "outline"}>
            {bookedCount}/{capacity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span data-testid={`text-venue-time-${venue.id}`}>{venue.Examtime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>Capacity: {capacity} teachers</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 mt-3">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${Math.min(percentFull, 100)}%` }}
          />
        </div>
      </CardContent>
      {onDelete && (
        <CardFooter className="pt-3">
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={() => onDelete(venue.id)}
            disabled={isDeleting}
            data-testid={`button-delete-venue-${venue.id}`}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Venue
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
