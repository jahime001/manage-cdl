import React, { useState, useEffect } from "react";
import "./Employee.css";
import ReactPaginate from "react-paginate";
import InfoBar from "./InfoBar";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineReadMore } from "react-icons/md";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import employeeRoutes from "../../Routes/employeeRoutes";
import { UserAuth } from "../../../../context/AuthContext";
import { RefreshUpdate } from "../../../../context/AuthContext";

export default function Results({ employees }) {
  const { user, refresh } = UserAuth();
  const handleRefresh = RefreshUpdate();
  const pk = user.uid;
  const items = employees;
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [barOpen, setBarOpen] = useState(false);
  const [currentEmp, setCurrentEmp] = useState();
  const [empId, setEmpId] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("Driver");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pay, setPay] = useState("");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "700px",
      width: "500px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  function openModal(id) {
    setEmpId(id);
    const ce = employees.find((emp) => emp.id == id);
    setFirstName(ce.firstName);
    setLastName(ce.lastName);
    setEmail(ce.email);
    setPhone(ce.phone);
    setAddress(ce.address);
    setCity(ce.city);
    setState(ce.state);
    setPay(ce.pay);
    setPosition(ce.position);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  async function updateEmp(e) {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      position === "" ||
      phone < 0 ||
      email === "" ||
      address === "" ||
      city === ""
    ) {
      toast.warn("All fields must be filled", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const updatedEmp = {
      firstName,
      lastName,
      position,
      phone,
      email,
      address,
      city,
      state,
      phone,
      pay,
    };
    const pk = user.uid;
    console.log(pk);
    try {
      await employeeRoutes.updateEmp(pk, empId, updatedEmp);
      toast.success("Employee Edited", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      closeModal();
      console.log("sent");
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error.message);
    }
    handleRefresh();
  }

  useEffect(() => {
    function handleResize() {
      const wide = window.matchMedia("(min-width: 1900px)");
      let wideScreen = wide.matches;
      if (wideScreen) {
        setItemsPerPage(12);
        console.log(itemsPerPage);
      } else {
        setItemsPerPage(6);
        console.log(itemsPerPage);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);
  // console.log(employees);

  function openBar(id) {
    setBarOpen(true);
    setCurrentEmp(id);
    console.log(currentEmp);
    // console.log(id)
  }
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, , items]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="employee-results">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {currentItems && (
        <div className="results-container">
          {currentItems.map((emp) => {
            console.log(emp.img);
            return (
              <div className="emp-card">
                <div className="emp-card-upper">
                  {emp.img ? (
                    <div
                      className="emp-card-pfp"
                      style={{
                        backgroundImage: `url(${emp.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {/* <img className="pfp" src={emp.img}></img> */}
                    </div>
                  ) : (
                    <div className="emp-card-pfp"></div>
                  )}
                </div>
                <div className="emp-card-lower">
                  <h4>
                    {emp.firstName} {emp.lastName}
                  </h4>
                  <p>{emp.position}</p>
                </div>
                <div className="emp-card-more">
                  <AiOutlineEdit
                    className="edit-emp-btn"
                    onClick={() => openModal(emp.id)}
                  />
                  <MdOutlineReadMore
                    className="open-bar-btn"
                    onClick={() => openBar(emp.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <InfoBar
        barOpen={barOpen}
        currentEmp={currentEmp}
        setBarOpen={setBarOpen}
      />
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div className="employee-form-header">
          <h1>Edit Employee</h1>
        </div>
        <form onSubmit={updateEmp} className="employee-form">
          <div className="field-div">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="field-div">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Street Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="field-div">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <select
              value={state}
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            >
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
          <div className="field-div">
            <input
              type="text"
              placeholder="Pay(per day)"
              value={pay}
              onChange={(e) => setPay(e.target.value)}
            />
            <select
              name="position"
              id=""
              onChange={(e) => setPosition(e.target.value)}
              value={position}
            >
              <option>Driver</option>
              <option>Monitor</option>
            </select>
          </div>
          <button type="submit" className="register-button">
            Edit
          </button>
        </form>
      </Modal>
    </div>
  );
}
