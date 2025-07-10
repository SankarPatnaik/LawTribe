import { Search, Bell, MessageCircle, Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-full px-6">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[var(--law-blue)] to-[var(--law-navy)] flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Scale className="h-7 w-7 text-[var(--law-gold)]" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--law-gold)] rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-[var(--law-blue)] to-[var(--law-navy)] bg-clip-text text-transparent">
                  LawConnect
                </span>
                <span className="text-xs font-medium text-[var(--law-gray-light)] -mt-1 tracking-wide">Professional Legal Network</span>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--law-gray-light)] h-5 w-5 group-focus-within:text-[var(--law-blue)] transition-colors" />
              <Input
                type="text"
                placeholder="Search portfolios, cases, legal insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-12 py-4 w-full text-base rounded-full border-2 border-gray-200 bg-gray-50/80 focus:bg-white focus:border-[var(--law-blue)] transition-all duration-300 placeholder:text-[var(--law-gray-light)] shadow-inner"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <span className="text-xs text-[var(--law-gray-light)]">Press</span>
                <kbd className="px-2 py-1 text-xs bg-white border border-gray-300 rounded-md text-[var(--law-gray-light)] shadow-sm">⌘K</kbd>
              </div>
            </div>
          </div>
          
          {/* Profile Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative w-12 h-12 rounded-full bg-gray-100 hover:bg-[var(--law-blue)]/10 transition-all duration-300">
              <Bell className="h-5 w-5 text-[var(--law-gray)]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--law-gold)] rounded-full text-white text-xs flex items-center justify-center font-bold">3</div>
            </Button>
            <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full bg-gray-100 hover:bg-[var(--law-navy)]/10 transition-all duration-300">
              <MessageCircle className="h-5 w-5 text-[var(--law-gray)]" />
            </Button>
            <div className="flex items-center space-x-3 ml-4 bg-gray-50 rounded-full p-2 hover:shadow-lg transition-all duration-300">
              <Avatar className="h-12 w-12 cursor-pointer ring-3 ring-white shadow-lg">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" />
                <AvatarFallback className="bg-gradient-to-br from-[var(--law-blue)] to-[var(--law-navy)] text-white font-bold">AJ</AvatarFallback>
              </Avatar>
              <div className="hidden md:block pr-2">
                <p className="text-sm font-bold text-[var(--law-gray)]">Alex Johnson</p>
                <p className="text-xs text-[var(--law-gray-light)] font-medium">Law Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
