import React, {Component} from 'react';
import {Thumbnail, Col} from "react-bootstrap";

class NewsBox extends Component {
    render() {
        return (
            <div className="NewsBox">
                <Col md={2}>
                    <Thumbnail src={this.props.logo}>
                        <h3>{this.props.headline}</h3>
                        <p>{this.props.excerpt}</p>
                    </Thumbnail>
                </Col>
            </div>
        );
    }
}

export default NewsBox;
