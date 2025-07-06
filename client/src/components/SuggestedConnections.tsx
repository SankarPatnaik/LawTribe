import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { UserWithConnectionStatus } from "@shared/schema";

export default function SuggestedConnections() {
  const { toast } = useToast();
  
  const { data: suggestions = [] } = useQuery({
    queryKey: ['/api/connections/suggested'],
  });

  const connectMutation = useMutation({
    mutationFn: async (userId: number) => {
      return await apiRequest("POST", "/api/connections", {
        userId: 1, // Current user
        connectedUserId: userId,
        status: "pending",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/connections/suggested'] });
      toast({
        title: "Connection request sent!",
        description: "Your connection request has been sent successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error sending connection request",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-[var(--law-gray)]">
          <UserPlus className="mr-2 h-5 w-5 text-[var(--law-blue)]" />
          Suggested Connections
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((user: UserWithConnectionStatus) => (
            <div key={user.id} className="profile-card p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage src={user.profileImage || ""} />
                  <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-[var(--law-gray)]">{user.fullName}</h4>
                  <p className="text-xs text-gray-600">{user.title} • {user.university}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => connectMutation.mutate(user.id)}
                disabled={connectMutation.isPending}
                className="w-full border-[var(--law-blue)] text-[var(--law-blue)] hover:bg-[var(--law-blue)] hover:text-white"
              >
                {connectMutation.isPending ? "Connecting..." : "Connect"}
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4 text-[var(--law-blue)] hover:text-[var(--law-blue-dark)]"
        >
          View All Suggestions
        </Button>
      </CardContent>
    </Card>
  );
}
