import { Button } from "@/components/ui/button";
import { TrendingUp, Clock } from "lucide-react";

interface FeedFiltersProps {
  currentFilter: 'top' | 'new';
  onFilterChange: (filter: 'top' | 'new') => void;
}

export default function FeedFilters({ currentFilter, onFilterChange }: FeedFiltersProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--law-gray)] mb-1">Community Feed</h2>
        <p className="text-sm text-[var(--law-gray-light)]">Stay connected with the legal community</p>
      </div>
      <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-2xl p-1 border border-white/20 shadow-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange('top')}
          className={`px-6 py-2 rounded-xl transition-all duration-300 flex items-center ${
            currentFilter === 'top' 
              ? 'gradient-bg text-white shadow-lg transform scale-105' 
              : 'text-[var(--law-gray-light)] hover:text-[var(--law-gray)] hover:bg-white/50'
          }`}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Top Posts
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange('new')}
          className={`px-6 py-2 rounded-xl transition-all duration-300 flex items-center ${
            currentFilter === 'new' 
              ? 'gradient-bg text-white shadow-lg transform scale-105' 
              : 'text-[var(--law-gray-light)] hover:text-[var(--law-gray)] hover:bg-white/50'
          }`}
        >
          <Clock className="mr-2 h-4 w-4" />
          Latest
        </Button>
      </div>
    </div>
  );
}
