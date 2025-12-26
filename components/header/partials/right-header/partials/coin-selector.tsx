import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Coin } from "./coin";
import { ChevronDown } from "lucide-react";

export const CoinSelector = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1.5 bg-secondary px-2 sm:px-3 py-1 rounded-full border-2 border-emerald-700/20 text-xs sm:text-sm cursor-pointer">
          <Image
            src="https://axiom.trade/images/sol-fill.svg"
            width={16}
            height={16}
            alt="SOL"
          />
          <span className="font-medium">SOL</span>
          <ChevronDown size={12} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Coin
            coinSrc="https://axiom.trade/images/sol-fill.svg"
            coinName="SOL"
          />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Coin
            coinSrc="https://axiom.trade/images/bnb-fill.svg"
            coinName="BNB"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
