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
  Snippet
} from "react-instantsearch-dom";
import "instantsearch.css/themes/algolia-min.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
    "https://localhost:7700",
    "",
    {
      finitePagination: true
    }
  );
  
  const AppInstantSearch = () => (
    <div className="ais-InstantSearch">
      <h1>MeiliSearch + React InstantSearch</h1>
      <h2>
        Search in Steam video games{" "}
        <span role="img" aria-label="emoji">
          🎮
        </span>
      </h2>
      <p>
        This is not the official Steam dataset but only for demo purpose. Enjoy
        searching with MeiliSearch!
      </p>
      <InstantSearch indexName="steam-video-games" searchClient={searchClient}>
        <div className="left-panel">
          <ClearRefinements />
          <SortBy
            defaultRefinement="steam-video-games"
            items={[
              { value: "steam-video-games", label: "Relevant" },
              {
                value: "steam-video-games:recommendationCount:desc",
                label: "Most Recommended"
              },
              {
                value: "steam-video-games:recommendationCount:asc",
                label: "Least Recommended"
              }
            ]}
          />
          <h2>Genres</h2>
          <RefinementList attribute="genres" />
          <h2>Players</h2>
          <RefinementList attribute="players" />
          <h2>Platforms</h2>
          <RefinementList attribute="platforms" />
          <h2>Misc</h2>
          <RefinementList attribute="misc" />
          <Configure
            hitsPerPage={6}
            attributesToSnippet={["description:50"]}
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
  
  const Hit = ({ hit }: any) => (
    <div key={hit.id}>
      <div className="hit-name">
        <Highlight attribute="name" hit={hit} />
      </div>
      <img src={hit.image} alt={hit.name} />
      <div className="hit-description">
        <Snippet attribute="description" hit={hit} />
      </div>
      <div className="hit-info">price: {hit.price}</div>
      <div className="hit-info">release date: {hit.releaseDate}</div>
    </div>
  );
  
  export default AppInstantSearch;