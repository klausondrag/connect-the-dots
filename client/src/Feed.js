import React, {Component} from 'react';
import Item from "./Item";

class Feed extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            feed: this.getFeed()
        }
    }

    render() {
        return (
            <div className="Feed">
                <div className="container">
                    <ul className="items-list">
                        {this.state.feed.map(news =>
                            <li><Item news={news}/></li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }

    getFeed() {
        return fetch(`/api`, {
            accept: 'application/json',
        }).then(checkStatus)
            .then(parseJSON);
    }

}

export default Feed;
