import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppInstantSearch from "./components/InstantSearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

function App() {
  const [indexName, setIndexName] = React.useState("albums");

  const searchClient = instantMeiliSearch("http://localhost:7700", "", {
    finitePagination: true,
  });
  return (
    <div className="App">
      <input
        type="radio"
        name="index"
        value="artists"
        checked={indexName === "artists"}
        onChange={() => setIndexName("artists")}
      />{" "}
      Artists <br />
      <input
        type="radio"
        name="index"
        value="albums"
        checked={indexName === "albums"}
        onChange={() => setIndexName("albums")}
      />{" "}
      Albums <br />
      <AppInstantSearch indexName={indexName} searchClient={searchClient} />
      {/* {(() => {
        if (indexName === "albums") {
          return (
            <AppInstantSearch
              indexName={"albums"}
              searchClient={searchClient}
            />
          );
        }
        if (indexName === "artists") {
          return (
            <AppInstantSearch
              indexName={"artists"}
              searchClient={searchClient}
            />
          );
        }
      })()} */}
    </div>
  );
}

export default App;
