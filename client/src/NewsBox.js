import React, {Component} from 'react';
import {Panel, Media, Label} from "react-bootstrap";
import "./NewsBox.css";

class NewsBox extends Component {
    render() {
        return (
            <a className="NewsBox" href={this.props.news.article_url}>
                <Panel className="news-box-panel">
                    <Media md={6}>
                        <Media.Left>
                            <Label bsStyle="default">{this.props.news.name}</Label>
                            <hr/>
                            <img width={64} height={64} src={this.props.news.image_url} alt="Image"/>
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{this.props.news.headline}</Media.Heading>
                            <p> {this.props.news.excerpt}</p>
                        </Media.Body>
                    </Media>
                </Panel>
            </a>
        );
    }
}

export default NewsBox;
