import React, {Component} from 'react';
import Feed from "./Feed";
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
                    </Navbar.Header>
                </Navbar>
                <Feed/>
            </div>
        );
    }
}

export default App;
