import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Background from '../Background/Background';
import './Layout.css';

function Layout() {
  return (
    <>
      <Header />
      <Background />
      <main className="container">
        <Outlet />
      </main>

    </>
  );
}

export default Layout;
