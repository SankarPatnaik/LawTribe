import { Home, Book, Handshake, Users, Briefcase, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User } from "@shared/schema";

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
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      {/* Profile Card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="text-center">
            <Avatar className="w-16 h-16 mx-auto mb-3">
              <AvatarImage src={currentUser.profileImage || ""} />
              <AvatarFallback>{currentUser.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-[var(--law-gray)]">{currentUser.fullName}</h3>
            <p className="text-sm text-gray-600">{currentUser.title}</p>
            <p className="text-xs text-gray-500">{currentUser.university}</p>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Profile Views</span>
              <span className="text-[var(--law-blue)] font-semibold">{currentUser.profileViews}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Connections</span>
              <span className="text-[var(--law-blue)] font-semibold">{currentUser.connections}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Navigation Menu */}
      <Card>
        <CardContent className="p-4">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start nav-link",
                      item.active && "bg-blue-50 text-[var(--law-blue)]"
                    )}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
}
