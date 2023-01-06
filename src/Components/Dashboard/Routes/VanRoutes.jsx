import { db } from "../../../firebase"
import {getDoc, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { UserAuth } from "../../../context/AuthContext"
import { AuthContextProvider } from "../../../context/AuthContext"
import { useContext, useState } from "react"



    

    class VanRoutes {
        addVan = (pk, newVan) => {
            const vanCollection = collection(db, 'users', pk, 'vans' )
            return addDoc(vanCollection, newVan)
        }

        getAllVan = (pk) => {
            const vanCollection = collection(db, 'users', pk, 'vans' )
            return getDocs(vanCollection)
        }

        getVan = (pk, id) => {
            const vanDoc = doc(db, 'users', pk, 'vans', id)
            return getDoc(vanDoc)
        }
        updateVan= (pk, id, updatedVan) => {
            const vanDoc = doc(db,'users', pk, 'vans', id)
            return updateDoc(vanDoc, updatedVan)

        }
        deleteVan = (pk, id) => {
            const vanDoc = doc(db, 'users', pk, 'vans', id)
            return deleteDoc(vanDoc)
        }
    }

    export default new VanRoutes()