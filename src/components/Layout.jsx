import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./desktop/NavBar";

import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "../contexts/AuthContext";
import { GeneralContextProvider } from "../contexts/GeneralContext";
import { GameContextProvider } from "../contexts/GameContext";
import BottomMenu from "../components/mobile/BottomMenu";

const Layout = () => {
  return (
    <AuthContextProvider>
      <GeneralContextProvider>
        <GameContextProvider>
          <Toaster />
            {/* <div className="row " style={{ minHeight: '100vh', overflowY: 'scroll', height: 'max-content' }}> */}
              <div className="col-lg-10 col-md-10 col-sm-0 col-0 px-0 offset-lg-1 offset-md-1 offset-sm-0 offset-0">
                <NavBar />
                <Outlet />
              </div>
            {/* </div> */}
          
          <BottomMenu />
        </GameContextProvider>
      </GeneralContextProvider>
    </AuthContextProvider>
  );
};

export default Layout;
