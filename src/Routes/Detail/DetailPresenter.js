import React from "react";
import { HashRouter, Route, Switch, Link, withRouter } from "react-router-dom";
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
    width: 65%;
    margin-left: 20px;
    background-color: rgba(20, 20, 20, 1);
    border-radius: 5px;
    padding: 20px;
    padding-right: 100px;
    position: relative;
`;

const ButtonBox = styled.div`
    position: absolute;
    background-color: rgba(35, 35, 35, 1);
    display: flex;
    flex-direction: column;
    right: 0px;
    top: 0px;
    width: 80px;
    height: 100%;
    border-radius: 5px;
`;

const ChoiceButton = styled.button`
	color: inherit;
    background-color: ${props => props.current ? "rgba(20, 20, 20, 1)" : "transparent"};
	border: none;
	outline: inherit;
    width: 80px;
    height: 60px;
    font-size: 14px;
    border-radius: 0 5px 5px 0;
`;

const ContentBox = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 10px;
`;

const ItemContainer = styled.div`
    margin: 20px 0px;
    display: flex;
    flex-wrap: wrap;
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
    width: 80%;
`;

const ImdbLink = styled.a``;

const Imdb = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 16px;
    border-radius: 3px;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
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
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 20px;
`;

const ProCompaniesContainer = styled.div`
    display: flex;
    padding: 5px;
    margin-top: 20px;
    overflow: auto;
`;

const ProCompanies = styled.div`
    margin-right: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProCompaniesImg = styled.img`
    max-height: 100px;
    border-radius: 5px;
    background-color: white;
    margin-bottom: 5px;
`;

const SeasonsContainer = styled.div`
    display: flex;
    overflow: auto;
    padding: 5px;
`;

const Seasons = styled.div`
    margin-right: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SeasonsImg = styled.img`
    max-height: 200px;
    border-radius: 5px;
    margin-bottom: 5px;
`;

const CastsContainer = styled.div`
    display: flex;
    overflow: auto;
    padding: 5px;
`;

const Casts = styled.div`
    margin-right: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CastsImg = styled.img`
    max-height: 200px;
    border-radius: 5px;
    margin-bottom: 5px;
`;

