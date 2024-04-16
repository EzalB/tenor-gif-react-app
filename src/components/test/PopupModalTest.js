import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'

const ModalTest = ({gif, onClose}) => {

    const shareImage = async (imageUrl) => {
      try {
        // Fetch the image data from the URL
        const response = await fetch(imageUrl);
        const blob = await response.blob(); // Convert response to Blob
    
        // Create a file object from the Blob
        const file = new File([blob], `${gif.content_description}.gif`, { type: blob.type });
    
        // Check if Web Share API is supported
        if (navigator.share) {
          await navigator.share({
            files: [file],
          });
          console.log('Image shared successfully');
        } else {
          console.log('Web Share API is not supported');
        }
      } catch (error) {
        console.error('Error sharing image:', error);
      }
    };

    const handleShare = async () => {
        
        await shareImage(gif.media_formats.gif.url);
      };

    return (
        <div>
            <Modal show={true} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{gif.content_description}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                     <img src={gif.media_formats.gif.url} alt={gif.title} style={{ maxWidth: '300px', maxHeight: '300px'}} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleShare}>
                        Share
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default ModalTest;