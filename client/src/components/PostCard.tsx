import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, Pin } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
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
    <div className="mb-8 relative group">
      {featured && (
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--law-purple)] via-[var(--law-pink)] to-[var(--law-cyan)] rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      )}
      
      <Card className={cn(
        "relative bg-white rounded-3xl border-0 shadow-2xl overflow-hidden transition-all duration-500",
        featured ? "transform hover:scale-[1.02]" : "hover:shadow-xl hover:-translate-y-2"
      )}>
        <CardContent className="p-0">
          {featured && (
            <div className="bg-gradient-to-r from-[var(--law-purple)] via-[var(--law-pink)] to-[var(--law-cyan)] px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <Pin className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white font-black text-sm tracking-wide">✨ FEATURED PORTFOLIO SHOWCASE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div className="p-8">
            <div className="flex items-start mb-6">
              <div className="relative">
                <Avatar className="w-16 h-16 mr-4 ring-4 ring-white shadow-xl">
                  <AvatarImage src={post.author.profileImage || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-[var(--law-purple)] to-[var(--law-blue)] text-white text-xl font-black">
                    {post.author.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-[var(--law-success)] to-[var(--law-cyan)] rounded-full border-3 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-black">✓</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-black text-xl text-[var(--law-gray)] hover:text-[var(--law-purple)] cursor-pointer transition-colors mb-1">
                      {post.author.fullName}
                    </h3>
                    <p className="text-sm font-semibold text-[var(--law-gray-light)] flex items-center mb-2">
                      {post.author.title} • {post.author.university}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-gradient-to-r from-[var(--law-blue)] to-[var(--law-cyan)] text-white text-xs font-bold rounded-full">
                        {formatTimeAgo(new Date(post.createdAt!))}
                      </span>
                      <span className="px-2 py-1 bg-gradient-to-r from-[var(--law-purple)] to-[var(--law-pink)] text-white text-xs font-bold rounded-full">
                        #{post.type || 'general'}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-[var(--law-purple)] hover:to-[var(--law-blue)] hover:text-white transition-all">
                    •••
                  </Button>
                </div>
              </div>
            </div>

            {post.title && (
              <h4 className="text-2xl font-black text-[var(--law-gray)] mb-6 leading-tight bg-gradient-to-r from-[var(--law-gray)] to-[var(--law-purple)] bg-clip-text text-transparent">
                {post.title}
              </h4>
            )}

            <p className="text-[var(--law-gray)] mb-8 leading-relaxed text-lg font-medium">
              {post.content}
            </p>

            {post.image && (
              <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full h-80 object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[var(--law-gray)] text-xs font-bold rounded-full">
                      📸 Portfolio Showcase
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t-2 border-gray-100">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => likePostMutation.mutate()}
                  disabled={likePostMutation.isPending}
                  className="flex items-center px-4 py-3 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 text-red-500 hover:from-red-500 hover:to-pink-500 hover:text-white transition-all duration-300 hover:scale-110 font-bold"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  <span>{post.likes || 0} Appreciations</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 text-[var(--law-blue)] hover:from-[var(--law-blue)] hover:to-[var(--law-cyan)] hover:text-white transition-all duration-300 hover:scale-110 font-bold"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  <span>{post.comments || 0} Comments</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 text-[var(--law-purple)] hover:from-[var(--law-purple)] hover:to-[var(--law-pink)] hover:text-white transition-all duration-300 hover:scale-110 font-bold"
                >
                  <Share className="mr-2 h-5 w-5" />
                  <span>Share</span>
                </Button>
              </div>
              {featured && (
                <Button className="bg-gradient-to-r from-[var(--law-purple)] to-[var(--law-pink)] text-white border-0 hover:scale-110 transition-all duration-300 font-black rounded-2xl px-8 py-3 shadow-xl">
                  View Portfolio →
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
