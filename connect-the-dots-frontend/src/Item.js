import React, {Component} from 'react';
import NewsBox from "./NewsBox";

class Item extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            news: [
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
            ]
        }
    }

    render() {
        return (
            <div className="Item">
                {this.state.news.map(mapNewsBox)}
            </div>
        );

        function mapNewsBox(news) {
            return <NewsBox logo={news.logo} headline={news.headline} excerpt={news.excerpt}/>;
        }
    }
}

export default Item;
