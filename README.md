## About the project
    With this app you can easily manage your cdl comapny's Employees, Vans, and students.


## Screenshots
![Screen Shot 2023-01-06 at 10 57 52 AM](https://user-images.githubusercontent.com/115008686/211050119-4836d539-fe99-4e32-931b-6ffd2c93ff77.png)
![Screen Shot 2023-01-06 at 10 57 38 AM](https://user-images.githubusercontent.com/115008686/211050155-d452fdeb-c4f0-4bda-9cb4-df778459b6de.png)
![Screen Shot 2023-01-06 at 10 57 29 AM](https://user-images.githubusercontent.com/115008686/211050180-14043ab6-2604-4a25-809a-ed220cdd2b62.png)





 ## Built With:


* [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)]()
* [![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.javascript.com/)
* [![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/)
* [![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)]()
* [![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)]()
* [![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)]()


## Code Snippet
```js
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
    }
```
