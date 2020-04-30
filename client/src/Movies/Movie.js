import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieList from "./MovieList";

function Movie({ addToSavedList, setMovieList, movieList}) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()


  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteMovie = id => {    
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res)

      })
      .catch(err => console.log(err))

    history.push('/')
  }

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <Link to={`/update-movie/${params.id}`}>
        <button>Update</button>
      </Link>

      <button onClick={() => deleteMovie(params.id)}>Delete</button>

    </div>
  );
}

export default Movie;
