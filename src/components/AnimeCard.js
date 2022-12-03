import classes from "./AnimeCard.module.css";
import {IdContext} from "../context/IdContext";
import { useContext } from "react";

function AnimeCard(props) {
    
    const [animeId, setAnimeId] = useContext(IdContext);

    const onCardClickHandler = () => {
        setAnimeId(props.data?.id);
        props.modalOpen(true);
    }

    return (
        <div
          className={classes.card}
          onClick={onCardClickHandler}
          key={props.data.mal_id}
        >
          <figure>
            <img src={props.data?.coverImage.extraLarge} alt="Anime_image"></img>
          </figure>
          <div className={classes.animeName}>{props.data?.title.romaji}</div>
        </div>
    );
}

export default AnimeCard;