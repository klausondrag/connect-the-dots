import React, {Component} from 'react';
import {Label, Media, Panel} from "react-bootstrap";
import "./NewsBox.css";

class NewsBox extends Component {
    render() {
        return (
            <a className="NewsBox" href={this.props.article.article_url}>
                <Panel className="news-box-panel">
                    <Media md={6}>
                        <Media.Left>
                            <Label bsStyle="default">{this.props.article.name}</Label>
                            <hr/>
                            <img width={64} height={64} src={this.props.article.image_url} alt="Image"/>
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{this.props.article.headline}</Media.Heading>
                            <p> {this.props.article.excerpt}</p>
                        </Media.Body>
                    </Media>
                </Panel>
            </a>
        );
    }
}

export default NewsBox;
