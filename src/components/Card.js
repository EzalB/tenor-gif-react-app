import React from "react";
import { Card, CardImg } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'

const CardRes = ({gif, onClick}) => {

    if (!gif || !gif.media_formats || !gif.media_formats.gif || !gif.media_formats.gif.url) {
        return null;
    }

    return (
        <div>
            <Card className="gif__card" onClick={onClick}> 
                <CardImg
                    src={gif.media_formats.gifpreview.url}
                    alt={gif.title}
                    
                    style= {{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </Card>
        </div>
    )
};

export default CardRes;