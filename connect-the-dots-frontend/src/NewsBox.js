import React, {Component} from 'react';
import {Thumbnail} from "react-bootstrap";

class NewsBox extends Component {
    render() {
        return (
            <div className="NewsBox">
                    <Thumbnail src={this.props.logo}>
                        <h3>{this.props.headline}</h3>
                        <p>{this.props.excerpt}</p>
                    </Thumbnail>
            </div>
        );
    }
}

export default NewsBox;
