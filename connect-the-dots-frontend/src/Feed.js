import React, {Component} from 'react';
import Item from "./Item";

class Feed extends Component {
    constructor(props, context) {
        super(props, context);
        let item = {
            source: "Fox News",
            image_url: "/assets/img/london.jpg",
            headline: "headline",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur massa quis aliquam blandit. Pellentesque quis lectus felis. Praesent consequat libero ac lobortis tincidunt. Sed ut tortor nec sapien dignissim varius ut ut est."
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
