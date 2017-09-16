import React, {Component} from 'react';
import {Panel, Media, Label} from "react-bootstrap";

class NewsBox extends Component {
    render() {
        return (
            <Panel>
                <Media md={6}>
                    <Media.Left>
                        <img width={64} height={64} src={this.props.news.image_url} alt="Image"/>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>{this.props.news.headline}</Media.Heading>
                        <p><Label bsStyle="default">{this.props.news.source}</Label> {this.props.news.excerpt}</p>
                    </Media.Body>
                </Media>
            </Panel>
        );
    }
}

export default NewsBox;
