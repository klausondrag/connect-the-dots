import React, {Component} from 'react';
import {Thumbnail, Col} from "react-bootstrap";

class Feed extends Component {
    render() {
        return (
            <div className="Feed">
                <Col md={2}>
                    <Thumbnail src="/assets/img/logo-sueddeutsche-zeitung.png">
                        <h3>HeadLine</h3>
                        <p>text</p>
                    </Thumbnail>
                </Col>
            </div>
        );
    }
}

export default Feed;
