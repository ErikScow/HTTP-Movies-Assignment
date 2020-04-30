import React, { useState } from 'react'
import Axios from 'axios'

const UpdateMovie = props => {

    const [updatedMovie, setUpdatedMovie] = useState({
        id: null,
        title: '',
        director: '',
        metascore: null,
        stars: []
    })

    const handleChange = e => {
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: e.target.value
        })
    }

    const handleArrayChange = e => {
        setUpdatedMovie({
            ...updatedMovie,
            stars: e.target.value.split(',')
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        Axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, updatedMovie)
            .then(res => props.setMovieList([...props.movieList, res.data]))
            .catch(err => console.error(err))

        props.history.push('/')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='title'
                value={updatedMovie.title}
                placeholder='new title'
                onChange={handleChange}
            />
            <input
                type='text'
                name='director'
                value={updatedMovie.director}
                placeholder='new director'
                onChange={handleChange}
            />
            <input
                type='text'
                name='metascore'
                value={updatedMovie.metascore}
                placeholder='new metascore'
                onChange={handleChange}
            />
            <br/>
            <label htmlFor='actors'>New Actors (seperate with " , ") </label>
            <input
                type='text'
                name='actors'
                value={updatedMovie.actors}
                placeholder='new actors'
                onChange={handleArrayChange}
            />

            <button type='submit'>Update</button>

        </form>
    )
}

export default UpdateMovie