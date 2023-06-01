import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Popover, ArrowContainer } from "react-tiny-popover";

// import "instantsearch.css/themes/algolia-min.css";
import {
  InstantSearch,
  Hits,
  SortBy,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  RangeInput,
  Snippet,
} from "react-instantsearch-dom";
import "instantsearch.css/themes/algolia-min.css";

import ArtistHit from "./ArtistHit";
import AlbumHit from "./AlbumHit";

const searchPresets = {
  artists: {
    indexName: "artists",
    defaultRefinement: "artists:rank:asc",
    sortItems: [
      { value: "artists:rank:asc", label: "Relevant" },
      { value: "artists:rating.value:desc", label: "Rating (desc))" },
    ],
    attributesForFaceting: [
      {
        name: "Tags",
        attribute: "tags",
        type: "string",
      },
      {
        name: "Country",
        attribute: "country",
        type: "string",
      },
      {
        name: "Type",
        attribute: "type",
        type: "string",
      },
      {
        name: "Rank",
        attribute: "rank",
        type: "number",
      },
    ],
    hitComponent: ArtistHit,
  },
  albums: {
    indexName: "albums",
    defaultRefinement: "albums:title:asc",
    sortItems: [
      {
        value: "albums:title:asc",
        label: "Title (asc)",
      },
    ],
    attributesForFaceting: [
      {
        name: "Tags",
        attribute: "tags",
        type: "string",
      },
      {
        name: "Genre",
        attribute: "genres",
        type: "string",
      },
    ],
    hitComponent: ArtistHit,
  },
};

type AppInstantSearchProps = {
  indexName: string;
  searchClient?: any;
};

const AppInstantSearch = ({
  indexName,
  searchClient,
}: AppInstantSearchProps) => {
  // const [indexName, setIndexName] = React.useState("albums");
  return (
    <div className="ais-InstantSearch">
      <p>Datset is composed of top 1000 artists from spotify and 10785 of their albums</p>
      <p>Search is based on every fields you can see when clicking a result card</p>
      <InstantSearch
        indexName={(searchPresets as any)[indexName]}
        searchClient={searchClient}
      >
        <div className="left-panel">
          <ClearRefinements />
          <SortBy
            defaultRefinement={
              (searchPresets as any)[indexName].defaultRefinement
            }
            items={(searchPresets as any)[indexName].sortItems}
          />
          {(searchPresets as any)[indexName].attributesForFaceting.map(
            (facet: any) => {
              return (
                <>
                  <h2>{facet.name}</h2>
                  {facet.type === "number" && (
                    <RangeInput attribute={facet.attribute} />
                  )}
                  {facet.type === "string" && (
                    <RefinementList attribute={facet.attribute} />
                  )}
                </>
              );
            }
          )}
          <Configure
            hitsPerPage={12}
            attributesToSnippet={["disambiguation:50"]}
            snippetEllipsisText={"..."}
          />
        </div>
        <div className="right-panel">
          <SearchBox />
          <Hits hitComponent={indexName === "artists" ? ArtistHit : AlbumHit} />
          <Pagination showLast={true} />
        </div>
      </InstantSearch>
    </div>
  );
};

export default AppInstantSearch;
