import { useState, useEffect } from "react";
import './App.css';
import ReactDOM from "react-dom";
import AnimeDescModal from "./components/AnimeDescModal";
import RiseLoader from "react-spinners/RiseLoader";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import TopAnime from "./components/TopAnime";
import {IdContext} from "./context/IdContext";
import Backdrop from "./components/Backdrop";

const override = {
  display: "block",
  position: "fixed",
  margin: "0 auto",
  borderColor: "blue",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "200",
};

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [animeId, setAnimeId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  var query = `
    query ($id: Int, $page: Int, $perPage: Int, $search: String, $sort: [MediaSort]) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(id: $id, search: $search, sort: $sort) {
          id
          title {
            romaji
          }
          coverImage {
            extraLarge
          }
        }
      }
    }
  `;

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data?.data?.Page?.media);
    setAnimeList(data?.data?.Page?.media);
}

function handleError(error) {
    console.error(error);
}

  const getTopAnime = async () => {
    setLoading(true);
    // const temp = await fetch(`https://api.jikan.moe/v4/top/anime`)
    //   .then((res) => res.json())
    //   .catch((error) => {
    //     setError(true);
    //   });
    var variables = {
      page: 1,
      perPage: 16,
      sort: "POPULARITY_DESC",
    };
    const temp = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    }).then(handleResponse)
    .then((data) => {
      setTopAnime(data?.data?.Page?.media.slice(0,5));
      setAnimeList(data?.data?.Page?.media);
    })
    .catch(handleError);
    // setTopAnime(temp?.top?.slice(0, 5));
    // setAnimeList(temp?.top?.slice(0, 16));
    setLoading(false);
  }

  const searchHandler = e => {
    e.preventDefault();
    searchResults(search);
    setSearch("");
  }

  const searchResults = async (s) => {
    setLoading(true);
    // const temp = await fetch(
    //   `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=16`
    // ).then((res) => res.json()).catch(error => {
    //   setError(true);
    //   console.log("Search error");
    // });
    // setAnimeList(temp.results);
  
  var variables = {
      search: s,
      page: 1,
      perPage: 16
  };
  
  var url = 'https://graphql.anilist.co',
      options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({
              query: query,
              variables: variables
          })
      };
  
  fetch(url, options).then(handleResponse)
                     .then(handleData)
                     .catch(handleError);

    setLoading(false);

  }

  const modalCloseHandler = () => {
    setModalOpen(false);
  }

  useEffect(() => {
    getTopAnime();
  }, []);

  return (
    <IdContext.Provider value={[animeId, setAnimeId]}>
      <div className="app">
        <Header
          searchHandler={searchHandler}
          search={search}
          setSearch={setSearch}
        />
        {error && <div>Error aa gaya.</div>}
        {loading &&
          !error &&
          ReactDOM.createPortal(
            <Backdrop onConfirm={modalCloseHandler} />,
            document.getElementById("backdrop-root")
          )}
        <TopAnime topAnimeList={topAnime} modalOpen={setModalOpen} />
        <RiseLoader
          color="#f5cb5c"
          loading={loading}
          cssOverride={override}
          size={50}
        ></RiseLoader>
        <MainContent animeList={animeList} modalOpen={setModalOpen} />
        {modalOpen && !loading && (
          <AnimeDescModal
            setLoading={setLoading}
            onConfirm={modalCloseHandler}
          />
        )}
      </div>
    </IdContext.Provider>
  );
}

export default App;
