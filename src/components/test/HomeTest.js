import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import CardTest from './CardTest';
import SearchTest from './SearchTest';
import ModalTest from './PopupModalTest';

const HomeTest = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [gifResults, setGifResults] = useState([]);
    const [next, setNext] = useState('');
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [modalGif, setModalGif] = useState(null);

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
            <SearchTest onSearch={handleSearch} />
            <div className="searchResults">
                <Row>
                    {gifResults.map((gif) => (
                        <Col xs={12} md={4} lg={3}>
                            <CardTest
                                key={gif.id}
                                gif={gif}
                                //onMouseOver={MouseOver}
                                //onMouseOut={MouseOut}
                                onClick={() => handleGifClick(gif)}
                            />
                        </Col>
                    ))}
                    
                    {showMoreButton &&
                        <button onClick={loadMoreGifs} show={loadMoreGifs} style={{ width: "3rem", height: "2rem" }}>
                            <FontAwesomeIcon className="fasPlus" icon={faPlus} style = {{alignItems: "center", justifyContent: "center"}} />
                        </button>
                    }
                </Row>

                {modalGif && <ModalTest gif={modalGif} onClose={handleCloseModal} />}
            </div>
        </Container>
    )
};

export default HomeTest;