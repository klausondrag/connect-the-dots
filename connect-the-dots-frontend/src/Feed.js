import React, {Component} from 'react';
import Item from "./Item";

class Feed extends Component {
    constructor(props, context) {
        super(props, context);
        let item = {
            source: "Fox News",
            image: "/assets/img/logo-sueddeutsche-zeitung.png",
            headline: "headline",
            excerpt: "text text text text text text text text text text text text text text text text text text text text text text text text text text ",
        };
        let news = [
            item, item, item, item,
        ];
        this.state = {
            feed: [
                news, news, news
            ]
        }
    }

    render() {
        return (
            <div className="Feed">
                <div className="container">
                    {this.state.feed.map(news =>
                        <Item news={news}/>
                    )}
                </div>
            </div>
        );
    }
}

export default Feed;
