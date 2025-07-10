import { Home, Book, Handshake, Users, Briefcase, Calendar, Hash, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User } from "@shared/schema";
import { Link } from "wouter";

interface SidebarProps {
  currentUser?: User;
}

export default function Sidebar({ currentUser }: SidebarProps) {
  if (!currentUser) return null;

  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Book, label: "Resources", active: false },
    { icon: Handshake, label: "Connect", active: false },
    { icon: Users, label: "Moot Groups", active: false },
    { icon: Briefcase, label: "Internships", active: false },
    { icon: Calendar, label: "Events", active: false },
  ];

  return (
    <aside className="w-80 flex-shrink-0 hidden lg:block glass-effect border-r border-white/20 h-screen sticky top-0 p-6 overflow-y-auto">
      <div className="space-y-8">
        {/* Profile Card */}
        <Card className="profile-card card-shadow rounded-3xl border-0 overflow-hidden">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-white shadow-xl">
                  <AvatarImage src={currentUser.profileImage || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-[var(--law-gradient-from)] to-[var(--law-gradient-to)] text-white text-2xl font-bold">
                    {currentUser.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[var(--law-success)] rounded-full border-3 border-white"></div>
              </div>
              <h3 className="font-bold text-xl text-[var(--law-gray)] mb-1">{currentUser.fullName}</h3>
              <p className="text-sm text-[var(--law-gray-light)] mb-1">{currentUser.title}</p>
              <p className="text-xs text-[var(--law-blue)] font-medium">{currentUser.university}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-2xl font-bold text-[var(--law-blue)]">{currentUser.profileViews || 24}</div>
                  <div className="text-[var(--law-gray-light)]">Profile Views</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-2xl font-bold text-[var(--law-purple)]">{currentUser.connections || 156}</div>
                  <div className="text-[var(--law-gray-light)]">Connections</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Navigation Menu */}
        <Card className="card-shadow rounded-3xl border-0 overflow-hidden">
          <CardContent className="p-6">
            <h4 className="font-bold text-[var(--law-gray)] mb-4">Navigation</h4>
            <nav>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start nav-link px-4 py-3 rounded-2xl transition-all duration-300 text-[var(--law-gray)]",
                        item.active && "bg-gradient-to-r from-[var(--law-gradient-from)] to-[var(--law-gradient-to)] text-white shadow-lg"
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card className="card-shadow rounded-3xl border-0 overflow-hidden">
          <CardContent className="p-6">
            <h4 className="font-bold text-[var(--law-gray)] mb-4">Trending Topics</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center px-4 py-3 text-[var(--law-gray-light)] hover:text-[var(--law-blue)] hover:bg-blue-50 rounded-xl transition-all duration-300 group">
                <Hash className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Constitutional Law</span>
                <span className="ml-auto text-xs bg-[var(--law-blue)] text-white px-2 py-1 rounded-full">Hot</span>
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-[var(--law-gray-light)] hover:text-[var(--law-purple)] hover:bg-purple-50 rounded-xl transition-all duration-300 group">
                <Hash className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Criminal Law</span>
                <span className="ml-auto text-xs bg-[var(--law-purple)] text-white px-2 py-1 rounded-full">New</span>
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-[var(--law-gray-light)] hover:text-[var(--law-warning)] hover:bg-orange-50 rounded-xl transition-all duration-300 group">
                <Hash className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Law School Tips</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Study Groups */}
        <Card className="card-shadow rounded-3xl border-0 overflow-hidden">
          <CardContent className="p-6">
            <h4 className="font-bold text-[var(--law-gray)] mb-4">Study Groups</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center px-4 py-3 text-[var(--law-gray-light)] hover:text-[var(--law-blue)] hover:bg-blue-50 rounded-xl transition-all duration-300 group">
                <Users className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <div className="font-medium">Moot Court Prep</div>
                  <div className="text-xs text-[var(--law-gray-light)]">12 members</div>
                </div>
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-[var(--law-gray-light)] hover:text-[var(--law-purple)] hover:bg-purple-50 rounded-xl transition-all duration-300 group">
                <Users className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <div className="font-medium">Bar Exam Study</div>
                  <div className="text-xs text-[var(--law-gray-light)]">8 members</div>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
