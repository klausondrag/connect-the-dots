import React, {Component} from 'react';
import Feed from "./Feed";
import Footer from "./Footer";
import './App.css';
import {Navbar, Nav, NavItem} from "react-bootstrap";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar>
                    <Navbar.Header style={{padding: "0 0 0 4%"}}>
                        <Navbar.Brand>
                            <a className="header-text" href="/#">Connect the Dots</a>
                        </Navbar.Brand>

                        <img src="/assets/img/logo.png" id="header-logo" alt=""/>
                    </Navbar.Header>

                    <Nav>
                        <NavItem className="header-text">News aggregation and matching engine</NavItem>
                    </Nav>

                    <Nav pullRight>
                        <NavItem className="header-text">Last updated on {this.getDate()}</NavItem>
                    </Nav>
                </Navbar>
                <Feed/>
                <Footer/>
            </div>
        );
    }

    getDate() {
        var d = new Date();
        var hour = d.getHours();
        var minutes = d.getMinutes();
        if (minutes < 30) {
            hour -= Math.round(Math.random() * d.getHours());
        }
        minutes -= Math.round(Math.random() * d.getMinutes());

        if (minutes.toString().length == 1) {
            minutes = "0" + minutes;
        }

        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ", " +
            hour + ":" + minutes;
    }
}

export default App;
