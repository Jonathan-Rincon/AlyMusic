import React from 'react';
import "./header.css";

const Header = ({appName}) => {

    return (
        <header className="header">
                <h1>{appName}</h1>
        </header>
    )
}
export default Header;