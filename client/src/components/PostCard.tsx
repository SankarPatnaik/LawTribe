import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, Pin } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { PostWithAuthor } from "@shared/schema";

interface PostCardProps {
  post: PostWithAuthor;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const { toast } = useToast();

  const likePostMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/posts/${post.id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/posts/featured'] });
      toast({
        title: "Post liked!",
        description: "Your appreciation has been shared.",
      });
    },
    onError: () => {
      toast({
        title: "Error liking post",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <Card className="mb-6 post-card">
      <CardContent className="p-4">
        {featured && (
          <div className="flex items-center mb-3">
            <Pin className="h-4 w-4 text-[var(--law-blue)] mr-2" />
            <Badge variant="secondary" className="bg-blue-50 text-[var(--law-blue)]">
              Featured Post
            </Badge>
          </div>
        )}
        
        <div className="flex items-start mb-4">
          <Avatar className="w-12 h-12 mr-3">
            <AvatarImage src={post.author.profileImage || ""} />
            <AvatarFallback>{post.author.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--law-gray)]">{post.author.fullName}</h3>
            <p className="text-sm text-gray-600">{post.author.title} • {post.author.university}</p>
            <p className="text-xs text-gray-500">{formatTimeAgo(new Date(post.createdAt!))}</p>
          </div>
        </div>

        {post.title && (
          <h4 className="text-lg font-semibold text-[var(--law-gray)] mb-3">
            {post.title}
          </h4>
        )}

        <p className="text-gray-700 mb-4">{post.content}</p>

        {post.image && (
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => likePostMutation.mutate()}
              disabled={likePostMutation.isPending}
              className="flex items-center text-gray-600 hover:text-[var(--law-blue)]"
            >
              <Heart className="mr-2 h-4 w-4" />
              {post.likes || 0}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-gray-600 hover:text-[var(--law-blue)]"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {post.comments || 0}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-gray-600 hover:text-[var(--law-blue)]"
            >
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          {featured && (
            <Button
              variant="ghost"
              className="text-[var(--law-blue)] hover:text-[var(--law-blue-dark)] font-medium"
            >
              Read more
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
