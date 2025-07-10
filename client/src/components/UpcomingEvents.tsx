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
    <Card className="card-shadow rounded-3xl border-0 overflow-hidden mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-[var(--law-gray)] text-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mr-3">
            <Calendar className="h-5 w-5 text-[var(--law-purple)]" />
          </div>
          This Week's Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event: Event) => (
            <div 
              key={event.id}
              className="profile-card p-4 bg-gradient-to-r from-purple-50 to-white rounded-2xl border border-purple-100 cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--law-gray)] group-hover:text-[var(--law-purple)] transition-colors mb-1">
                    {event.title}
                  </h4>
                  <p className="text-sm text-[var(--law-gray-light)] mb-2 flex items-center">
                    📅 {event.date}
                    <span className="mx-2 w-1 h-1 bg-[var(--law-gray-light)] rounded-full"></span>
                    🕒 {event.time}
                  </p>
                  <div className="flex items-center">
                    <span className="text-xs bg-[var(--law-purple)] text-white px-2 py-1 rounded-full font-medium">
                      👥 {event.attendees} attending
                    </span>
                  </div>
                </div>
                <div className="w-2 h-2 bg-[var(--law-purple)] rounded-full group-hover:scale-150 transition-transform pulse-dot"></div>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-6 text-[var(--law-purple)] hover:text-[var(--law-purple)] hover:bg-purple-50 rounded-xl transition-all duration-300"
        >
          View Event Calendar →
        </Button>
      </CardContent>
    </Card>
  );
}
