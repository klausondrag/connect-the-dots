import React, {Component} from 'react';
import Item from "./Item";

class Feed extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            feed: []
        };
    }

    updateFeed() {
        this.getFeed().then(feed =>
            this.setState({
                feed: feed
            })
        )
    }

    render() {
        this.updateFeed();
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

    /* eslint-disable no-undef */
    getFeed() {
        return fetch(`/api`, {
            accept: 'application/json',
        }).then(checkStatus)
            .then(parseJSON);

        function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
            const error = new Error(`HTTP Error ${response.statusText}`);
            error.status = response.statusText;
            error.response = response;
            console.log(error); // eslint-disable-line no-console
            throw error;
        }

        function parseJSON(response) {
            return response.json();
        }
    }

}

export default Feed;
