import React, {Component} from 'react';
import Item from "./Item";

class Feed extends Component {
    constructor(props, context) {
        super(props, context);
        let news = [
            {
                logo: "/assets/img/logo-sueddeutsche-zeitung.png",
                headline: "headline",
                excerpt: "text",
            },
            {
                logo: "/assets/img/logo-sueddeutsche-zeitung.png",
                headline: "headline",
                excerpt: "text",
            },
            {
                logo: "/assets/img/logo-sueddeutsche-zeitung.png",
                headline: "headline",
                excerpt: "text",
            },
            {
                logo: "/assets/img/logo-sueddeutsche-zeitung.png",
                headline: "headline",
                excerpt: "text",
            },
            {
                logo: "/assets/img/logo-sueddeutsche-zeitung.png",
                headline: "headline",
                excerpt: "text",
            },
            {
                logo: "/assets/img/logo-sueddeutsche-zeitung.png",
                headline: "headline",
                excerpt: "text",
            },
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
