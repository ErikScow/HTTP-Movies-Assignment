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

    const handleSubmit = e => {
        e.preventDefault()
        Axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, updatedMovie)
    }

    return (
        <form>
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
            <label htmlFor='actors'>New Actors</label>
            <input
                type='text'
                name='actors'
                value={updatedMovie.actors}
                placeholder='new actor'
                onChange={handleChange}
            />

            <button type='submit'>Update</button>

        </form>
    )
}

export default UpdateMovie