import styled from "styled-components";

const TitleStyle = styled.h1`
  margin: 0 auto;
  padding: 0;
  text-transform: uppercase;
  width: 90%;
  text-align: center;
  font-size: 1.5rem;

`

export default function Title(props) {
  return <TitleStyle>{props.children}</TitleStyle>;
}