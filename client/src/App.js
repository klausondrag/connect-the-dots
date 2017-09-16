import React, {Component} from 'react';
import Feed from "./Feed";
import Footer from "./Footer";
import './App.css';
import {Navbar} from "react-bootstrap";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/#">Connect the Dots</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
                <Feed/>
                <Footer/>
            </div>
        );
    }
}

export default App;
