import React, {useState, useEffect, useContext} from "react";
import ReactDOM from "react-dom";
import classes from "./AnimeDescModal.module.css";
import {IdContext} from "./../context/IdContext";
import Backdrop from "./Backdrop";

function AnimeDesc() {
    
    const [animeData, setAnimeData] = useState([]);
    const [animeId, setAnimeId] = useContext(IdContext);

    function formatDate(date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
        if (month.length < 2) 
          month = '0' + month;
        if (day.length < 2) 
          day = '0' + day;
  
        return [day, month, year].join('-');
    }

    const fetchAnimeData = async (queryId) => {
        const temp = await fetch(`https://api.jikan.moe/v3/anime/${queryId}`).then(res => res.json());
        setAnimeData(temp);
      }

    const startDate = formatDate(animeData?.aired?.from);
    const endDate = formatDate(animeData?.aired?.to);


    useEffect(() =>{
        if(animeId)
        fetchAnimeData(animeId);
    }, [animeId]);

    

    return (
      <div className={classes.animeDesc}>
        <figure>
          <img src={animeData.image_url} alt="Anime_image"></img>
        </figure>
        <div className={classes.animeContent}>
          <div className={classes.genInfo}>
          <h3>{animeData.title}</h3>
          <div className={classes.engName}>
            <strong>{animeData.title_english}</strong>
          </div>
          <div className={classes.flexData}>
            <p>
              <strong>Start date: </strong>
              {startDate}
            </p>
            <p>
              <strong>End date: </strong>
              {endDate}
            </p>
          </div>
          <div className={classes.flexData}>
            <p className={classes.gen}>
              <strong>Genres: </strong>
              {animeData.genres?.map((genre) => {
                return <span key={genre.mal_id}>{genre.name} </span>;
              })}
            </p>
            {animeData.demographics?.length !== 0 && (
              <p className={classes.gen}>
                <strong>Demographics: </strong>
                {animeData.demographics?.map((data) => {
                  return <span key={data.mal_id}>{data.name} </span>;
                })}
              </p>
            )}
          </div>
          <div className={classes.flexData}>
            <p>
              <strong>Episodes: </strong>
              {animeData.episodes}
            </p>
            <p>
              <strong>Status: </strong>
              {animeData.status}
            </p>
          </div>
          <div className={classes.flexData}>
            <p>
              <strong>Type: </strong>
              {animeData.type}
            </p>
            <p>
              <strong>Rating: </strong>
              {animeData.rating}
            </p>
          </div>
          <p className={classes.gen}>
            <strong>Popularity: </strong>
            {animeData.popularity}
          </p>
          {animeData.trailer_url != null && (
            <p className={classes.trailerButton}>
              <a className={classes.trailerBtn} href={animeData.trailer_url}>
                Watch Trailer
              </a>
            </p>
          )}
          </div>
          <p className={classes.synopsis}>
            <strong>Synopsis:</strong>
            <br></br>
            {animeData.synopsis}
          </p>
        </div>
      </div>
    );
}

function AnimeDescModal(props) {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<AnimeDesc />, document.getElementById('overlay-root'))}
        </React.Fragment>
    );
}

export default AnimeDescModal;