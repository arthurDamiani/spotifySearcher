import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useRouter} from 'next/router'
import {SpotifyAuthListener} from 'react-spotify-auth'
import api from './api/api'
import ResultGrid from '../src/components/ResultGrid'
import ContentBox from '../src/components/ContentBox'
import Cookies from 'js-cookie'

const HeaderContainer = styled.header`
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Title = styled.h1`
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
`

const NavigationButton = styled.a`
    padding: 0.5rem;
    background-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    text-decoration: none;
`

function NewReleases() {
    const router = useRouter()
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
                .catch(() => router.reload())
        }
        getNewRealeases()
    }, [])

    return (
        <>
            <HeaderContainer>
                <Title>Lançamentos no Spotify!</Title>
                <NavigationButton href='/search'>Pesquisar</NavigationButton>
            </HeaderContainer>
            <ResultGrid>
                <SpotifyAuthListener />
                {results.map((result, index) => {
                    return (
                        <ContentBox 
                            key={index}
                            name={result.name}
                            artistName={result.artists[0].name}
                            image={result.images[0].url}
                            link={result.external_urls.spotify}
                            totalTracks={result.total_tracks}
                        />
                    )
                })}
            </ResultGrid>
        </>
    )
}

export default NewReleases
