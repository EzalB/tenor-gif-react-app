import axios from "axios";
import React, { useState, useEffect } from "react";
import { Tooltip } from 'reactstrap';
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

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
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    useEffect(() => {

        const fetchGifs = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/gif/search?query=${searchQuery}`);
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
            const response = await axios.get(`http://localhost:8080/gif/search?query=${searchQuery}&pos=${next}`);
            
            gifResults.push(...response.data.results);
            setNext(response.data.next);
            window.scrollBy(0, 1200);

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
                            <CardRes key={gif.id} gif={gif}
                                onClick={() => handleGifClick(gif)}
                                onMouseOver={()=>setHoverState({ raised: true, shadow:3})}
                                onMouseOut={()=>setHoverState({ raised:false, shadow:1 })}
                                raised={hoverState.raised} zDepth={hoverState.shadow}
                            />
                        </Col>
                    ))}
                </Row>

                {modalGif && <PopupModal gif={modalGif} onClose={handleCloseModal} />}
            </div>

            <a href="javascript:" id="return-to-top">H<FontAwesomeIcon className="arrowUp" icon={faArrowUp} /></a>
            
            {showMoreButton &&
                <div className="loadMore">
                    <button onClick={loadMoreGifs} className="scrolldown" id="loadMore">
                        <FontAwesomeIcon className="circleDown" icon={faCircleChevronDown} />
                    </button>
                    <Tooltip
                        placement="top"
                        isOpen={tooltipOpen}
                        autohide={false}
                        target="loadMore"
                        toggle={toggle}
                    >
                        Click to load more GIFs!
                    </Tooltip>
                </div>
            }

            
            
        </Container>
    )
};

export default Home;