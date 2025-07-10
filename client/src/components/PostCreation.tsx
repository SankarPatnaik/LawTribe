import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit3, HelpCircle, FileText } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@shared/schema";

interface PostCreationProps {
  currentUser?: User;
}

export default function PostCreation({ currentUser }: PostCreationProps) {
  const [showPostDialog, setShowPostDialog] = useState(false);
  const { toast } = useToast();

  const createPostMutation = useMutation({
    mutationFn: async (data: { content: string; type: string }) => {
      return await apiRequest("POST", "/api/posts", {
        ...data,
        authorId: currentUser?.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
      toast({
        title: "Post created successfully!",
        description: "Your post has been shared with the community.",
      });
      setShowPostDialog(false);
    },
    onError: () => {
      toast({
        title: "Error creating post",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePostClick = () => {
    setShowPostDialog(true);
  };

  if (!currentUser) return null;

  return (
    <Card className="mb-8 post-card card-shadow rounded-3xl border-0 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <Avatar className="w-14 h-14 mr-4 ring-3 ring-white shadow-lg floating-animation">
            <AvatarImage src={currentUser.profileImage || ""} />
            <AvatarFallback className="bg-gradient-to-br from-[var(--law-gradient-from)] to-[var(--law-gradient-to)] text-white text-lg font-semibold">
              {currentUser.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            onClick={handlePostClick}
            className="flex-1 justify-start px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl text-[var(--law-gray-light)] hover:from-white hover:to-gray-50 hover:text-[var(--law-gray)] transition-all duration-300 text-base"
          >
            💭 What's on your legal mind today?
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="ghost"
            className="flex flex-col items-center py-4 px-3 text-[var(--law-gray-light)] hover:text-[var(--law-blue)] hover:bg-blue-50 transition-all duration-300 rounded-xl group"
            onClick={handlePostClick}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Edit3 className="h-5 w-5 text-[var(--law-blue)]" />
            </div>
            <span className="text-sm font-medium">Start a post</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center py-4 px-3 text-[var(--law-gray-light)] hover:text-[var(--law-purple)] hover:bg-purple-50 transition-all duration-300 rounded-xl group"
            onClick={() => createPostMutation.mutate({ content: "I have a question about constitutional law interpretation. Can anyone help explain the recent developments in Article 370 cases?", type: "question" })}
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <HelpCircle className="h-5 w-5 text-[var(--law-purple)]" />
            </div>
            <span className="text-sm font-medium">Ask Question</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center py-4 px-3 text-[var(--law-gray-light)] hover:text-[var(--law-warning)] hover:bg-orange-50 transition-all duration-300 rounded-xl group"
            onClick={() => createPostMutation.mutate({ content: "Case Analysis: Recent Supreme Court ruling on privacy rights. Key takeaways and implications for future litigation strategies.", type: "case_note" })}
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <FileText className="h-5 w-5 text-[var(--law-warning)]" />
            </div>
            <span className="text-sm font-medium">Case Note</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
