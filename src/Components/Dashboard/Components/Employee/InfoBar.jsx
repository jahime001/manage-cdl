import React, { useEffect, useState } from "react";
import "./InfoBar.css";
import employeeRoutes from "../../Routes/employeeRoutes";
import { UserAuth } from "../../../../context/AuthContext";
import { MdOutlineAddAPhoto } from "react-icons/md";
import Modal from "react-modal";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../../firebase";
import ProgressBar  from "react-bootstrap/ProgressBar";




export default function InfoBar({ barOpen, currentEmp }) {
  const [file, setFile] = useState();
  const [emp, setEmp] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = UserAuth();
  const [percentage, setPercentage] = useState()
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
    zIndex: "2"
  },
};
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    async function getEmp() {
      const data = await employeeRoutes.getEmp(pk, currentEmp);
      setEmp(data.data());
    }
    getEmp();
  }, [currentEmp]);
  console.log(emp)
  useEffect(() => {
    function uploadImage() {
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
          // Handle successful uploads on complete
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
    uploadImage()
  }, [file]);


  return (
    <div className={`infobar ${barOpen && "bar-active"}`}>
      {emp && (
        <div className="infobar-conatainer">
          <div className="infobar-header">
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
          </div>
          <div></div>
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
            {/* <button onClick={uploadImage}>Upload Image</button> */}
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
    </div>
  );
}
