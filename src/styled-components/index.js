import { css, styled } from 'styled-components';

export const FlexContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FlexAlign = css`
  display: flex;
  align-items: center;
`;

export const HeaderLogoStyle = styled.div`

  a{
color: ${(props) => props?.theme === "true" ? "#2f2f2f" : "#efefef"} !important;
    display: flex;
    align-items: center;
    img{
      width: 60px;
    }
    span{
      margin-left: -6px;
      color: #2f2f2f!important;
    font-size: 25px;
    font-family: cursive;
    font-style: italic;
    font-weight: 800;
    }
  }
`
export const BlogHeaderSection = styled.div`
padding-top: 20px;
${FlexContainer}
 flex-wrap: wrap;
 @media (max-width:425px){
 a button{
  width: 150%;
 }
 }
`


export const LayoutContainer = styled.div`
min-height: calc(100vh - 40px);
height: 100%;
background: ${(props) => props?.theme === "true" ? "#efefef" : "#2f2f2f"};
color: ${(props) => props?.theme === "true" ? "#2f2f2f" : "#efefef"} !important;
`;
export const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  background: ${(props) => props?.theme === "true" ? "#efefef" : "#2f2f2f"} !important;
  color: ${(props) => props?.theme === "true" ? "#2f2f2f" : "#efefef"} !important;
  padding: 0px 15px;
  box-shadow: 2px 3px 4px 2px rgba(0,0,0,0.3);
  ${FlexContainer}
`;

export const NavigationStyle = styled.div`
   margin: 0;
   padding: 0;
   margin-right: 20px;
  ${FlexContainer}

`
export const NavListStyle = styled.li`
  list-style: none;
  a{
color: ${(props) => props?.theme === "true" ? "#2f2f2f" : "#efefef"} !important;
    text-decoration: none;
    font-size: 18px;
    padding: 5px 10px;
    margin: 0px 6px;
    border-radius: 6px;
    &.active{
      background: #ffae33;
    }
  }
`

export const Heading = styled.h1`
  font-size: 24px;
  span{
    color: crimson;
  }
`;
export const RightContent = styled.div`
display: flex;
align-items: center;
position: relative;
    span{
        font-size :25px;
        cursor: pointer;
        margin-left: 20px;
    }
`

export const ProfileLogo = styled.div`
    ${FlexCenter}
     width: 35px;
     height: 35px;
     overflow: hidden;
     text-transform: uppercase;
     background: #f0f0f0;
     border-radius: 100%;
     font-size: 22px;
     font-weight: 700;
     cursor: pointer;
     
`
export const ProfileStyle = styled.div`
        position: absolute;
        z-index: 9999;
        top: 46.5px;
        background: #171f31;
        right: -35px;
        transform: translate(-23px, 0px);
        min-width: 190px;
        min-height: 60px;
        padding: 10px 5px;
        border-radius: 6px;
        box-shadow: 0px 3px 20px 1px rgb(0 0 0 / 80%);
`
export const ProfileList = styled.li`
    ${FlexAlign}
    list-style: none;
    padding: 5px;
    margin-bottom: 10px;
    color: #f0f0f0;
    font-size: 17px;
    font-weight: 600;
    background: hsl(210deg 1.84% 67.91% / 55%);
    border-radius: 5px;
    text-transform: capitalize;
    cursor: pointer;
    &:hover{
    background: hsl(210deg 1.84% 37.91% / 55%);
    }
    a{
    color: #f0f0f0;
    }
    span{
      margin: 6px;
      font-size: 17px;
    }
`
export const HomeWrapperStyle = styled.div`
        width: 100%;
`
export const HomeInnerStyle = styled.div`
margin-top: 80px;
        padding: 10px 20px;
        @media (max-width: 576px) {
          padding: 5px;
  }
`


export const FormContainerStyle = styled.div`
    ${FlexCenter}
    min-height: 84.5vh;
    background: #fff;
    padding: 10px;
