import React, {Component} from 'react';
import NewsBox from "./NewsBox";

class Feed extends Component {
    constructor(state) {
        super(state);
        this.props = {
            items: [
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
            <div className="Feed">
                <NewsBox/>
            </div>
        );
    }
}

export default Feed;
