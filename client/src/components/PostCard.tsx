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
    <Card className="mb-8 post-card card-shadow rounded-3xl border-0 overflow-hidden">
      <CardContent className="p-0">
        {featured && (
          <div className="gradient-bg px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Pin className="h-5 w-5 text-white mr-2" />
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 font-medium">
                  ⭐ Featured Post
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start mb-6">
            <div className="relative">
              <Avatar className="w-14 h-14 mr-4 ring-3 ring-white shadow-lg">
                <AvatarImage src={post.author.profileImage || ""} />
                <AvatarFallback className="bg-gradient-to-br from-[var(--law-gradient-from)] to-[var(--law-gradient-to)] text-white text-lg font-semibold">
                  {post.author.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[var(--law-success)] rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[var(--law-gray)] hover:text-[var(--law-blue)] cursor-pointer transition-colors">
                    {post.author.fullName}
                  </h3>
                  <p className="text-sm text-[var(--law-gray-light)] flex items-center">
                    {post.author.title} • {post.author.university}
                    <span className="mx-2 w-1 h-1 bg-[var(--law-gray-light)] rounded-full"></span>
                    {formatTimeAgo(new Date(post.createdAt!))}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-[var(--law-gray-light)] hover:text-[var(--law-blue)] rounded-full">
                  •••
                </Button>
              </div>
            </div>
          </div>

          {post.title && (
            <h4 className="text-xl font-bold text-[var(--law-gray)] mb-4 leading-tight">
              {post.title}
            </h4>
          )}

          <p className="text-[var(--law-gray)] mb-6 leading-relaxed text-base">
            {post.content}
          </p>

          {post.image && (
            <div className="relative mb-6 rounded-2xl overflow-hidden">
              <img 
                src={post.image} 
                alt="Post content" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => likePostMutation.mutate()}
                disabled={likePostMutation.isPending}
                className="flex items-center text-[var(--law-gray-light)] hover:text-red-500 transition-colors rounded-full px-4 py-2"
              >
                <Heart className="mr-2 h-5 w-5" />
                <span className="font-medium">{post.likes || 0}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center text-[var(--law-gray-light)] hover:text-[var(--law-blue)] transition-colors rounded-full px-4 py-2"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                <span className="font-medium">{post.comments || 0}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center text-[var(--law-gray-light)] hover:text-[var(--law-blue)] transition-colors rounded-full px-4 py-2"
              >
                <Share className="mr-2 h-5 w-5" />
                <span className="font-medium">Share</span>
              </Button>
            </div>
            {featured && (
              <Button
                variant="outline"
                className="gradient-bg text-white border-0 hover:scale-105 transition-transform font-medium rounded-full px-6"
              >
                Read more →
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
