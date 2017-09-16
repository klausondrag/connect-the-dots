import React, {Component} from 'react';
import {Thumbnail} from "react-bootstrap";

class NewsBox extends Component {
    render() {
        return (
            <div className="NewsBox">
                    <Thumbnail src={this.props.news.image}>
                        <h3>{this.props.news.headline}</h3>
                        <code>{this.props.news.source}</code>
                        <p>{this.props.news.excerpt}</p>
                    </Thumbnail>
            </div>
        );
    }
}

export default NewsBox;
