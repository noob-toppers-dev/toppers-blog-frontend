import styled from "styled-components";

const SubTitleStyle = styled.div`
 margin: 24px auto 0;
  padding: 0;
  width: 90%;
  text-align: center;
  font-size: 0.95rem;

`
export default function Subtitle(props) {
  return <SubTitleStyle>{props.children}</SubTitleStyle>;
}