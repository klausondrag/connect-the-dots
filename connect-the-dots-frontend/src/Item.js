import React, {Component} from 'react';
import NewsBox from "./NewsBox";
import {Panel,Col} from "react-bootstrap";

class Item extends Component {
    render() {
        return (
            <div className="Item">
                <Panel>
                    {this.props.news.map(mapNewsBox)}
                </Panel>
            </div>
        );

        function mapNewsBox(news) {
            return (
            <Col md={6}>
                <NewsBox news={news}/>
            </Col>
            );
        }
    }
}

export default Item;
