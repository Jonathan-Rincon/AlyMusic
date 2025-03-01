import React, {Component} from 'react';
import "./header.css";

class Header extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <header className="header">
                <h1>{this.props.appName}</h1>
            </header>

        )
    }

}
export default Header;