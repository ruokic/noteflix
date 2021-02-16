import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import mainImg from "../assets/noteflix.png";

const Header = styled.header`
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: rgba(20, 20, 20, 0.8);
    z-index: 10;
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
    display: flex;
`;

const Item = styled.li`
    width: 80px;
    height: 50px;
    text-align: center;
    border-bottom: 3px solid ${props => props.current ? "#DC1C28" : "transparent"};
    transition: border-bottom 0.5s ease-in-out;
    &.Home {
        width: 150px;
        font-size: 25px;
        font-weight: 600;
        color: red;
    }
`;

const SLink = styled(Link)`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > img {
        margin-top: 3px;
        height: 35px;
    }
`;

export default withRouter(({ location: { pathname }}) => (
    <Header>
        <List>
            <Item className="Home" >
                <SLink to="/"><img src={mainImg} /></SLink>
            </Item>
            <Item current={pathname === "/movie"}>
                <SLink to="/movie">Movies</SLink>
            </Item>
            <Item current={pathname === "/tv"}>
                <SLink to="/tv">TV</SLink>
            </Item>
            <Item current={pathname === "/search"}>
                <SLink to="/search">Search</SLink>
            </Item>
        </List>
    </Header>
));