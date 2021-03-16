import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {SpotifyAuthListener} from 'react-spotify-auth'
import api from './api/api'
import AlbumBox from '../src/components/AlbumBox'
import Cookies from 'js-cookie'

const HeaderContainer = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Title = styled.h1`
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
`

const NavigationButton = styled.a`
    padding: 0.5rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 8px;
    text-decoration: none;
`

const ContentContainer = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 50% 50%;
    margin: 1rem;

    @media(max-width: 800px) {
        grid-template-columns: 100%;
    }
`

function NewReleases() {
    const token = Cookies.get('spotifyAuthToken')
    const [results, setResults] = useState([])

    useEffect(() => {
        async function getNewRealeases() {
            api.defaults.headers.common['Authorization'] = 'Bearer ' + token
            console.log(token)
            await api.get('/v1/browse/new-releases')
                .then((res) => {
                    setResults(res.data.albums.items)
                    localStorage.setItem('token', token)
                })
                .catch(() => alert('Erro na requisição!'))
        }
        getNewRealeases()
    }, [])

    return (
        <>
            <HeaderContainer>
                <Title>Lançamentos no Spotify!</Title>
                <NavigationButton href='/search'>Pesquisar</NavigationButton>
            </HeaderContainer>
            <ContentContainer>
                <SpotifyAuthListener />
                {results.map((result, index) => {
                    return (
                        <AlbumBox 
                            key={index}
                            name={result.name}
                            artistName={result.artists[0].name}
                            image={result.images[0].url}
                            link={result.external_urls.spotify}
                            totalTracks={result.total_tracks}
                        />
                    )
                })}
            </ContentContainer>
        </>
    )
}

export default NewReleases
