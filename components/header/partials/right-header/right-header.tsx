import { Bell, UserCog, Menu, Search, Star } from "lucide-react";
import { Button } from "@/components/common/button";
import { CoinSelector } from "./partials/coin-selector";
import { SearchModal } from "@/components/search-modal/search-modal";
import { useState } from "react";

const RightHeaderButtons = [
  { icon: Star, title: "Watchlist" },
  { icon: Bell, title: "Notifications" },
  { icon: UserCog, title: "Settings" },
  { icon: Menu, title: "Menu", className: "block sm:hidden" },
];

export const RightHeader = () => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const toggleSearchModal = () => {
    setSearchModalOpen(!searchModalOpen);
  };
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <button
        className="p-1.5 hover:bg-secondary rounded transition-colors"
        title="Search"
        onClick={toggleSearchModal}
      >
        <Search size={16} className="text-muted-foreground" />
      </button>

      <CoinSelector />
      <button className="bg-primary hover:bg-primary/90 text-black font-semibold px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm transition-colors">
        Deposit
      </button>

      {RightHeaderButtons.map(({ icon: Icon, title, className }) => (
        <Button key={title} title={title} bgFill className={className}>
          <Icon size={16} />
        </Button>
      ))}
      <SearchModal open={searchModalOpen} onOpenChange={toggleSearchModal} />
    </div>
  );
};
