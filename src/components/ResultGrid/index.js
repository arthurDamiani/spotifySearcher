import styled from 'styled-components'

const ResultGrid = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 50% 50%;
    margin: 1rem;

    @media(max-width: 800px) {
        grid-template-columns: 100%;
    }
`

export default ResultGrid

