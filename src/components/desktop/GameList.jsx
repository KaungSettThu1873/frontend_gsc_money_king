import React, { useContext, useEffect, useState,useFetch } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Spinner } from "react-bootstrap";
import { GameContext } from "../../contexts/GameContext";
import BASE_URL from "../../hooks/baseUrl";
import styles from "./GameList.module.css";
import RelatedProviderLists from "./RelatedProviderLists.jsx";




export function GameList({loading, games}) {
  const {content} = useContext(LanguageContext);
  const {current_type, current_provider} = useContext(GameContext);

  const [launchingGameId, setLaunchingGameId] = useState(null);
  const [launchError, setLaunchError] = useState("");

  const [page, setPage] = useState(1);
  const [allGames, setAllGames] = useState(games || []);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Effect to handle external 'games' prop
  useEffect(() => {
    if (games) {
      setAllGames(games);
      setHasMore(false); // Disable 'Load More' for manually passed games
    } else {
      // If 'games' prop is not provided, fetch initial data
      setPage(1);
      setAllGames([]);
      setHasMore(true);
      if (current_type && current_provider) {
        fetchInitialGames(1);
      }
    }
  }, [games, current_type, current_provider]);

  const fetchInitialGames = (pageNum) => {
    setLoadingMore(true);
    fetch(`${BASE_URL}/game_lists/${current_provider}/${current_type}?page=${pageNum}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json",
      },
    })
        .then((res) => res.json())
        .then((data) => {
          setAllGames(data.data || []);
          setHasMore((data.data || []).length === 20);
          setLoadingMore(false);
        });
  };

  // Load more games (only if not using 'games' prop)
  const handleLoadMore = () => {
    if (games) return; // Don't load more if games are passed directly

    const nextPage = page + 1;
    setLoadingMore(true);
    fetch(`${BASE_URL}/game_lists/${current_provider}/${current_type}?page=${nextPage}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json",
      },
    })
        .then((res) => res.json())
        .then((data) => {
          const newGames = data.data || [];
          setAllGames((prev) => {
            const existingIds = new Set(prev.map((g) => g.id));
            const uniqueNewGames = newGames.filter((g) => !existingIds.has(g.id));
            return [...prev, ...uniqueNewGames];
          });
          setPage(nextPage);
          setHasMore(newGames.length === 20);
          setLoadingMore(false);
        });
  };

  // console.log(localStorage.getItem("token"))



  const handleLaunchGame = async (game) => {

    const provider_code = +game.provider_code;



    setLaunchingGameId(game.id);
    setLaunchError("");

    try {
      const res = await fetch(`${BASE_URL}/direct/Seamless/LaunchGame`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          // game_code: game.game_code,
          // product_code: game.product_code,
          productId : provider_code,
          gameType  : game.game_type_id,

        }),
      });

      const result = await res.json();

      // if (result.code === 200) {
      //   console.log("Result",result);
        if (result.Url) {
          window.location.href = result.Url;
        } else if (result.content) {
          const gameWindow = window.open();
          if (gameWindow) {
            gameWindow.document.write(result.content);
            gameWindow.document.close();
          } else {
            setLaunchError("Popup blocked. Please allow popups.");
          }
        } else {
          setLaunchError(result.message || "Launch failed: No URL or content.");

        }
      // } else {
      //   setLaunchError(result.message || "Failed to launch game.");
      // }
    } catch (e) {
      setLaunchError("Network error. Please try again.");
    } finally {
      setLaunchingGameId(null);
    }
  };

  const displayGames = searchTerm
      ? allGames.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : allGames;



  let customGameTypes = current_type;

  // switch (current_type) {
  //   case '1':
  //     customGameTypes = "SLOT";
  //     break;
  //   case '2':
  //     customGameTypes = "LIVE_CASINO";
  //     break;
  //   case '3':
  //     customGameTypes = "SPORT_BOOK";
  //     break;
  //   case '4':
  //     customGameTypes = "VIRTUAL_SPORT";
  //     break;
  //   case '5':
  //     customGameTypes = "LOTTERY";
  //     break;
  //   case '8':
  //     customGameTypes = "FISHING";
  //     break;
  //   case '12':
  //     customGameTypes = "POKER";
  //     break;
  //   case '13':
  //     customGameTypes = "OTHERS";
  //     break;
  //   default:
  //     customGameTypes = null;
  //     break;
  // }

  if (loading && displayGames.length === 0) return <Spinner/>;
  if (!displayGames || displayGames.length === 0)
    return (<>
      <p className="text-center">{content?.no_data || "No games found."}</p>
    </>)


  return (
      <>
        <div className={styles.tabScrollRow} >
          <RelatedProviderLists    customGameType={customGameTypes}/>
        </div>
        {launchError && (
            <div className="col-12 mb-3">
              <div className="alert alert-danger" role="alert">
                {launchError}
              </div>
            </div>
        )}

        <div className="text-end">
          <input
              className="card-subnav-search mb-2 mt-2 border-0"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {displayGames.map((item) => (
            <div
                key={item.id}
                className="col-3 col-sm-3 col-md-3 col-lg-2 cursor-pointer mb-2 px-1"
            >
              <div className="gold-card rounded-4">
                <div
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                >

                  <img
                      src={item.image}

                      alt={item.game_name}
                      style={{width: "100%", height: "100%", objectFit: "cover"}}
                      onClick={() => handleLaunchGame(item)}
                  />
                </div>
                <div
                    className="px-3 mt-1 text-center"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      color: "#fff",
                      borderRadius: "200px",
                    }}
                >
                  <h6
                      className="mb-1"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "13px",
                      }}
                      title={item.game_name}
                  >
                    {item.game_name}
                  </h6>
                </div>
                <button
                    className={styles["play-btn"]}
                    onClick={() => handleLaunchGame(item)}
                    disabled={launchingGameId === item.id}
                >
                  {launchingGameId === item.id ? (
                      <Spinner animation="border" size="sm"/>
                  ) : (
                      content?.btn?.play_game || "Play"
                  )}
                </button>
              </div>
            </div>
        ))}

        {hasMore && !games && (

            <div className="text-center my-3">
              <button
                  className={styles["play-btn"]}
                  style={{maxWidth: 200}}
                  onClick={handleLoadMore}
                  disabled={loadingMore}
              >
                {loadingMore ? <Spinner animation="border" size="sm"/> : "Load More"}
              </button>
            </div>
        )}
      </>
  );
}
