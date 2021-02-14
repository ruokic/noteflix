import React from "react";
import PropTypes, { symbol } from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
`;

const Cover = styled.div`
    width: 30%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 20px;
`;

const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 10px;
`;

const ItemContainer = styled.div`
    margin: 20px 0px;
    display: flex;
    align-items: center;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 70%;
`;

const ImdbLink = styled.a``;

const Imdb = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 16px;
    border: 1px solid white;
    background-color: #E1B618;
    border-radius: 3px;
    color: black;
    font-weight: 600;
`;

const VideosContainer = styled.div`
    display: flex;
    overflow: auto;
    height: 250px;
`;

const Video = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    & > p {
        margin: 10px;
        font-size: 10px;
        font-weight: 600;
    }
`;

const DetailTitle = styled.p`
    font-size: 20px;
    font-weight: 500;
    margin: 5px;
`;

const ProCompaniesContainer = styled.div`
    display: flex;
    overflow: auto;
    padding: 5px;
`;

const ProCompanies = styled.div`
    margin-right: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ProCompaniesCover = styled.div`
    width: 100px;
    height: 100px;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
    border: 1px solid white;
    box-shadow: 3px 3px 1em white;
    background-color: white;
    margin-bottom: 2px;
`;

const DetailPresenter = ({ result, loading, error }) => 
    loading ? (
        <>
        <Helmet>
            <title>Loading | NoteFlix</title>
        </Helmet>
        <Loader />
        </>
    ) : (
        <Container>
            <Helmet>
                <title>
                    {`${result?.original_title ? 
                    result.original_title : 
                    result?.original_name} | NoteFlix`}
                </title>
            </Helmet>
            <Backdrop 
                bgImage={result?.backdrop_path ? 
                    `https://image.tmdb.org/t/p/original${result?.backdrop_path}` :
                    require("../../assets/noPosterSmall.png").default} 
            />
            <Content>
                <Cover 
                    bgImage={result?.poster_path ? 
                        `https://image.tmdb.org/t/p/original${result.poster_path}` : 
                        require("../../assets/noPosterSmall.png").default} 
                />
                <Data>
                    <Title>
                        {result?.original_title ? 
                        result.original_title : 
                        result?.original_name}
                    </Title>
                    <ItemContainer>
                        <Item>
                            {result?.release_date ? 
                            result.release_date.substring(0, 4) : 
                            result?.first_air_date.substring(0, 4)}
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {result?.runtime ? 
                            result.runtime : 
                            result?.episode_run_time[0]} min
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {result?.genres &&
                            result.genres.map((genre, index) => 
                            index === result.genres.length - 1 ?
                            genre.name : `${genre.name} / `)}
                        </Item>
                        {result?.imdb_id ?
                            <Divider>•</Divider> :
                            null
                        }
                        <Item>
                            {result?.imdb_id ? 
                            <ImdbLink 
                                href={`https://www.imdb.com/title/${result.imdb_id}`}
                                target="__blank"
                            >
                                <Imdb><span>IMDb</span></Imdb>
                            </ImdbLink> : null
                            }
                        </Item>
                        {result?.production_countries.length > 0 && 
                        <Divider>•</Divider>
                        }
                        <Item>
                            {result?.production_countries ?
                            result.production_countries.map((country, index) => {
                                if (index < result.production_countries.length - 1)
                                    return (`${country.name}, `);
                                else return country.name;
                            })
                            : "SOMEWHERE"
                            }
                        </Item>
                    </ItemContainer>
                    <Overview>
                        {result?.overview}
                    </Overview>
                    <VideosContainer>
                        {result?.videos &&
                        result?.videos.results.map((video) => (
                        <Video>
                            <p>{video.name.length > 45 ? `${video.name.substring(0, 45)}...` : video.name}</p>
                            <iframe 
                                key={video.name}
                                width="270" 
                                height="190" 
                                src={`https://www.youtube.com/embed/${video.key}`} 
                                frameBorder="0"
                                allow="accelerometer; 
                                    autoplay; 
                                    clipboard-write; 
                                    encrypted-media; 
                                    gyroscope; 
                                    picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                         </Video>
                         ))}
                    </VideosContainer>
                    <DetailTitle>Production Companies</DetailTitle>
                    <ProCompaniesContainer>
                        {result?.production_companies && 
                            result.production_companies.map((pc) => (
                                <ProCompanies>
                                    <ProCompaniesCover 
                                        key={pc.name}
                                        bgImage={pc.logo_path ? 
                                            `https://image.tmdb.org/t/p/original${pc.logo_path}` : 
                                            require("../../assets/noPosterSmall.png").default} 
                                    />
                                <p>{pc.name.length > 15 ? `${pc.name.substring(0, 12)}...` : pc.name}</p>
                                </ProCompanies>
                            ))
                        }
                    </ProCompaniesContainer>
                </Data>
            </Content>
        </Container>
    );

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default DetailPresenter;