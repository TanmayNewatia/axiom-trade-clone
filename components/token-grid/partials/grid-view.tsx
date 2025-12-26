import { memo } from "react";
import { TokenCard } from "../../token-card/token-card";
import { useFilteredTokens } from "../hooks";
import { SectionHeader } from "./section-header";

interface GridViewProps {
  tokensBySection: ReturnType<typeof useFilteredTokens>["tokensBySection"];
  sectionCounts: ReturnType<typeof useFilteredTokens>["sectionCounts"];
}

export const GridView = memo(function GridView({
  tokensBySection,
  sectionCounts,
}: GridViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-max">
      {Object.entries(tokensBySection).map(([sectionName, sectionTokens]) => (
        <section
          key={sectionName}
          className={`space-y-3 ${
            sectionName === "Migrated" ? "sm:col-span-2 lg:col-span-1" : ""
          }`}
        >
          <SectionHeader
            title={sectionName}
            count={sectionCounts[sectionName as keyof typeof sectionCounts]}
          />
          <div className="space-y-2">
            {sectionTokens.map((token) => (
              <TokenCard key={`${token.section}-${token.name}`} token={token} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
});
