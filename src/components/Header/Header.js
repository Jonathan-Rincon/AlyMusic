import React from 'react';
import { AlyHeader, AlyTitle } from './styles';


const Header = ({appName}) => {

    return (
        <AlyHeader>
                <AlyTitle>{appName}</AlyTitle>
        </AlyHeader>
    )
}
export default Header;