import React, { useEffect, useState, initialState } from 'react'
import { FaCode } from "react-icons/fa";

import { Typography, Row } from 'antd'
import { API_URL, API_KEY } from "../../Config";

import MainImage from '././Sections/MainImage';
import GridCard from '././Sections/GridCard'
import { IMAGE_URL } from '../../Config';

const { Title } = Typography;



function LandingPage() {

    const [movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endPoint = `${API_URL}movie/popular/?api_key=${API_KEY}&page=1`
        fetchMovies(endPoint)
    }, [])

    const fetchMovies = (path) => {

        fetch(path)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovies([...movies, ...response.results])
                setCurrentPage(response.page)
            })
    }

    const handleClick = () => {
        const endPoint = `${API_URL}movie/popular/?api_key=${API_KEY}&page=${currentPage + 1}`
        fetchMovies(endPoint)
    }

    return (
        <div style={{ width: '100%', margin: 0 }}>

            {movies[0] &&
                <MainImage image={`${IMAGE_URL}/w1280${movies[0].backdrop_path}`} title={movies[0].original_title} text={movies[0].overview} />

            }





            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <Title level={2}>Movies by latest</Title>
                <hr />

                {/*Grid Cards*/}

                <Row gutter={[16, 16]}>
                    {movies && movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path && `${IMAGE_URL}/w500${movie.poster_path}`}
                                movieId={movie.id}
                            />
                        </React.Fragment>))
                    }
                </Row>

                {/*Load More btn*/}
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={handleClick}>Load More</button>
                </div>

            </div>

        </div>
    )
}

export default LandingPage
