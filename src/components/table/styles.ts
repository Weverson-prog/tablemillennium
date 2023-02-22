import styled from "styled-components";


export const Table = styled.div`
   font-size: ${({ theme }) => theme.fontSize.sm};
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 1rem;
`;
export const Cointainer = styled.div`
  display: flex;
  flex-direction: column;
    height: fit-content;
      align-items: center;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;