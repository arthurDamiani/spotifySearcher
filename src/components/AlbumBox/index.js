import styled from 'styled-components'

const Box = styled.div`
    background-color: #fbfbfb;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin: 1rem;
    transition: all ease 0.3s;

    &:hover {
        transform: scale(1.05);
    }
`

const Image = styled.img`
    width: 15rem;
    height: 15rem;
`

const Title = styled.h2`
    color: ${({ theme }) => theme.colors.black};
`

const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`

function AlbumBox({name, artistName, image, link, totalTracks}) {
    return (
        <Box>
            <Image src={image} />
            <Title>{name}</Title>
            <InfoContainer>
                <p>Artista: {artistName}</p>
                <p>Número de músicas: {totalTracks}</p>
            </InfoContainer>
            <a href={link}>Para acessar esse álbum no spotify clique aqui!</a>
        </Box>
    )
}

export default AlbumBox
