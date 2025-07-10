import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import type { Internship } from "@shared/schema";

export default function InternshipHighlights() {
  const { data: internships = [] } = useQuery({
    queryKey: ['/api/internships'],
  });

  return (
    <Card className="card-shadow rounded-3xl border-0 overflow-hidden mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-[var(--law-gray)] text-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--law-gold)]/20 to-[var(--law-gold-light)]/20 flex items-center justify-center mr-3">
            <Briefcase className="h-5 w-5 text-[var(--law-gold)]" />
          </div>
          Career Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {internships.map((internship: Internship) => (
            <div 
              key={internship.id}
              className="profile-card p-4 bg-gradient-to-r from-[var(--law-gold)]/5 to-white rounded-2xl border border-[var(--law-gold)]/20 cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--law-gray)] group-hover:text-[var(--law-gold)] transition-colors mb-1">
                    {internship.title}
                  </h4>
                  <p className="text-sm text-[var(--law-gray-light)] mb-2">{internship.organization}</p>
                  <div className="flex items-center">
                    <span className="text-xs bg-[var(--law-gold)] text-white px-2 py-1 rounded-full font-medium">
                      {internship.deadline}
                    </span>
                  </div>
                </div>
                <div className="w-2 h-2 bg-[var(--law-gold)] rounded-full group-hover:scale-150 transition-transform"></div>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-6 text-[var(--law-gold)] hover:text-[var(--law-gold)] hover:bg-[var(--law-gold)]/10 rounded-xl transition-all duration-300"
        >
          Explore All Opportunities →
        </Button>
      </CardContent>
    </Card>
  );
}
