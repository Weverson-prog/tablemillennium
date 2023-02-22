
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components";

export const Cointainer = styled.div`
  display: flex;
  flex-direction: column;
    height: fit-content;
      align-items: center;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
 