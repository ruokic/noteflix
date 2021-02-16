import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import mainImg from "../assets/theater.jpg";
import mainLogo from "../assets/mainlogo.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 50px);
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
`;

const ItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    align-items: center;
    margin: 20px;
    height: 150px;
    width: 150px;
    border: 2px solid #DC1C28;
    & > i {
        position: absolute;
        top: 30px;
        &.fa-film {
            top: 20px;
        }
    }
    & > p {
        font-size: 20px;
        position: absolute;
        bottom: 10px;
    }
    :hover {
        box-shadow: 0 0 3px 3px white;
    }
`;

const CenterImg = styled.img`
    height: 180px;
`;

const OverView = styled.p`
    font-size: 20px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
`;

export default () => (
    <Container bgImage={mainImg}>
        <Link to="/" ><CenterImg src={mainLogo}/></Link>
        <OverView>Try to find your favorite Movies and TV Shows</OverView>
        <ItemContainer>
            <Link to="/movie" ><Item><i class="fas fa-film fa-7x"></i><p>Movie</p></Item></Link>
            <Link to="/tv" ><Item><i class="fas fa-tv fa-6x"></i><p>TV</p></Item></Link>
            <Link to="/search" ><Item><i class="fas fa-search fa-6x"></i><p>Search</p></Item></Link>
        </ItemContainer>
    </Container>
);