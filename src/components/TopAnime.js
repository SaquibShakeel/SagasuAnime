import React, { useContext } from "react";
import classes from "./TopAnime.module.css";
import {IdContext} from "./../context/IdContext";

function TopAnime(props) {

  const [animeId, setAnimeId] = useContext(IdContext);


    return (
        <aside className={classes.topAnime}>
            <h2>Top Anime</h2>
          <nav>
            {props.topAnimeList?.map((anime, index) => (
              <div
                className={classes.topAnimeList}
                key={anime.id}
                onClick={() => {
                  setAnimeId(anime.id);
                  props.modalOpen(true);
                }}
              >
                {index + 1}
                {". "}
                {anime.title.romaji}
              </div>
            ))}
          </nav>
        </aside>
    );
}

export default TopAnime;