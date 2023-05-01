import React, { useState, useEffect } from 'react'

import AuthService from "../services/auth.service";

const Table = () => {
    const [employees, setEmployees] = useState([])
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser);

    useEffect(() => {
        AuthService.getAllUsers().then((data) => {
               setEmployees(data);
               })
    }, [])

    // const getData = async () => {
    //     //Gauti duomenis is MongoDB

    //     const response = await axios.get(URL)
    //     setEmployees(response)
    // }

    const removeData = (id) => {
        AuthService.removeUser(id).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            setEmployees(del)
        })
        //Istrinti is DB, jei ID nera tai tada paduoti e-mail ir pagal ji istrinti elementa

    }

    const renderHeader = () => {
        //Surenderina lenteles virsu
        let headerElement = ['name', 'email', 'operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        //Pati lentele
        /*
        console.log("test")
        Object.keys(employees).map(key => {
            console.log(key); // 👉️ name, country
            console.log(employees[key].name); // 👉️ James, Chile
            console.log(employees[key].email);
        });
        */
        console.log("renderBody")
        return Object.keys(employees).map(key => {
            return (
                <tr key={key}>
                    <td>{employees[key].name}</td>
                    <td>{employees[key].email}</td>
                    <td className='operation'>
                        <button className='button' onClick={() => removeData(employees[key]._id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <h1 id='title'>Users Manager</h1>
            <table data-testid='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}

export default Table