import Header from "../Components/Header";
import Asside from "../Components/Asside";
import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Asside />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <Container fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </>
  );
};

export default Layout;
