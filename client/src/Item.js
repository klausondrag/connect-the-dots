import React, {Component} from 'react';
import NewsBox from "./NewsBox";
import {Col} from "react-bootstrap";

class Item extends Component {
    render() {
        return (
            <div className="Item">
                {this.props.news.map(mapNewsBox)}
            </div>
        );

        function mapNewsBox(article) {
            return (
                <Col md={6} className="news-box-col">
                    <NewsBox article={article}/>
                </Col>
            );
        }
    }
}

export default Item;
