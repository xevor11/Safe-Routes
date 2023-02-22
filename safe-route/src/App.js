import React from 'react';
import './App.css';
import LoginButton from './components/login-button';
import LogoutButton from './components/logout-button';
import SignupButton from './components/signup-button';
import MapCont from './components/mapcontainer';
import SearchBar from './components/search-bar';
import TopBar from './components/topbar';


function App() {

  return (
    <div>
      <TopBar />
      <MapCont/>
    </div>

  );
}

export default App;


{/* <div
      style={{
        display:"flex",
        flexDirection:"column",
        width:"auto",
        height:"100%",
      }}>
      <nav style={{width:"20%", height:"10%", justifyContent:"space-between", display:"flex"}}>
        <SearchBar/>
        <LoginButton/>
      </nav>
      <div>
        <MapCont/>
      </div>
    </div> */}