import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Filter } from "lucide-react";

interface FeedFiltersProps {
  currentFilter: 'top' | 'new';
  onFilterChange: (filter: 'top' | 'new') => void;
}

export default function FeedFilters({ currentFilter, onFilterChange }: FeedFiltersProps) {
  return (
    <div className="flex items-center justify-between mb-10 p-6 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-gray-100 shadow-xl">
      <div className="flex items-center space-x-6">
        <h2 className="text-2xl font-black text-[var(--law-gray)] flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-[var(--law-purple)] to-[var(--law-blue)] rounded-2xl flex items-center justify-center mr-3">
            <Filter className="h-5 w-5 text-white" />
          </div>
          Creative Feed
        </h2>
        <div className="flex items-center space-x-3 bg-gray-50 rounded-3xl p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange('top')}
            className={`rounded-2xl transition-all duration-300 px-6 py-3 font-bold text-sm ${
              currentFilter === 'top' 
                ? 'bg-gradient-to-r from-[var(--law-purple)] to-[var(--law-blue)] text-white shadow-lg transform scale-105' 
                : 'text-[var(--law-gray)] hover:bg-white hover:text-[var(--law-purple)] hover:scale-105'
            }`}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            🔥 Top Portfolios
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange('new')}
            className={`rounded-2xl transition-all duration-300 px-6 py-3 font-bold text-sm ${
              currentFilter === 'new' 
                ? 'bg-gradient-to-r from-[var(--law-purple)] to-[var(--law-blue)] text-white shadow-lg transform scale-105' 
                : 'text-[var(--law-gray)] hover:bg-white hover:text-[var(--law-purple)] hover:scale-105'
            }`}
          >
            <Clock className="mr-2 h-4 w-4" />
            ⚡ Fresh Work
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-[var(--law-gray-light)]">Discover:</span>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gradient-to-r from-[var(--law-purple)] to-[var(--law-blue)] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-[var(--law-blue)] to-[var(--law-cyan)] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 bg-gradient-to-r from-[var(--law-cyan)] to-[var(--law-purple)] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-[var(--law-purple)]/10 to-[var(--law-blue)]/10 rounded-full">
          <span className="text-xs font-bold text-[var(--law-purple)]">24 new works today</span>
        </div>
      </div>
    </div>
  );
}
