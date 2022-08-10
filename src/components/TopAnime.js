import React, { useContext } from "react";
import classes from "./TopAnime.module.css";
import {IdContext} from "./../context/IdContext";

function TopAnime(props) {

  const [animeId, setAnimeId] = useContext(IdContext);


    return (
        <aside className={classes.topAnime}>
          <nav>
            <h2>Top Anime</h2>
            {props.topAnimeList.map((anime) => (
              <div
                className={classes.topAnimeList}
                key={anime.mal_id}
                onClick={() => {
                  setAnimeId(anime.mal_id);
                  props.modalOpen(true);
                }}
              >
                {anime.rank}
                {". "}
                {anime.title}
              </div>
            ))}
          </nav>
        </aside>
    );
}

export default TopAnime;