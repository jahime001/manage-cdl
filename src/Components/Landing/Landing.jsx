import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import "./Landing.css";
import { Typewriter } from "react-simple-typewriter";
import empMockup from "./empMock.png";
import Modal from "react-modal";
import ChangeLogs from "../ChangeLogs/ChangeLogs";
import { Link } from "react-router-dom";
import { SlPeople, SlDocs, SlChart } from "react-icons/sl";

export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "400px",
      width: "600px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: "2",
    },
  };
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 2000);
  }, []);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="Landing">
      <Nav />

      {/* <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div>
          <h1>Welcome</h1>
          <h4>
            This website is a work in progress and does not have full
            functionality yet, check the{" "}
            <Link to="/changelogs">
              Change Logs
            </Link>{" "}
            for recent and future changes
          </h4>
          <h3>
            If you would like to sign into a account already populated with
            data-
          </h3>
          <p>Email: testaccount@gmail.com</p>
          <p>Pass: testaccount23</p>
        </div>
      </Modal> */}
      <section className="one">
        <div className="front-page">
          <div className="title-textbox">
            <div className="title-text">
              <h2
              // style={{
              //   paddingTop: "5rem",
              //   margin: "auto 0",
              //   fontWeight: "normal",
              // }}
              >
                Manage your
                <br />{" "}
                <span style={{ fontWeight: "bold" }} className="typewriter">
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={[
                      "Employees",
                      "Vans",
                      "Pupils",
                      "Invoices",
                      "Company",
                    ]}
                    loop={100}
                    cursor
                    cursorStyle="|"
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1500}
                    // onLoopDone={handleDone}
                    // onType={handleType}
                  />
                </span>
              </h2>
              <p>
                Easily manage and organize your bus company's information. This
                includes personal details, pay rates, contact information, and
                more.
              </p>
            </div>
            <button className="join-now">Join Now</button>
          </div>
          <div className="title-imagebox">
            <div className="empMock-container">
              <img src={empMockup} alt="" className="empMock" />
            </div>
          </div>
        </div>
      </section>
      <section className="two">
        <div className="sectiontwo-upper">
          <h2>What we provide</h2>
        </div>
        <div className="sectiontwo-lower">
          <div className="sectiontwo-floater-card">
            <div className="sectiontwo-floater-card-upper">
              {/* card one */}
              <SlPeople className="sectiontwo-floater-icon" />
            </div>
            <div className="sectiontwo-floater-card-mid">
              <h4>Track Employees</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                voluptatum nam numquam harum nesciunt accusamus cumque, quasi
                quidem itaque doloribus.
              </p>
            </div>
            <div className="sectiontwo-floater-card-lowerr"></div>
          </div>
          <div className="sectiontwo-floater-card">
            {/* card two */}
            <div className="sectiontwo-floater-card-upper">
              <SlDocs className="sectiontwo-floater-icon" />
            </div>
            <div className="sectiontwo-floater-card-mid">
              <h4>Save Docs</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                voluptatum nam numquam harum nesciunt accusamus cumque, quasi
                quidem itaque doloribus.
              </p>
            </div>
            <div className="sectiontwo-floater-card-lowerr"></div>
          </div>
          {/* card three */}
          <div className="sectiontwo-floater-card">
            <div className="sectiontwo-floater-card-upper">
              <SlChart className="sectiontwo-floater-icon" />
            </div>
            <div className="sectiontwo-floater-card-mid">
              <h4>Monitor Your Company</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                voluptatum nam numquam harum nesciunt accusamus cumque, quasi
                quidem itaque doloribus.
              </p>
            </div>
            <div className="sectiontwo-floater-card-lowerr"></div>
          </div>
          {/* card four */}
          <div className="sectiontwo-floater-card">
            <div className="sectiontwo-floater-card-upper">
              <SlPeople className="sectiontwo-floater-icon" />
            </div>
            <div className="sectiontwo-floater-card-mid">
              <h4>Track Employees</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                voluptatum nam numquam harum nesciunt accusamus cumque, quasi
                quidem itaque doloribus.
              </p>
            </div>
            <div className="sectiontwo-floater-card-lowerr"></div>
          </div>
        </div>
      </section>
                    <section></section>
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
