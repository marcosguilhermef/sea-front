import Header from "../Components/Header";
import Asside from "../Components/Asside";
import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
const Layout = ({ children }: { children? : React.ReactNode } ) => {
  return (
    <>
      <Header/>
      <Asside/>
      <Container className="my-3">
        <Outlet />
      </Container>
    </>
  )
};

export default Layout;