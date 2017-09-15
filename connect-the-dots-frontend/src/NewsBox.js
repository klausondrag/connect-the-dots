import React, {Component} from 'react';
import {Thumbnail} from "react-bootstrap";

class Feed extends Component {
    render() {
        return (
            <div className="Feed">
                <Thumbnail src="/assets/img/logo-sueddeutsche-zeitung.png"  alt="Sueddeutsche Zeitung">
                    <h3>HeadLine</h3>
                    <p>text</p>
                </Thumbnail>
            </div>
        );
    }
}

export default Feed;
