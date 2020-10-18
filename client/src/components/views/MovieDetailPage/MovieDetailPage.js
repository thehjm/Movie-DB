import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY } from "../../Config";
import MainImage from '../LandingPage/Sections/MainImage';
import { IMAGE_URL } from '../../Config';


function MovieDetailPage(props) {



    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const movieid = props.match.params.movieId

        fetch(`${API_URL}movie/${movieid}/?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
            })
    }, [])

    return (
        <div>
             {movie &&
                <MainImage image={`${IMAGE_URL}/w1280${movie.backdrop_path}`} title={movie.original_title} text={movie.overview} />

            }

            

        </div>
    );
}

export default MovieDetailPage;