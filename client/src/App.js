import React, {Component} from 'react';
import Feed from "./Feed";
import Footer from "./Footer";
import './App.css';
import {Navbar} from "react-bootstrap";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/#">Connect the Dots</a>
                        </Navbar.Brand>

                        <img src="/assets/img/logo.png" id="header-logo" />
                    </Navbar.Header>
                </Navbar>
                <Feed/>
                <Footer/>
            </div>
        );
    }
}

export default App;
