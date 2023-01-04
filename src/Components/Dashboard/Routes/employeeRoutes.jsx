import { db } from "../../../firebase"
import {getDoc, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { UserAuth } from "../../../context/AuthContext"
import { AuthContextProvider } from "../../../context/AuthContext"

const {user} = UserAuth()


const empCollection = collection(db, 'users', user.uid, 'employees' )
    

    class EmployeeRoutes {
        addEmp = (newEmp) => {
            return addDoc(empCollection, newEmp)
        }

        updateEmp= (id, updatedEmp) => {
            const empDoc = doc(db,'users', user.uid, 'employees', id)
            return updateDoc(empDoc, updatedEmp)

        }
        deleteEmp = (id) => {
            const empDoc = doc(db, 'users', user.uid, 'employees', id)
            return updateDoc(empDoc)
        }
        getAllEmp = () => {
            return getDocs(empCollection)
        }
        getBook = (id) => {
            const empDoc = doc(db, 'users', user.uid, 'employees', id)
            return getDocs(empDoc)
        }
    }

    export default new EmployeeRoutes()