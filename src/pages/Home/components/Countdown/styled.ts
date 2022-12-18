import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  font-weight: bold;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};
  display: flex;
  gap: 1rem;

  span {
    background: ${({ theme }) => theme['gray-700']};
    padding: 2.5rem 1rem;
    border-radius: 8px;
  }

  .separator {
    color: ${({ theme }) => theme['green-500']};
    padding: 2rem 0rem;
    width: 6rem;

    overflow: hidden;
    display: flex;
    justify-content: center;
  }
`
