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
    <Card className="card-shadow rounded-3xl border-0 overflow-hidden mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-[var(--law-gray)] text-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mr-3">
            <UserPlus className="h-5 w-5 text-[var(--law-blue)]" />
          </div>
          People You May Know
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((user: UserWithConnectionStatus) => (
            <div key={user.id} className="profile-card p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="relative">
                  <Avatar className="w-12 h-12 mr-4 ring-2 ring-white shadow-md">
                    <AvatarImage src={user.profileImage || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-[var(--law-gradient-from)] to-[var(--law-gradient-to)] text-white font-semibold">
                      {user.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--law-success)] rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--law-gray)] hover:text-[var(--law-blue)] cursor-pointer transition-colors">
                    {user.fullName}
                  </h4>
                  <p className="text-sm text-[var(--law-gray-light)] flex items-center">
                    {user.title}
                    <span className="mx-2 w-1 h-1 bg-[var(--law-gray-light)] rounded-full"></span>
                    {user.university}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => connectMutation.mutate(user.id)}
                disabled={connectMutation.isPending}
                className="w-full gradient-bg text-white border-0 hover:scale-105 transition-transform duration-300 font-medium rounded-xl"
              >
                {connectMutation.isPending ? "Connecting..." : "✨ Connect"}
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-6 text-[var(--law-blue)] hover:text-[var(--law-blue-dark)] hover:bg-blue-50 rounded-xl transition-all duration-300"
        >
          Discover More Connections →
        </Button>
      </CardContent>
    </Card>
  );
}
