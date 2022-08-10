import React from "react";
import classes from './Header.module.css';

function Header(props) {
    return (
      <div className={classes.header}>
        <h1>
          <strong>Sagasu</strong>Anime
        </h1>
        <form className={classes.searchAnime} onSubmit={props.searchHandler}>
          <input
            type="search"
            placeholder="Search an anime..."
            required
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
          ></input>
        </form>
      </div>
    );
}

export default Header;