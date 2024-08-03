import styled from 'styled-components';

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.height}, calc(25vw / ${props => props.width}));
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;

  /* Responsive adjustments */
  @media (max-width: 1200px) {
    grid-template-rows: repeat(${props => props.height}, calc(40vw / ${props => props.width}));
    grid-template-columns: repeat(${props => props.width}, 1fr);
    max-width: 40vw;
  }

  @media (max-width: 900px) {
    grid-template-rows: repeat(${props => props.height}, calc(45vw / ${props => props.width}));
    grid-template-columns: repeat(${props => props.width}, 1fr);
    max-width: 45vw;
  }

  @media (max-width: 600px) {
    grid-template-rows: repeat(${props => props.height}, calc(55vw / ${props => props.width}));
    grid-template-columns: repeat(${props => props.width}, 1fr);
    max-width: 55vw;
  }

  @media (max-width: 400px) {
    grid-template-rows: repeat(${props => props.height}, calc(65vw / ${props => props.width}));
    grid-template-columns: repeat(${props => props.width}, 1fr);
    max-width: 65vw;
  }
`;
