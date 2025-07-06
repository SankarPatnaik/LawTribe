import { Button } from "@/components/ui/button";

interface FeedFiltersProps {
  currentFilter: 'top' | 'new';
  onFilterChange: (filter: 'top' | 'new') => void;
}

export default function FeedFilters({ currentFilter, onFilterChange }: FeedFiltersProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-[var(--law-gray)]">Recent Posts</h2>
      <div className="flex items-center space-x-2">
        <Button
          variant={currentFilter === 'top' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('top')}
          className={currentFilter === 'top' 
            ? 'bg-[var(--law-blue)] text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }
        >
          Top
        </Button>
        <Button
          variant={currentFilter === 'new' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('new')}
          className={currentFilter === 'new' 
            ? 'bg-[var(--law-blue)] text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }
        >
          New
        </Button>
      </div>
    </div>
  );
}
