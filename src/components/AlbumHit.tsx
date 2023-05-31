import React from "react";
import { Highlight, Snippet } from "react-instantsearch-dom";
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
            src={hit.cover}
            alt={hit.title}
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
              <div>Title:</div> <div>{hit.title}</div>
            </div>
            <div style={dataDivStyle}>
              <div>Date:</div>
              <div>{hit.date}</div>
            </div>
            <div style={dataDivStyle}>
              <div>Artist(s):</div>{" "}
              <div>
                {hit["artist_credit"]
                  .map((ac: any) => {
                    return ac.name + " " + ac.joinphrase;
                  })
                  .join(" ")}
              </div>
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
              <div>Media info:</div>{" "}
              <div>
                {hit.media_infos.map((mi: any) => {
                  let format = "";
                  if (mi.format) {
                    format = " (" + mi.format + ")";
                  }
                  return <div>{mi.track_count + format}</div>;
                })}
              </div>
            </div>
            {hit?.rating?.value && (
              <div style={dataDivStyle}>
                <div>Rating:</div>
                <div>
                  {hit.rating["value"]} ({hit.rating["votes-count"]})
                </div>
              </div>
            )}
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
          <Highlight attribute="title" hit={hit} />
        </div>
        <img src={hit.cover} alt={hit.title} />
      </div>
    </>
  );
};

export default Hit;
