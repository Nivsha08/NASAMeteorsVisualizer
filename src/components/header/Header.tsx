import React from "react";
import "./Header.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMeteor} from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header = (props: HeaderProps) => (
    <div className="header-wrapper">
        <FontAwesomeIcon icon={faMeteor} className="icon" />
        <span className="title" title={props.title}>{ props.title }</span>
        <span className="subtitle">{ props.subtitle }</span>
    </div>
);

export default Header;
