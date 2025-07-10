import { Search, Bell, MessageCircle, Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="glass-effect shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center group cursor-pointer">
              <div className="relative">
                <Scale className="h-10 w-10 text-[var(--law-blue)] mr-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--law-accent)] rounded-full pulse-dot"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-[var(--law-gradient-from)] to-[var(--law-gradient-to)] bg-clip-text text-transparent">
                  LawConnect
                </span>
                <span className="text-xs text-[var(--law-gray-light)] -mt-1">Legal Community</span>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--law-gray-light)] h-5 w-5 group-focus-within:text-[var(--law-blue)] transition-colors" />
              <Input
                type="text"
                placeholder="Search for lawyers, cases, legal topics, or connect with peers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full text-base rounded-2xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white/80 focus:ring-2 focus:ring-[var(--law-blue)]/30 transition-all duration-300 placeholder:text-[var(--law-gray-light)]"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs bg-[var(--law-light)] rounded-md text-[var(--law-gray-light)]">⌘K</kbd>
              </div>
            </div>
          </div>
          
          {/* Profile Menu */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-white/20 rounded-full transition-all duration-300">
              <Bell className="h-5 w-5 text-[var(--law-gray)]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--law-accent)] rounded-full animate-pulse"></div>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/20 rounded-full transition-all duration-300">
              <MessageCircle className="h-5 w-5 text-[var(--law-gray)]" />
            </Button>
            <div className="flex items-center space-x-3 ml-4">
              <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-white/20 hover:ring-[var(--law-blue)]/50 transition-all duration-300">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" />
                <AvatarFallback className="bg-gradient-to-br from-[var(--law-gradient-from)] to-[var(--law-gradient-to)] text-white font-semibold">AJ</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-[var(--law-gray)]">Alex Johnson</p>
                <p className="text-xs text-[var(--law-gray-light)]">3rd Year Law Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
