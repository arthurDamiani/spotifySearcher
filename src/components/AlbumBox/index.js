import styled from 'styled-components'

const Box = styled.div`
    background-color: #f0f0f0;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 8px;
    margin: 1rem;
    transition: all ease 0.3s;

    &:hover {
        transform: scale(1.05);
    }
`

const Image = styled.img`
    width: auto;
    height: 10rem;
`

const Title = styled.h2`
    color: ${({ theme }) => theme.colors.black};
`

const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 1rem;
`

const MiddleInfoContainer = styled.div`
    display: flex;

    @media(max-width: 1040px) {
        flex-direction: column;
    }
`

function AlbumBox({name, artistName, image, link, totalTracks}) {
    return (
        <Box>
            <Image src={image} />
            <InfoContainer>
                <Title>{name}</Title>
                <MiddleInfoContainer>
                    <p style={{marginRight: '1rem'}}>Artista: {artistName}</p>
                    <p>Número de faixas: {totalTracks}</p>
                </MiddleInfoContainer>
                <a href={link}>Para acessar esse álbum no spotify clique aqui!</a>
            </InfoContainer>
        </Box>
    )
}

export default AlbumBox
