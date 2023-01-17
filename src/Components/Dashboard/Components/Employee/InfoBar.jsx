import React, { useEffect, useState } from "react";
import "./InfoBar.css";
import employeeRoutes from "../../Routes/employeeRoutes";
import { UserAuth } from "../../../../context/AuthContext";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { RefreshUpdate } from "../../../../context/AuthContext";
import Modal from "react-modal";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../../firebase";
import ProgressBar  from "react-bootstrap/ProgressBar";




export default function InfoBar({ barOpen, currentEmp, setBarOpen }) {
  const [file, setFile] = useState();
  const [emp, setEmp] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { user, refresh } = UserAuth();
  const [percentage, setPercentage] = useState()
  const handleRefresh = RefreshUpdate();
  const pk = user.uid;
  // const storage = getStorage();
const customStyles = {
  content: {
    top: "50%",
    left: "35%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "700px",
    width: "900px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: "2",
  },
};
  const customStyles2 = {
    content: {
      top: "50%",
      left: "35%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "100px",
      width: "200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: "2",
      borderRadius: "20px",
      backgorundColor: "#F7F7F7",
    },
  };
  function openModal() {
    setDeleteOpen(false);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function openDeleteModal() {
     setIsOpen(false);
     setDeleteOpen(true);
   }
   function closeDeleteModal() {
     setDeleteOpen(false);
   }
  useEffect(() => {
    async function getEmp() {
      const data = await employeeRoutes.getEmp(pk, currentEmp);
      setEmp(data.data());
    }
    getEmp();
  }, [currentEmp, refresh]);
 
  function closeBar(){
    setBarOpen(false)
    setDeleteOpen(false);
    setIsOpen(false);
  }

    function uploadImage(e) {
        e.preventDefault()
      const storageRef = ref(storage, `${pk}/profile/${currentEmp}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPercentage(progress)
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
         
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          handleRefresh();
            toast.success("Profile picture changed!", {
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
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            employeeRoutes.updateEmp(pk, currentEmp, {
              img: downloadURL,
            });
            console.log("File available at", downloadURL);
          });
        }
      );
    }

  


  return (
    <div className={`infobar ${barOpen && "bar-active"}`}>
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
      {emp && (
        <div className="infobar-conatainer">
          <div className="infobar-header">
            <AiOutlineClose className="close-infobar" onClick={closeBar} />
            <AiOutlineDelete className="delete-emp-btn" onClick={openDeleteModal} />
            <div
              className="infobar-img"
              style={{
                backgroundImage: `url(${emp.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <MdOutlineAddAPhoto
                className="add-pfp-photo"
                onClick={openModal}
              />
            </div>
            <h1>
              {emp.firstName} {emp.lastName}
            </h1>
            <p>{emp.position}</p>
          </div>
          <div className="infobar-details">
            <div className="detail-item">
              <h3>Email</h3>
              <p>{emp.email}</p>
            </div>
            <div className="detail-item">
              <h3>Phone</h3>
              <p>
                ({emp.phone.slice(0, 3)}) {emp.phone.slice(3, 6)}-
                {emp.phone.slice(6, 10)}
              </p>
            </div>
            <div className="detail-item">
              <h3>Address</h3>
              <p>{emp.address}</p>
            </div>
            <div className="detail-item">
              <h3>City</h3>
              <p>{emp.city}</p>
            </div>
            <div className="detail-item">
              <h3>State</h3>
              <p>{emp.state}</p>
            </div>
          </div>
          <div></div>
        </div>
      )}
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div className="edit-emp-header">
          <h1>Edit Employee</h1>
        </div>
        <div className="edit-emp-pfp">
          <div classname="edit-emp-pfp-left">
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <button onClick={uploadImage}>Upload Image</button>
            <ProgressBar
              animated
              striped
              variant="info"
              now={percentage}
              label={`${percentage}%`}
            />
          </div>
          <div>
            <img src="" alt="" />
          </div>
        </div>
      </Modal>
      <Modal isOpen={deleteOpen} onRequestClose={closeDeleteModal} style={customStyles2}>
        <div className="delete-container">
          <div className="delete-header">
            <h5>Are you sure you want to delete this Employee?</h5>
          </div>
          <div className="delete-buttons">
            <div className="no-delete"><p>No</p></div>
            <div className="yes-delete"><p>Yes</p></div>
          </div>
        </div>
       </Modal>
    </div>
  );
}
