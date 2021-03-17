import {useState} from 'react'
import {useRouter} from 'next/router'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import {SpotifyAuthListener} from 'react-spotify-auth'
import api from './api/api'
import ResultGrid from '../src/components/ResultGrid'
import ContentBox from '../src/components/ContentBox'

const Background = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.black};
`

const FormContainer = styled.form`
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2rem 0;
`

const HeaderButton = styled.button`
    padding: 0.5rem;
    background-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 8px;
    text-decoration: none;
`

const Input = styled.input`
    border-radius: 8px;
    border: none;
    padding: 0.5rem;
`

const Select = styled.select`
    border-radius: 8px;
    padding: 0.5rem;
`

function Search() {
    const router = useRouter()
    const token = Cookies.get('spotifyAuthToken')
    const [query, setQuery] = useState('')
    const [type, setType] = useState('')
    const [results, setResults] = useState([])
    const [searched, setSearched] = useState(false)

    async function search(e) {
        e.preventDefault()
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token
        const queryFormated =  query.replaceAll(' ', '%20')
        await api.get(`/v1/search?q=${queryFormated}&type=${type}`)
            .then((res) => {
                switch(type) {
                    case 'artist':
                        setResults(res.data.artists.items)
                        console.log(res.data.artists.items)
                        break
                    case 'album':
                        setResults(res.data.albums.items)
                        console.log(res.data.albums.items)
                        break
                    case 'playlist':
                        setResults(res.data.playlists.items)
                        console.log(res.data.playlists.items)
                        break
                    case 'track':
                        setResults(res.data.tracks.items)
                        console.log(res.data.tracks.items)
                        break
                    case 'show':
                        setResults(res.data.shows.items)
                        console.log(res.data.shows.items)
                        break
                    case 'episode':
                        setResults(res.data.episodes.items)
                        console.log(res.data.episodes.items)
                        break
                    default:
                        setResults(res.data.artists.items)
                        break
                }
            })
        setSearched(true)
    }

    return (
        <div>
            <SpotifyAuthListener/>
            <FormContainer onSubmit={search}>
                <Input placeholder='Digite aqui sua pesquisa' value={query} onChange={(e) => setQuery(e.target.value)} />
                <Select name='type' disabled={searched} onChange={(e) => setType(e.target.value)} >
                    <option value="" defaultValue>--Selecione a categoria--</option>
                    <option value='artist'>Artista</option>
                    <option value='album'>Albúm</option>
                    <option value='playlist'>Playlist</option>
                    <option value='track'>Música</option>
                    <option value='show'>Show</option>
                    <option value='episode'>Ep</option>
                </Select>
                <HeaderButton type='submit'>Pesquisar</HeaderButton>
                {searched && <HeaderButton onClick={() => router.reload()}>Pesquisar outra categoria</HeaderButton>}
            </FormContainer>
            <Background>
                <ResultGrid>
                    {results.map((result, index) => {
                        switch(type) {
                            case 'artist':
                                const iamgeList = result.images
                                if(iamgeList.length === 0) {
                                    return (
                                        <ContentBox 
                                            key={index}
                                            name={result.name}
                                            link={result.external_urls.spotify}
                                        />
                                    )
                                } else {
                                    return (
                                        <ContentBox 
                                            key={index}
                                            name={result.name}
                                            image={iamgeList[0].url}
                                            link={result.external_urls.spotify}
                                        />
                                    )
                                }
                            case 'album':
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
                            case 'playlist':
                                return (
                                    <ContentBox 
                                        key={index}
                                        name={result.name}
                                        image={result.images[0].url}
                                        link={result.external_urls.spotify}
                                    />
                                )
                            case 'track':
                                return (
                                    <ContentBox 
                                        key={index}
                                        name={result.name}
                                        artistName={result.artists[0].name}
                                        image={result.album.images[0].url}
                                        link={result.external_urls.spotify}
                                        totalTracks={result.total_tracks}
                                    />
                                )
                            case 'show':
                                return (
                                    <ContentBox 
                                        key={index}
                                        name={result.name}
                                        artistName={result.publisher}
                                        image={result.images[0].url}
                                        link={result.external_urls.spotify}
                                        totalTracks={result.total_episodes}
                                    />
                                )
                            case 'episode':
                                return (
                                    <ContentBox 
                                        key={index}
                                        name={result.name}
                                        image={result.images[0].url}
                                        link={result.external_urls.spotify}
                                        totalTracks={result.total_tracks}
                                    />
                                )
                            default:
                                return (
                                    <ContentBox 
                                        key={index}
                                        name={result.name}
                                        artistName={result.artists[0].name}
                                        image={result.album.images[0].url}
                                        link={result.external_urls.spotify}
                                        totalTracks={result.total_tracks}
                                    />
                                )
                        }
                    })}
                </ResultGrid>
            </Background>
        </div>
    )
}

export default Search
