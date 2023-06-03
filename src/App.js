import React from "react";
import { useState,useEffect } from "react"; // Used to use the hooks 
import MovieCard from './MovieCard'

import './App.css'
import SearchIcon from './search.svg'

//16d7ef9a

const API_URL = 'http://www.omdbapi.com?apikey=16d7ef9a';

// const movie1 = 
//     {
//         "Title": "Spiderman",
//         "Year": "2010",
//         "imdbID": "tt1785572",
//         "Type": "movie",
//         "Poster": "N/A"
//       }


const App = () => {

    const [movies, setMovies] = useState([]);  // UseState Hooks
    const [searchTerm, setSearchTerm] = useState([]);
    const searchEnterKey = (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchTerm)
        }
    }
  

    const searchMovies = async(title) => {     // To fetch data in the form of array from API from entered title
        const response = await fetch (`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);  // Set the State to number of movies
    }

    useEffect(()=>{
        searchMovies('Spiderman');
    },[]);

    return(
        <div className="app">
        <h1>UR Watching</h1>
            <div className="search">
                <input
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={searchEnterKey}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => {searchMovies(searchTerm)}}
                />
             </div>

            {movies?.length > 0   // If movies found then render the MovieCard comp and don't if not found any movie
                ? (
                    <div className="container">
                        {movies.map((movie) =>(
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

             
        </div>
    );
}

export default App;