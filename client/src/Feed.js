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
        var name_mappings = [
            {name: "daily-mail", display_name: "Daily Mail"},
            {name: "the-guardian-uk", display_name: "The Guardian"},
            {name: "independent", display_name: "The Independent"},
            {name: "reuters", display_name: "Reuters"}
        ];

        if (this.state.feed.length > 0) {
            return;
        }

        this.getFeed().then(feed => {
                feed.forEach(f => {
                    var reuters_idx = -1;

                    for (var i = 0; i < f.length; i++) {

                        // Set display_name attribute
                        for (var j = 0; j < name_mappings.length; j++) {
                            if (name_mappings[j].name === f[i].name) {
                                f[i].display_name = name_mappings[j].display_name;
                            }
                        }
                        if (!f[i].display_name) {
                            f[i].display_name = f[i].name;
                        }

                        // Limit excerpt length
                        console.log(f[i]);
                        if (f[i].headline.length <= 42 && f[i].excerpt.length > 220) {
                            f[i].excerpt = f[i].excerpt.substring(0, 219) + "...";
                        } else if (f[i].headline.length > 42 && f[i].excerpt.length > 142) {
                            f[i].excerpt = f[i].excerpt.substring(0, 141) + "...";
                        }

                        // Limit headline length
                        if (f[i].headline.length > 75) {
                            f[i].headline = f[i].headline.substring(0, 74) + "...";
                        }

                        if (f[i].name === "reuters") {
                            reuters_idx = i;
                        }
                    }

                    if (reuters_idx !== -1) {
                        var item = f[reuters_idx];
                        f.splice(reuters_idx, 1);
                        f.unshift(item);
                    }
                });

                this.setState({
                    feed: feed
                });
            }
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
