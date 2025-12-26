import { HeaderLink } from "@/components/common/header-link";
import { NavBarTiles } from "@/lib/constants";

export const LeftHeader = () => {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-6 h-6 bg-white rounded-sm"></div>
      </div>

      {/* Navigation - hidden on mobile */}
      <nav className="text-md hidden md:flex items-center gap-2 lg:gap-4">
        {NavBarTiles.map((item) => (
          <HeaderLink key={item.name} link={item} />
        ))}
      </nav>
    </div>
  );
};
