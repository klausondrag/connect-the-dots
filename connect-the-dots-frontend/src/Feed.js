import React, {Component} from 'react';
import Item from "./Item";

class Feed extends Component {
    render() {
        return (
            <div className="Feed">
                <div className="container">
                    <Item/>
                </div>
            </div>
        );
    }
}

export default Feed;
