import React, {Component} from 'react';
import NewsBox from "./NewsBox";
import {Panel,Col} from "react-bootstrap";

class Item extends Component {
    render() {
        return (
            <div className="Item">
                {this.props.news.map(mapNewsBox)}
            </div>
        );

        function mapNewsBox(news) {
            return (
                <Col md={6} className="news-box-col">
                    <NewsBox news={news}/>
                </Col>
            );
        }
    }
}

export default Item;
