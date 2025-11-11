import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function BookedVenuesPage() {
  const [venues, setVenues] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.venues.getAllDetails();
        setVenues(data.venues || []);
      } catch (err) {
        console.error("Error fetching venues:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDownloadExcel = () => {
    const rows: any[] = [];

    venues.forEach((venue) => {
      const capacity =
        venue.Book?.numberOfTeachersCanBook ??
        venue.numberOfTeachersCanBook ??
        0;

      const booked =
        venue.Book?.bookedBy ??
        venue.bookedBy ??
        [];

      const rowsToRender = Math.max(capacity, booked.length || 1);

      for (let i = 0; i < rowsToRender; i++) {
        const b = booked[i] || {};
        rows.push({
          VenueId: venue.ExamVenueId || "",
          VenueName: venue.VenueName || "",
          Date: venue.Examdate || "",
          Time: venue.Examtime || "",
          Name: b.name || "",
          Email: b.email || "",
          Phone: b.PhoneNumber || "",
          BookedOn: b.bookedAt
            ? new Date(b.bookedAt).toLocaleString()
            : "",
        });
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BookedVenues");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "booked_venues.xlsx");
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between rounded-2xl border bg-card/80 supports-[backdrop-filter]:backdrop-blur p-4 md:p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booked Venues</h1>
          <p className="text-muted-foreground mt-2">
            {isLoading
              ? "Loading..."
              : `${venues.length} venues found`}
          </p>
        </div>
        <Button
          onClick={handleDownloadExcel}
          disabled={isLoading || venues.length === 0}
          className="shadow-sm hover:shadow transition-all"
        >
          Download Excel
        </Button>
      </div>

      {/* Table Section */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="tracking-tight">All Booked Venues</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="overflow-x-auto nice-scrollbar">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Venue ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Teacher Name</TableHead>
                  <TableHead>Email</TableHead>
                
                  <TableHead>Booked On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : venues.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No venues found
                    </TableCell>
                  </TableRow>
                ) : (
                  venues.flatMap((venue) => {
                    const capacity =
                      venue.Book?.numberOfTeachersCanBook ??
                      venue.numberOfTeachersCanBook ??
                      0;

                    const booked =
                      venue.Book?.bookedBy ??
                      venue.bookedBy ??
                      [];

                    const rowsToRender = Math.max(capacity, booked.length || 1);

                    return Array.from({ length: rowsToRender }).map((_, i) => {
                      const b = booked[i] || {};
                      return (
                        <TableRow key={`${venue.ExamVenueId}-row-${i}`}>
                          <TableCell>{venue.ExamVenueId}</TableCell>
                          <TableCell>
                            {venue.Examdate
                              ? new Date(venue.Examdate).toLocaleDateString()
                              : ""}
                          </TableCell>
                          <TableCell>{venue.Examtime || ""}</TableCell>
                          <TableCell>{b.name || ""}</TableCell>
                          <TableCell>{b.email || ""}</TableCell>
                          <TableCell>
                            {b.bookedAt
                              ? new Date(b.bookedAt).toLocaleString()
                              : ""}
                          </TableCell>
                        </TableRow>
                      );
                    });
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
