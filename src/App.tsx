import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppInstantSearch from "./components/InstantSearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

function App() {
  const [indexName, setIndexName] = React.useState("artists");

  const searchClient = instantMeiliSearch("https://8350-194-206-82-150.ngrok-free.app/", "", {
    finitePagination: true,
  });
  return (
    <div className="App">
        <input
          type="radio"
          name="index"
          value="artists"
          id="artists"
          checked={indexName === "artists"}
          onChange={() => setIndexName("artists")}
        />
        <label htmlFor="artists">Artists</label>
        <input
          type="radio"
          name="index"
          value="albums"
          id="albums"
          checked={indexName === "albums"}
          onChange={() => setIndexName("albums")}
        />
        <label htmlFor="albums">Albums</label>
      {(() => {
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
      })()}
    </div>
  );
}

export default App;
