import React, {Component} from 'react';
import {Label, Media, Panel} from "react-bootstrap";
import "./NewsBox.css";

class NewsBox extends Component {
    relevance(source) {
        if (source === "Reuters")
            return "";
        else {
            let relevance = (this.props.article.similarity * 100).toFixed(0);
            return <span className={"relevance " + NewsBox.getColorClass(relevance)}>{relevance} % relevance</span>;
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
                            <div className="news-box-spacing">
                                <a href={this.props.article.article_url} style={{color: "#535353"}}>
                                    <Media.Heading className="serif-font">{this.props.article.headline}</Media.Heading>
                                    <p className="serif-font"> {this.props.article.excerpt}</p>
                                </a>
                            </div>
                            <Label bsStyle="default">{this.props.article.display_name}</Label>
                            {this.relevance(this.props.article.display_name)}
                        </Media.Body>
                    </Media>
                </Panel>
            </div>
        );
    }

    static getClass(source) {
        if (source === "Reuters") {
            return "newsbox-reuters";
        } else {
            return "";
        }
    }

    static getColorClass(relevance) {
        if (relevance > 70) {
            return "relevance-high";
        } else if (relevance > 50) {
            return "relevance-med";
        } else {
            return "relevance-low";
        }
    }
}

export default NewsBox;
