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
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center text-[var(--law-gray)]">
          <Briefcase className="mr-2 h-5 w-5 text-[var(--law-blue)]" />
          Internship Highlights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {internships.map((internship: Internship) => (
            <div 
              key={internship.id}
              className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <h4 className="font-medium text-sm text-[var(--law-gray)]">{internship.title}</h4>
                <p className="text-xs text-gray-600">{internship.organization}</p>
                <p className="text-xs text-[var(--law-blue)] font-medium">{internship.deadline}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4 text-[var(--law-blue)] hover:text-[var(--law-blue-dark)]"
        >
          View All Internships
        </Button>
      </CardContent>
    </Card>
  );
}