`

export const FormStyle = styled.form`
    max-width: 500px;
    width: 100%;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 2px 3px 2px 2px rgba(0,0,0,0.5);
`
export const FormHeader = styled.div`
    font-size: 25px;
    font-weight: 600;
    padding-bottom: 20px;
    text-align: center;
`
export const FormControls = styled.div`
    /* width: 100%; */
    position: relative;
    margin-bottom: 15px;
    
    `
export const GlobalFilterStyle = styled.div`
  margin-bottom: 15px;
  max-width: 520px;
  width: 100%;
  input{
    color: #fcaf3b !important;
  }
`


export const EyeIcon = styled.span`
  position: absolute;
  cursor: pointer;
  top: 7px;
  right: 10px;
`
export const FormInput = styled.input`
    width: 100%;
    padding: 10px 15px;
    outline: none;
    border: 0.4px solid #c9c9c9;
    font-size: 16px;
    border-radius: 6px;
`
export const FormTextArea = styled.textarea`
    width: 100%;
    padding: 10px 15px;
    outline: none;
    border: 0.4px solid #c9c9c9;
    font-size: 16px;
    border-radius: 6px;
    resize: vertical;
    min-height: 20px;
`
export const FormButton = styled.button`
    padding: 10px 15px;
    font-size: 20px;
    background: #4949bf;
    text-align: center;
    width: 50%;
    color: #fff;
    transition: 0.4s;
    &:hover{
        background: #414179e0;
    }

`

export const PictureLabelStyle = styled.label`
    ${FlexCenter}
    font-size: 20px;
    margin-bottom: 15px;
    background: #e9e9e9;
    padding: 8px;
    border-radius: 10px;

`

export const PriviewImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`


export const ActionSection = styled.div`
${FlexContainer}
padding: 2px 10px;

`;
export const CommentBoxContainer = styled.div`
  margin: 20px 0px;
`;

export const CommentBoxInner = styled.div`
 padding: 10px;
`;
export const CommentInputBox = styled.div`
 ${FlexAlign}
 width: 100%;
`;
export const CommentMessageBox = styled.div`
${FlexContainer}
padding: 10px;
color:#000;

`;
export const CommentMessage = styled.div`
${FlexAlign}
`;
export const MessageBox = styled.div`
margin-left: 10px;

`;
export const CommentText = styled.p`
margin-bottom: 5px;
color: #555555;
span{
     font-weight: 600;
    margin-left: 7px;
    font-style: italic;
    font-size: 15px;
  }
`;

// dialog box
export const Dialog = styled.div`
 /* display: ${props => (props.isToggle === 'true' ? 'block' : 'none')}; */
  position: absolute;
  top: 90%;
  right: 5%;
  transform: translate(-8%, -10%);
  width: 140px;
  max-height: 180px;
  background: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
    padding: 5px;
    cursor: pointer;
    font-size: 19px;
    color: #292828;
    font-weight: 500;
    display: flex;
    align-items: center;
    border-bottom: 0.5px solid #c9c9c9;
    svg{
      margin-right: 4px;
    }

  &:hover {
    background-color: #ffae33;
    color: #fff;
    font-weight: 600;
  }
`;

export const FooterLogin = styled.div`
    margin-top: 20px;
    text-align: center;
    a{
      margin-left: 10px;
      text-decoration: underline;
    }
`
export const HeroFeaturedTitle = styled.h2`
 font-size: 22px;
 color: #2a2a2a;
 font-weight: 600;
 margin-bottom: 15px;
`
export const HeroFeaturedSubTitle = styled.h3`
 font-size: 18px;
 color: #2a2a2a;
 font-weight: 400;
`
export const HeroFeaturedCard = styled.div`
flex: ${({ itemLen }) => `0 0 calc(100%/${itemLen})`};
text-align: center;
min-width: 200px;
width: 100%;
height: 80px;
`