const DetailPresenter = withRouter(({ result, loading, error, isMovie, location: { pathname } }) => (
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
                        <ButtonBox>
                            <Link to={isMovie ? `/movie/${result?.id}`: `/show/${result?.id}`}>
                                <ChoiceButton current={pathname === (isMovie ? `/movie/${result?.id}`: `/show/${result?.id}`)}>INFO</ChoiceButton>
                            </Link>
                            {result?.videos &&
                            <Link to={isMovie ? `/movie/${result?.id}/videos`: `/show/${result?.id}/videos`}>
                                <ChoiceButton current={pathname === (isMovie ? `/movie/${result?.id}/videos`: `/show/${result?.id}/videos`)}>VIDEO</ChoiceButton>
                            </Link>}
                            <Link to={isMovie ? `/movie/${result?.id}/cast`: `/show/${result?.id}/cast`}>
                                <ChoiceButton current={pathname === (isMovie ? `/movie/${result?.id}/cast`: `/show/${result?.id}/cast`)}>CAST</ChoiceButton>
                            </Link>
                            {result?.seasons &&
                            <Link to={isMovie ? `/movie/${result?.id}/seasons`: `/show/${result?.id}/seasons`}>
                                <ChoiceButton current={pathname === (isMovie ? `/movie/${result?.id}/seasons`: `/show/${result?.id}/seasons`)}>SEASONS</ChoiceButton>
                            </Link>}
                            {result?.similar &&
                            <Link to={isMovie ? `/movie/${result?.id}/similar`: `/show/${result?.id}/similar`}>
                                <ChoiceButton current={pathname === (isMovie ? `/movie/${result?.id}/similar`: `/show/${result?.id}/similar`)}>SIMILAR</ChoiceButton>
                            </Link>}
                        </ButtonBox>
                        <HashRouter>
                        <Switch>
                            <Route path={isMovie ? `/movie/${result?.id}` : `/show/${result?.id}`} exact >
                                <ContentBox>
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
                                            {(typeof result?.runtime === 'number') ? 
                                            result.runtime : 
                                            result?.episode_run_time.reduce((a, c) => a + c, 0)} min
                                        </Item>
                                        <Divider>•</Divider>
                                        <Item>
                                            {result?.genres &&
                                            result.genres.map((genre, index) => 
                                            index === result.genres.length - 1 ?
                                            genre.name : `${genre.name} / `)}
                                        </Item>
                                        {result?.imdb_id || result?.external_ids?.imdb_id ?
                                            <Divider>•</Divider> :
                                            null
                                        }
                                        <Item>
                                            {result?.imdb_id || result?.external_ids?.imdb_id ? 
                                            <ImdbLink 
                                                href={`https://www.imdb.com/title/${result.imdb_id || result.external_ids.imdb_id}`}
                                                target="__blank"
                                            >
                                                <Imdb bgImage={"https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png"}></Imdb>
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
                                    <ProCompaniesContainer>
                                        {result?.production_companies && 
                                        result.production_companies.map((pc) => (
                                        <ProCompanies>
                                            {pc.logo_path ? 
                                            <ProCompaniesImg 
                                                src={`https://image.tmdb.org/t/p/original${pc.logo_path}`} /> :
                                            <ProCompaniesImg 
                                                src={require("../../assets/noPosterSmall.png").default} />}
                                        <p>{pc.name}</p>
                                        </ProCompanies>
                                        ))}
                                    </ProCompaniesContainer>
                                </ContentBox>
                            </Route>
                            <Route path={isMovie ? `/movie/${result?.id}/videos` : `/show/${result?.id}/videos`} exact >
                                <ContentBox>
                                    <DetailTitle>Videos</DetailTitle>
                                    <VideosContainer>
                                        {result?.videos &&
                                        result?.videos.results.map((video) => (
                                        <Video>
                                            <p>{video.name.length > 45 ? `${video.name.substring(0, 45)}...` : video.name}</p>
                                            <iframe 
                                                key={video.name}
                                                width="480" 
                                                height="360" 
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
                                </ContentBox>
                            </Route>
                            <Route path={isMovie ? `/movie/${result?.id}/cast` : `/show/${result?.id}/cast`} exact >
                                <ContentBox>
                                    <DetailTitle>Cast</DetailTitle>
                                    <CastsContainer>
                                    {result?.credits && result?.credits.cast.map((cast) => (
                                        cast.known_for_department === "Acting" ?
                                        (<Casts>{cast?.profile_path ?
                                            <CastsImg src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} width="120px"/> :
                                            <CastsImg src={require("../../assets/noPosterSmall.png").default} width="120px"/>}
                                            <p>{cast.character}</p>
                                            <p>- {cast.name}</p>
                                            </Casts>) : null
                                    ))}
                                    </CastsContainer>
                                </ContentBox>
                            </Route>
                            <Route path={isMovie ? `/movie/${result?.id}/seasons` : `/show/${result?.id}/seasons`} exact >
                                <ContentBox>
                                    {result?.seasons && <>
                                    <DetailTitle>Seasons</DetailTitle>
                                    <SeasonsContainer>
                                        {result?.seasons.map((season) => 
                                        <Seasons>
                                            {season.poster_path ?
                                            <SeasonsImg src={`https://image.tmdb.org/t/p/original${season.poster_path}`} /> :
                                            <SeasonsImg src={require("../../assets/noPosterSmall.png").default} />}
                                            <p>{season.name}</p>
                                        </Seasons>)}
                                    </SeasonsContainer></>}
                                </ContentBox>
                            </Route>
                            <Route path={isMovie ? `/movie/${result?.id}/similar` : `/show/${result?.id}/similar`} exact >
                                <ContentBox>
                                    {result?.similar.results.length > 0 && <>
                                    <DetailTitle>Similar</DetailTitle>
                                    <SeasonsContainer>
                                        {result?.similar.results.map((similar) => 
                                        <Seasons>
                                            {similar.poster_path ?
                                            <SeasonsImg src={`https://image.tmdb.org/t/p/original${similar.poster_path}`} /> :
                                            <SeasonsImg src={require("../../assets/noPosterSmall.png").default} />}
                                            <p>{similar.name || similar.title}</p>
                                        </Seasons>)}
                                    </SeasonsContainer></>}
                                </ContentBox>
                            </Route>
                        </Switch>
                        </HashRouter>
                    </Data>
                </Content>
            </Container>
        )
    )
);

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    isMovie: PropTypes.bool
}

export default DetailPresenter;