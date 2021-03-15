import styled from 'styled-components'
import {SpotifyAuth, Scopes} from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export default function Home() {
  return(
    <Center>
      <SpotifyAuth 
        redirectUri='http://localhost:3000/newReleases'
        clientID='9af444e6d96e4c69b00c1652503c083a'
        scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
      />
    </Center>
  )
}
