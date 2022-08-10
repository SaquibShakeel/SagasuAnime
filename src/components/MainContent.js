import React from "react";
import AnimeCard from "./AnimeCard";
import classes from "./MainContent.module.css";

function MainContent(props) {
    return (
        <main className={classes.mainContent}>
            <div className={classes.animeGrid} >
                {props.animeList.map(anime => {
                    return (
                      <AnimeCard
                        data={anime}
                        key={anime.mal_id}
                        modalOpen={props.modalOpen}
                      />
                    );
                })}
            </div>
        </main>
    );
}

export default MainContent;