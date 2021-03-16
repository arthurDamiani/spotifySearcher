import {useState} from 'react'
import {useRouter} from 'next/router'
import Cookies from 'js-cookie'
import {SpotifyAuthListener} from 'react-spotify-auth'
import api from './api/api'
import AlbumBox from '../src/components/AlbumBox'

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
        setQuery(query.replaceAll(' ', '%20'))
        await api.get(`/v1/search?q=${query}&type=${type}`)
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
                setSearched(true)
            })
            .catch(() => alert('Erro na requisição!'))
    }

    return (
        <div>
            <SpotifyAuthListener/>
            {searched ? <button onClick={() => router.reload()}>Pesquisar novamente</button> :
            <form onSubmit={search}>
                <input value={query} onChange={(e) => setQuery(e.target.value)} />
                <select name='type' onChange={(e) => setType(e.target.value)} >
                    <option value="" defaultValue>O que você procura?</option>
                    <option value='artist'>Artista</option>
                    <option value='album'>Albúm</option>
                    <option value='playlist'>Playlist</option>
                    <option value='track'>Música</option>
                    <option value='show'>Show</option>
                    <option value='episode'>Ep</option>
                </select>
                <button type='submit'>Pesquisar</button>
            </form>}
            {results.map((result, index) => {
                switch(type) {
                    case 'artist':
                        return (
                            <AlbumBox 
                                key={index}
                                name={result.name}
                                link={result.external_urls.spotify}
                            />
                        )
                    case 'album':
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
                    case 'playlist':
                        return (
                            <AlbumBox 
                                key={index}
                                name={result.name}
                                image={result.images[0].url}
                                link={result.external_urls.spotify}
                            />
                        )
                    case 'track':
                        return (
                            <AlbumBox 
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
                            <AlbumBox 
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
                            <AlbumBox 
                                key={index}
                                name={result.name}
                                image={result.images[0].url}
                                link={result.external_urls.spotify}
                                totalTracks={result.total_tracks}
                            />
                        )
                    default:
                        return (
                            <AlbumBox 
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
        </div>
    )
}

export default Search
