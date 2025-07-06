import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import type { Event } from "@shared/schema";

export default function UpcomingEvents() {
  const { data: events = [] } = useQuery({
    queryKey: ['/api/events'],
  });

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center text-[var(--law-gray)]">
          <Calendar className="mr-2 h-5 w-5 text-[var(--law-blue)]" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.map((event: Event) => (
            <div 
              key={event.id}
              className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <h4 className="font-medium text-sm text-[var(--law-gray)]">{event.title}</h4>
                <p className="text-xs text-gray-600">{event.date} • {event.time}</p>
                <p className="text-xs text-[var(--law-blue)] font-medium">{event.attendees} attendees</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4 text-[var(--law-blue)] hover:text-[var(--law-blue-dark)]"
        >
          View All Events
        </Button>
      </CardContent>
    </Card>
  );
}
