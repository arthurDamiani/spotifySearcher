import styled from 'styled-components'

const Box = styled.div`
    background-color: #fefefe;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Image = styled.img`
    width: 15rem;
    height: 15rem;
`

function AlbumBox({name, artistName, image, link, totalTracks}) {
    return (
        <Box>
            <Image src={image} />
        </Box>
    )
}

export default AlbumBox
