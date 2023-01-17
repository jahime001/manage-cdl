import React from "react";
import Nav from "../Nav/Nav";
import "./Landing.css";
import { Typewriter } from "react-simple-typewriter";
import empMockup from './empMock.png'

export default function Landing() {
  return (
    <div className="Landing">
      <Nav />
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
                <span style={{ color: "#377dff", fontWeight: "bold" }}>
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
                includes personal details, pay rates,
                contact information, and more.
              </p>
            </div>
            <div className="join-now">Join Now For Free!</div>
          </div>
          <div className="title-imagebox">
            <div className="empMock-container">
              <img src={empMockup} alt="" className="empMock" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
