import styled from 'styled-components'

const ResultGrid = styled.div`
    background-color: ${({ theme }) => theme.colors.black};
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;

    @media(max-width: 860px) {
        grid-template-columns: 100%;
    }
`

export default ResultGrid

