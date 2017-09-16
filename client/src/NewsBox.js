import React, {Component} from 'react';
import {Label, Media, Panel} from "react-bootstrap";
import "./NewsBox.css";

class NewsBox extends Component {
    render() {
        return (
            <a className="NewsBox" href={this.props.article.article_url}>
                <Panel className={"news-box-panel " + this.getClass(this.props.article.display_name)}>
                    <Media md="6">
                        <Media.Left>
                            <div className="newsbox-cropper">
                                <img height={140} src={this.props.article.image_url} alt=""/>
                            </div>
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{this.props.article.headline}</Media.Heading>
                            <p> {this.props.article.excerpt}</p>
                            <Label bsStyle="default">{this.props.article.display_name}</Label>
                        </Media.Body>
                    </Media>
                </Panel>
            </a>
        );
    }

    getClass(source) {
        if (source === "Reuters") {
            return "newsbox-reuters";
        } else {
            return "";
        }
    }
}

export default NewsBox;
