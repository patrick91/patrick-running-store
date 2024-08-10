"use client";

import algoliasearch from "algoliasearch/lite";
import {
  Hits,
  InstantSearch,
  Configure,
  useSearchBox,
} from "react-instantsearch";
import { TShirtCard } from "./tshirt-card";

export const Hit = ({ hit }: any) => {
  return <TShirtCard product={hit} />;
};

const searchClient = algoliasearch(
  "YVPY8WKJE7",
  "378d15a0e2c769bfa1f8df9c0db16eca",
);

function CustomSearchBox() {
  const { query, refine } = useSearchBox();

  return (
    <div>
      <input
        type="search"
        value={query}
        placeholder="Search for products..."
        onChange={(event) => refine(event.currentTarget.value)}
        className="w-full p-4 mb-8 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export const Search = ({ maxDistance }: { maxDistance: number }) => {
  const maxDistanceInKm = maxDistance / 1_000;

  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <Configure
        hitsPerPage={15}
        numericFilters={`minRun <= ${maxDistanceInKm}`}
        distinct
      />

      <div className="ais-InstantSearch">
        <CustomSearchBox />

        <Hits
          hitComponent={Hit}
          className="[&>ol]:grid [&>ol]:gap-8 [&>ol]:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]"
        />
      </div>
    </InstantSearch>
  );
};
