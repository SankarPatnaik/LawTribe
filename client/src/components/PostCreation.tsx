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
    <div className="mb-10 relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--law-purple)] via-[var(--law-pink)] to-[var(--law-cyan)] rounded-3xl blur opacity-30"></div>
      <Card className="relative bg-white rounded-3xl border-0 shadow-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center mb-8">
            <Avatar className="w-16 h-16 mr-6 ring-4 ring-white shadow-xl">
              <AvatarImage src={currentUser.profileImage || ""} />
              <AvatarFallback className="bg-gradient-to-br from-[var(--law-purple)] to-[var(--law-blue)] text-white text-xl font-black">
                {currentUser.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              onClick={handlePostClick}
              className="flex-1 justify-start px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl text-[var(--law-gray-light)] hover:from-[var(--law-purple)]/5 hover:to-[var(--law-blue)]/5 hover:text-[var(--law-gray)] transition-all duration-500 text-lg font-medium hover:scale-[1.02] hover:shadow-lg"
            >
              ✨ Share your creative work or legal insight...
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="ghost"
              className="flex flex-col items-center py-6 px-4 text-[var(--law-gray-light)] hover:text-white transition-all duration-300 rounded-2xl group bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-[var(--law-blue)] hover:to-[var(--law-cyan)] hover:scale-110 hover:shadow-xl"
              onClick={handlePostClick}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[var(--law-blue)] to-[var(--law-cyan)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <Edit3 className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-bold">🎨 Portfolio Post</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center py-6 px-4 text-[var(--law-gray-light)] hover:text-white transition-all duration-300 rounded-2xl group bg-gradient-to-br from-purple-50 to-pink-50 hover:from-[var(--law-purple)] hover:to-[var(--law-pink)] hover:scale-110 hover:shadow-xl"
              onClick={() => createPostMutation.mutate({ content: "I have a question about constitutional law interpretation. Can anyone help explain the recent developments in Article 370 cases?", type: "question" })}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[var(--law-purple)] to-[var(--law-pink)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <HelpCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-bold">🤔 Ask Community</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center py-6 px-4 text-[var(--law-gray-light)] hover:text-white transition-all duration-300 rounded-2xl group bg-gradient-to-br from-orange-50 to-yellow-50 hover:from-[var(--law-orange)] hover:to-[var(--law-accent)] hover:scale-110 hover:shadow-xl"
              onClick={() => createPostMutation.mutate({ content: "Case Analysis: Recent Supreme Court ruling on privacy rights. Key takeaways and implications for future litigation strategies.", type: "case_note" })}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[var(--law-orange)] to-[var(--law-accent)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-bold">📝 Case Study</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
