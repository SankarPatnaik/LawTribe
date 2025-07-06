import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PostCreation from "@/components/PostCreation";
import PostCard from "@/components/PostCard";
import FeedFilters from "@/components/FeedFilters";
import InternshipHighlights from "@/components/InternshipHighlights";
import UpcomingEvents from "@/components/UpcomingEvents";
import SuggestedConnections from "@/components/SuggestedConnections";
import MobileNavigation from "@/components/MobileNavigation";
import { useState } from "react";
import type { PostWithAuthor } from "@shared/schema";

export default function Home() {
  const [feedFilter, setFeedFilter] = useState<'top' | 'new'>('top');

  const { data: currentUser } = useQuery({
    queryKey: ['/api/user/current'],
  });

  const { data: featuredPosts = [] } = useQuery({
    queryKey: ['/api/posts/featured'],
  });

  const { data: posts = [] } = useQuery({
    queryKey: ['/api/posts'],
  });

  const filteredPosts = posts.filter((post: PostWithAuthor) => !post.isFeatured);
  const sortedPosts = feedFilter === 'top' 
    ? filteredPosts.sort((a: PostWithAuthor, b: PostWithAuthor) => (b.likes || 0) - (a.likes || 0))
    : filteredPosts.sort((a: PostWithAuthor, b: PostWithAuthor) => 
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );

  return (
    <div className="min-h-screen bg-[var(--law-light)]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <Sidebar currentUser={currentUser} />

          {/* Main Content */}
          <main className="flex-1 max-w-2xl">
            <PostCreation currentUser={currentUser} />
            
            {/* Featured Posts */}
            {featuredPosts.map((post: PostWithAuthor) => (
              <PostCard key={post.id} post={post} featured />
            ))}

            <FeedFilters 
              currentFilter={feedFilter} 
              onFilterChange={setFeedFilter} 
            />

            {/* Posts Feed */}
            <div className="space-y-6">
              {sortedPosts.map((post: PostWithAuthor) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="w-80 flex-shrink-0 hidden xl:block">
            <InternshipHighlights />
            <UpcomingEvents />
            <SuggestedConnections />
          </aside>
        </div>
      </div>

      <MobileNavigation />
    </div>
  );
}
