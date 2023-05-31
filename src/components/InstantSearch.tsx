import React from "react";
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
  Snippet,
} from "react-instantsearch-dom";
import "instantsearch.css/themes/algolia-min.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch("http://localhost:7700", "", {
  finitePagination: true,
});

const AppInstantSearch = () => (
  <div className="ais-InstantSearch">
    <p>
      The data is from musicbranz and is limited
    </p>
    <InstantSearch indexName="artists" searchClient={searchClient}>
      <div className="left-panel">
        <ClearRefinements />
        <SortBy
          defaultRefinement="artists:rank:asc"
          items={[
            { value: "artists:rank:asc", label: "Relevant" },
            // {
            //   value: "steam-video-games:recommendationCount:desc",
            //   label: "Most Recommended"
            // },
            // {
            //   value: "steam-video-games:recommendationCount:asc",
            //   label: "Least Recommended"
            // }
          ]}
        />
        <h2>Genres</h2>
        <RefinementList attribute="genres" />
        <h2>Country</h2>
        <RefinementList attribute="country" />
        <h2>Type</h2>
        <RefinementList attribute="type" />
        <h2>Rating</h2>
        <RefinementList attribute="rating" />
        <Configure
          hitsPerPage={12}
          attributesToSnippet={["disambiguation:50"]}
          snippetEllipsisText={"..."}
        />
      </div>
      <div className="right-panel">
        <SearchBox />
        <Hits hitComponent={Hit} />
        <Pagination showLast={true} />
      </div>
    </InstantSearch>
  </div>
);

const Hit = ({ hit }: any) => {
  if (hit["disambiguation"] === null) {
    hit["disambiguation"] = "";
  }
  return (
    <div key={hit.id}>
      <div className="hit-name">
        <Highlight attribute="name" hit={hit} />
      </div>
      <img src={hit.image} alt={hit.name} />
      <div className="hit-description">
        <Snippet attribute="disambiguation" hit={hit} />
      </div>
      <div className="hit-info">Rank: {hit.rank}</div>
      <div className="hit-info">Country: {hit.country}</div>
      {hit.rating["value"] && (
        <div className="hit-info">
          Rating: {hit.rating["value"] + " (" + hit.rating["votes-count"] + ")"}
        </div>
      )}
    </div>
  );
};

export default AppInstantSearch;
