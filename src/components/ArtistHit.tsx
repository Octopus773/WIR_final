import React from "react";
import {
    Highlight,
    Snippet,
} from "react-instantsearch-dom";
import Modal from "react-modal";

const Hit = ({ hit }: any) => {
    if (hit["disambiguation"] === null) {
      hit["disambiguation"] = "";
    }
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const dataDivStyle = {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    } as React.CSSProperties;
    if (hit["parent_album_id"]) {
      return (
        <>
         Loading...
        </>
      )
    }
    return (
      <>
        <Modal
          isOpen={isPopoverOpen}
          onRequestClose={() => setIsPopoverOpen(!isPopoverOpen)}
          contentLabel="Artist info"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <img
              style={{
                flexShrink: 0,
              }}
              src={hit.image}
              alt={hit.name}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
                width: "100%",
              }}
            >
              <div style={dataDivStyle}>
                <div>Name:</div> <div>{hit.name}</div>
              </div>
              <div style={dataDivStyle}>
                <div>Description:</div> <div>{hit.disambiguation ?? "None"}</div>
              </div>
              <div style={dataDivStyle}>
                <div>Country:</div> <div>{hit.country}</div>
              </div>
              <div style={dataDivStyle}>
                <div>Rank:</div> <div>{hit.rank}</div>
              </div>
              <div style={dataDivStyle}>
                <div>Tags:</div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {(hit.tags ?? []).map((t: string) => (
                    <div
                      style={{
                        backgroundColor: "#eee",
                        borderRadius: "5px",
                        padding: "5px",
                        marginRight: "5px",
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div style={dataDivStyle}>
                <div>Type:</div> <div>{hit.type}</div>
              </div>
              <div style={dataDivStyle}>
                <div>Rating:</div>
                <div>
                  {hit.rating["value"]} ({hit.rating["votes-count"]})
                </div>
              </div>
              {hit["life-span"]?.begin && (
                <div style={dataDivStyle}>
                  <div>Life span:</div>{" "}
                  <div>
                    {Object.values(hit["life-span"])
                      .filter((e) => e != null)
                      .join(" - ")}
                  </div>
                </div>
              )}
              {hit["begin_area"]?.name && (
                <div style={dataDivStyle}>
                  <div>Begin area:</div> <div>{hit["begin_area"].name}</div>
                </div>
              )}
              {hit["aliases"] && (
                <div style={dataDivStyle}>
                  <div>Aliases:</div> <div>{hit["aliases"].join(", ")}</div>
                </div>
              )}
              {hit["release_groups"] && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  Release groups:{" "}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "10px",
                    }}
                  >
                    {(hit["release_groups"] ?? []).map((rg: any) => {
                      let date = "";
                      if (rg["first-release-date"]) {
                        date = " (" + rg["first-release-date"] + ")";
                      }
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div> - {rg.title}</div>
                          <div>{date}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <a
                      href={"https://musicbrainz.org/artist/" + hit["mbid"]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      See artist on MusicBrainz
                    </a>
  
                    <button
                      style={{
                        marginLeft: "10px",
                      }}
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
        <div key={hit.id} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
          <div className="hit-name">
            <Highlight attribute="name" hit={hit} />
          </div>
          <img src={hit.image} alt={hit.name} />
          <div className="hit-description">
            <Snippet attribute="disambiguation" hit={hit} />
          </div>
          <div className="hit-info">
            🏆: {hit.rank} 🌍: {hit.country}
          </div>
          <div className="hit-info"></div>
          {hit.rating["value"] && (
            <div className="hit-info">
              {"⭐: " +
                hit.rating["value"] +
                " (" +
                hit.rating["votes-count"] +
                ")"}
            </div>
          )}
        </div>
      </>
    );
  };

export default Hit;