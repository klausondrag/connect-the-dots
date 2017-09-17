import React, {Component} from 'react';
import {Label, Media, Panel} from "react-bootstrap";
import "./NewsBox.css";

class NewsBox extends Component {
    static relevance(source) {
        if (source === "Reuters")
            return "";
        else {
            let relevance = 50 + Math.random() * 50;
            return <span className="relevance label">{relevance.toFixed(0)}%</span>;
        }
    }

    static getClass(source) {
        if (source === "Reuters") {
            return "newsbox-reuters";
        } else {
            return "";
        }
    }

    render() {
        return (
            <div className="NewsBox">
                <Panel className={"news-box-panel " + NewsBox.getClass(this.props.article.display_name)}>
                    <Media md="6">
                        <Media.Left>
                            <div className="newsbox-cropper">
                                <img height={140} src={this.props.article.image_url} alt=""/>
                            </div>
                        </Media.Left>
                        <Media.Body>
                            <a href={this.props.article.article_url} style={{color: "#535353"}}>
                                <Media.Heading>{this.props.article.headline}</Media.Heading>
                                <p> {this.props.article.excerpt}</p>
                            </a>
                            <Label bsStyle="default">{this.props.article.display_name}</Label>
                            {NewsBox.relevance(this.props.article.display_name)}
                        </Media.Body>
                    </Media>
                </Panel>
            </div>
        );
    }
}

export default NewsBox;
