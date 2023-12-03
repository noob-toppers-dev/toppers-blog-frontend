import styled from "styled-components";

const WrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin: 0;
  padding: 0;
  pointer-events: none;
`

export default function Wrapper(props) {
  return <WrapperStyle>{props.children}</WrapperStyle>;
}
