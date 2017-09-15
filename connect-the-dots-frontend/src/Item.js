import React, {Component} from 'react';
import NewsBox from "./NewsBox";
import {Panel} from "react-bootstrap";

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
            return <NewsBox logo={news.logo} headline={news.headline} excerpt={news.excerpt}/>;
        }
    }
}

export default Item;
