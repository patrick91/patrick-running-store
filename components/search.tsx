"use client";

import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { TShirtCard } from "./tshirt-card";

export const Hit = ({ hit }) => {
  return <TShirtCard product={hit} />;
};

const searchClient = algoliasearch(
  "YVPY8WKJE7",
  "378d15a0e2c769bfa1f8df9c0db16eca",
);

export const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <Configure hitsPerPage={5} />

      <div className="ais-InstantSearch">
        <SearchBox />
        <Hits
          hitComponent={Hit}
          className="[&>ol]:grid [&>ol]:grid-cols-3 [&>ol]:gap-8"
        />
      </div>
    </InstantSearch>
  );
};
