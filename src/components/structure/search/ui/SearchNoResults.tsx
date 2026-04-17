"use client";

import SearchInitial from "./SearchInitial";

export default function SearchNoResults({ query, popular, setQuery }) {
  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h2 className="text-secondary text-xs font-semibold uppercase tracking-widest pb-2">
          Lo siento, no encontramos resultados para: <span className="text-primary/90 italic">&quot;{query}&quot;</span>
        </h2>
      </div>

      <SearchInitial
        popular={popular}
        setQuery={setQuery}
      />
    </div>
  );
}
