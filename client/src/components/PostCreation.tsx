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
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <Avatar className="w-10 h-10 mr-3">
            <AvatarImage src={currentUser.profileImage || ""} />
            <AvatarFallback>{currentUser.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            onClick={handlePostClick}
            className="flex-1 justify-start px-4 py-2 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100"
          >
            What's on your legal mind?
          </Button>
        </div>
        <div className="flex justify-between">
          <Button
            variant="ghost"
            className="flex items-center text-gray-600 hover:bg-gray-50"
            onClick={handlePostClick}
          >
            <Edit3 className="mr-2 h-4 w-4" />
            Start a post
          </Button>
          <Button
            variant="ghost"
            className="flex items-center text-gray-600 hover:bg-gray-50"
            onClick={() => createPostMutation.mutate({ content: "Question placeholder", type: "question" })}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Ask a Question
          </Button>
          <Button
            variant="ghost"
            className="flex items-center text-gray-600 hover:bg-gray-50"
            onClick={() => createPostMutation.mutate({ content: "Case note placeholder", type: "case_note" })}
          >
            <FileText className="mr-2 h-4 w-4" />
            Share Case Note
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
