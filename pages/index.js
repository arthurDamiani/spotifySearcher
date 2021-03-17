import styled from 'styled-components'
import {SpotifyAuth, Scopes} from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

const Center = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
`

export default function Home() {
  return(
    <Center>
      <Title>Acesse sua conta no Spotify para acessar o site</Title>
      <SpotifyAuth 
        redirectUri='http://localhost:3000/newReleases'
        clientID='9af444e6d96e4c69b00c1652503c083a'
        scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
      />
    </Center>
  )
}
