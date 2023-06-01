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
  if (!hit["parent_album_id"]) {
    return <>Loading ...</>;
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
              maxWidth: "30%",
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
                {(hit["artist_credit"] ?? [])
                  .map((ac: any) => {
                    return ac.name + " " + ac.joinphrase;
                  })
                  .join("")}
              </div>
            </div>
            <div style={dataDivStyle}>
              <div>Tags:</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
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
              <div>Genres:</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {(hit.genres ?? []).map((t: string) => (
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
              <div>Media info:</div>
              <div>
                {(hit.media_infos ?? []).map((mi: any) => {
                  let format = "";
                  if (mi.format) {
                    format = " (" + mi.format + ")";
                  }
                  return <div>{mi.track_count + format}</div>;
                })}
              </div>
            </div>
            {hit["tracks"] && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                Tracks:{" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "10px",
                  }}
                >
                  {(hit["tracks"] ?? []).map((m: any, idx: number) => {
                    let children = m.map((t: any) => {
                      let date = "";
                      let length = "";
                      let rating = "";
                      if (t["first_release"]) {
                        date = " (" + t["first_release"] + ")";
                      }
                      if (t["length"]) {
                        let secs = (t["length"] % 60000) / 1000;
                        let secs_str = Math.floor(secs).toString();
                        if (secs < 10) {
                          secs_str = "0" + Math.floor(secs);
                        }
                        length =
                          " ⏱️: " +
                          Math.floor(t["length"] / 60000) +
                          ":" +
                          secs_str;
                      }
                      if (t?.rating?.value) {
                        rating =
                          "⭐: " +
                          t["rating"]["value"] +
                          " (" +
                          t["rating"]["votes-count"] +
                          ")";
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
                          <div> - {t.title}</div>
                          <div
                            style={{
                              flexShrink: 0,
                            }}
                          >
                            {rating} {length} {date}
                          </div>
                        </div>
                      );
                    });

                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div>{"Media " + (idx + 1) + ":"}</div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "10px",
                          }}
                        >
                          {children}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <a
                    href={
                      "https://musicbrainz.org/release-group/" +
                      hit["parent_album_id"]
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    Album
                  </a>
                  <a
                    href={"https://musicbrainz.org/artist/" + hit["artist_id"]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Artist
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
        {hit["artist_credit"].length > 0 && (
          <div className="hit-description">
            {hit["artist_credit"]
              .map((ac: any) => {
                return ac.name + " " + ac.joinphrase;
              })
              .join("")}
          </div>
        )}
      </div>
    </>
  );
};

export default Hit;
