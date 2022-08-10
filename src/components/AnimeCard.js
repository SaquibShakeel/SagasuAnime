import classes from "./AnimeCard.module.css";
import {IdContext} from "../context/IdContext";
import { useContext } from "react";

function AnimeCard(props) {
    
    const [animeId, setAnimeId] = useContext(IdContext);

    const onCardClickHandler = () => {
        setAnimeId(props.data.mal_id);
        props.modalOpen(true);
    }

    return (
        <div
          className={classes.card}
          onClick={onCardClickHandler}
          key={props.data.mal_id}
        >
          <figure>
            <img src={props.data.image_url} alt="Anime_image"></img>
          </figure>
          <div className={classes.animeName}>{props.data.title}</div>
        </div>
    );
}

export default AnimeCard;