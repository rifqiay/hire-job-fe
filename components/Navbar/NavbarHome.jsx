import Image from "next/image";
import Link from "next/link";
import SplitButton from "react-bootstrap/SplitButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import Logo from "../../public/logo-nav.svg";
import { useRouter } from "next/router";
import Bell from "../../public/bell.svg";
import Mail from "../../public/mail.svg";
import Profile from "../../public/icon-profile.svg";
import jwt_decode from "jwt-decode";

export default function Navbar() {
  // const token = localStorage.getItem("token");
  // const decoded = jwt_decode(token);
  // const id = decoded.id;

  return (
    <>
      <style jsx>
        {`
              .btn-nav {
                margin: 0 10px;
              }
        
              .btn-navbar {
                position: absolute;
                right: 65px;
                top: 9px
              }   
              .a {
                cursor: pointer !important;
              }      
          @media only screen and (min-width: 992px) {
            .res-btn {
              display: none !important;
            }
          }
          @media only screen and (max-width: 991px) {
            .btn-navbar {
              display: none !important;
            }
          
    `}
      </style>

      <div className="fixed-top">
        <div className="container">
          <nav
            className="navbar navbar-expand-lg"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="container-fluid">
              <Link href="/">
                <Image src={Logo} alt="logo" />
              </Link>
              <div className="d-flex align-items-center btn-navbar">
                <div className="me-5">
                  <Image src={Bell} alt="bell" />
                </div>
                <div className="me-5">
                  <Image src={Mail} alt="mail" />
                </div>
                <div>
                  <Image src={Profile} alt="profile" />
                </div>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div className="d-flex align-items-center justify-content-end mt-3 res-btn">
                  <div className="me-5">
                    <Image src={Bell} alt="bell" />
                  </div>
                  <div className="me-5">
                    <Image src={Mail} alt="mail" />
                  </div>
                  <div className="me-3">
                    <Image src={Profile} alt="profile" />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
