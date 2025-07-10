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
    <aside className="w-72 flex-shrink-0 hidden lg:block bg-white/40 backdrop-blur-sm border-r border-gray-200/30 h-screen sticky top-0 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Portfolio Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--law-blue)] to-[var(--law-navy)] rounded-3xl transform rotate-1"></div>
          <Card className="relative bg-white rounded-3xl border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-20 h-20 mx-auto ring-4 ring-white shadow-xl">
                    <AvatarImage src={currentUser.profileImage || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-[var(--law-blue)] to-[var(--law-navy)] text-white text-2xl font-bold">
                      {currentUser.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--law-gold)] rounded-full border-4 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
                <h3 className="font-black text-lg text-[var(--law-gray)] mb-1">{currentUser.fullName}</h3>
                <p className="text-sm font-semibold text-[var(--law-gray-light)] mb-1">{currentUser.title}</p>
                <p className="text-xs font-medium text-[var(--law-blue)]">{currentUser.university}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center p-4 bg-gradient-to-br from-[var(--law-blue)] to-[var(--law-navy)] rounded-2xl text-white shadow-lg">
                    <div className="text-2xl font-black">{currentUser.profileViews || 24}</div>
                    <div className="text-xs font-medium opacity-90">Portfolio Views</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-[var(--law-gold)] to-[var(--law-gold-light)] rounded-2xl text-white shadow-lg">
                    <div className="text-2xl font-black">{currentUser.connections || 156}</div>
                    <div className="text-xs font-medium opacity-90">Connections</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Navigation Menu */}
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full justify-start px-4 py-4 rounded-2xl transition-all duration-300 font-semibold text-left group",
                item.active 
                  ? "bg-gradient-to-r from-[var(--law-blue)] to-[var(--law-navy)] text-white shadow-xl transform scale-105" 
                  : "text-[var(--law-gray)] hover:bg-white hover:shadow-lg hover:scale-105"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mr-3 transition-all",
                item.active 
                  ? "bg-white/20" 
                  : "bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-[var(--law-blue)] group-hover:to-[var(--law-navy)]"
              )}>
                <item.icon className={cn("h-5 w-5", item.active ? "text-white" : "text-[var(--law-gray)] group-hover:text-white")} />
              </div>
              <span>{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Trending Tags */}
        <Card className="bg-white rounded-3xl border-0 shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <h4 className="font-black text-[var(--law-gray)] mb-4 flex items-center">
              <Hash className="mr-2 h-5 w-5 text-[var(--law-blue)]" />
              Trending Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-2 bg-gradient-to-r from-[var(--law-blue)] to-[var(--law-navy)] text-white text-xs font-bold rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
                #ConstitutionalLaw
              </span>
              <span className="px-3 py-2 bg-gradient-to-r from-[var(--law-gold)] to-[var(--law-gold-light)] text-white text-xs font-bold rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
                #CriminalLaw
              </span>
              <span className="px-3 py-2 bg-gradient-to-r from-[var(--law-silver)] to-[var(--law-gray-light)] text-white text-xs font-bold rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
                #LawSchoolTips
              </span>
              <span className="px-3 py-2 bg-gradient-to-r from-[var(--law-navy)] to-[var(--law-blue)] text-white text-xs font-bold rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
                #MootCourt
              </span>
              <span className="px-3 py-2 bg-gradient-to-r from-[var(--law-blue-dark)] to-[var(--law-navy)] text-white text-xs font-bold rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
                #LegalTech
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Creative Communities */}
        <Card className="bg-white rounded-3xl border-0 shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <h4 className="font-black text-[var(--law-gray)] mb-4 flex items-center">
              <Users className="mr-2 h-5 w-5 text-[var(--law-gold)]" />
              Professional Networks
            </h4>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gradient-to-r from-[var(--law-blue)]/10 to-[var(--law-navy)]/10 rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 bg-gradient-to-r from-[var(--law-blue)] to-[var(--law-navy)] rounded-2xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm">MC</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[var(--law-gray)] text-sm">Moot Court Network</div>
                  <div className="text-xs text-[var(--law-gray-light)]">127 legal professionals</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gradient-to-r from-[var(--law-gold)]/10 to-[var(--law-gold-light)]/10 rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 bg-gradient-to-r from-[var(--law-gold)] to-[var(--law-gold-light)] rounded-2xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm">LT</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[var(--law-gray)] text-sm">Legal Tech Society</div>
                  <div className="text-xs text-[var(--law-gray-light)]">89 innovators</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
