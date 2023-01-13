import { db } from "../../../firebase"
import {getDoc, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { UserAuth } from "../../../context/AuthContext"
import { AuthContextProvider } from "../../../context/AuthContext"
import { useContext, useState } from "react"
import { getStorage, ref, uploadBytes } from "firebase/storage"
const storage = getStorage()
// const {user} = UserAuth
// const empCollection = collection(db, 'users', user.uid, 'employees' )
    

    class EmployeeRoutes {
        addEmp = (pk, newEmp) => {
            const empCollection = collection(db, 'users', pk, 'employees' )
            return addDoc(empCollection, newEmp)
        }

        getAllEmp = (pk) => {
            const empCollection = collection(db, 'users', pk, 'employees' )
            return getDocs(empCollection)
        }

        getEmp = (pk, id) => {
            const empDoc = doc(db, 'users', pk, 'employees', id)
            return getDoc(empDoc)
        }
        updateEmp= (pk, id, updatedEmp) => {
            const empDoc = doc(db,'users', pk, 'employees', id)
            return updateDoc(empDoc, updatedEmp)

        }
        deleteEmp = (pk, id) => {
            const empDoc = doc(db, 'users', pk, 'employees', id)
            return deleteDoc(empDoc)
        }
        addEmpPfp = (pk, id, imageUpload) => {
            const pfpRef = ref(storage, `${pk}/pfp/${id}`)
            uploadBytes(pfpRef, imageUpload)
        }
    }

    export default new EmployeeRoutes()