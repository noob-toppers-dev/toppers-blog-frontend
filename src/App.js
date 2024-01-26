import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './layout/footer/footer';
import { LayoutContainer } from './styled-components';
import { Toaster } from 'react-hot-toast';
import Header from './layout/header/header';
import AuthProvider, { AuthContext } from './context';
import Routing from './routes';
import { useContext } from 'react';
import styled from 'styled-components';
import AdminPanel from './admin-panel';

const MainContainerLayout = styled.div`
   padding-top: 45px;
`

function App() {
  const { themeMode } = useContext(AuthContext);
  console.log(themeMode, "theme")

  return (
    <>
      <BrowserRouter>
        <LayoutContainer theme={themeMode.toString()} >
          <Header theme={themeMode} />
          <MainContainerLayout>
            {/* <AdminPanel /> */}
            <Routing />
          </MainContainerLayout>
        </LayoutContainer>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
