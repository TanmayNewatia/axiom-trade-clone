import { ChevronDown } from "lucide-react";
import Image from "next/image";

export const Coin = ({
  coinSrc,
  coinName,
  showChevron = false,
}: {
  coinName: string;
  coinSrc: string;
  showChevron?: boolean;
}) => {
  return (
    <div className="flex items-center w-full gap-1.5 bg-secondary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm cursor-pointer">
      <Image src={coinSrc} width={16} height={16} alt={coinName} />
      <span className="font-medium uppercase">{coinName}</span>
      {showChevron && <ChevronDown size={12} />}
    </div>
  );
};
