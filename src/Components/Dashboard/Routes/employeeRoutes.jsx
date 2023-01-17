import { db } from "../../../firebase"
import {getDoc, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes } from "firebase/storage"
// import { storage } from "../../../firebase"
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
        addEmpPfp = (imageUpload) => {
            const pfpRef = ref(storage, `image/${imageUpload.name}`)
             return uploadBytes(pfpRef, imageUpload)
        }
    }

    export default new EmployeeRoutes()