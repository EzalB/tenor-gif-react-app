import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'

import CardRes from './Card';
import Search from './Search';
import PopupModal from './PopupModal';

const Home = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [gifResults, setGifResults] = useState([]);
    const [next, setNext] = useState('');
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [modalGif, setModalGif] = useState(null);

    const [hoverState, setHoverState] = useState({raised:false, shadow:1});

    useEffect(() => {

        const fetchGifs = async () => {
            try {
                const response = await axios.get(`https://tenor-gif-spring-boot-app.onrender.com/gif/search?query=${searchQuery}`);
                setGifResults(response.data.results);
                setNext(response.data.next);
                setShowMoreButton(true);
            } catch (error) {
                console.error('Error fetching GIFs:', error);
            }
        };

        if (searchQuery !== '') {
            fetchGifs();
        }

    }, [searchQuery]);

    const loadMoreGifs = async () => {
        try {
            const response = await axios.get(`https://tenor-gif-spring-boot-app.onrender.com/gif/search?query=${searchQuery}&pos=${next}`);
            
            gifResults.push(...response.data.results);
            setNext(response.data.next);

        } catch (error) {
            console.error('Error fetching GIFs:', error);
        }
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleGifClick = (gif) => {
        setModalGif(gif);
    };
    
    const handleCloseModal = () => {
        setModalGif(null);
    };

    return (
        <Container>
            <Search onSearch={handleSearch} />
            <div className="searchResults">
                <Row className="">
                    {gifResults.map((gif) => (
                        <Col xs={12} md={4} lg={3}>
                            <CardRes key={gif.id} gif={gif} onClick={() => handleGifClick(gif)}
                                onMouseOver={()=>setHoverState({ raised: true, shadow:3})}
                                onMouseOut={()=>setHoverState({ raised:false, shadow:1 })}
                                raised={hoverState.raised} zDepth={hoverState.shadow}
                            />
                        </Col>
                    ))}
                </Row>

                {modalGif && <PopupModal gif={modalGif} onClose={handleCloseModal} />}
            </div>
            
            {showMoreButton &&
                <div className="loadMore">
                    <button onClick={loadMoreGifs} show={loadMoreGifs} className="scrolldown">
                        <FontAwesomeIcon className="circleDown" icon={faCircleChevronDown} />
                    </button>
                </div>
            }
            
        </Container>
    )
};

export default Home;