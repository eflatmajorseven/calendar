import React, { useState, useEffect } from 'react'

import AuthService from "../services/auth.service";
import authService from '../services/auth.service';
 
const Table = () => {
    const [employees, setEmployees] = useState([])
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser);
 
    useEffect(() => {
        AuthService.getAllUsers().then((data) => {
               setEmployees(data);
               
               })
    }, [])

 
    const removeData = (id) => {
        authService.removeUser(id).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            setEmployees(del)
        })

    }
 
    const renderHeader = () => {
        let headerElement = ['name', 'email', 'operation']
 
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
 
    const renderBody = () => {
        console.log("renderBody")
        return Object.keys(employees).map(key => {
            return (
                <tr key={key}>
                    <td>{employees[key].name}</td>
                    <td>{employees[key].email}</td>
                    <td className='opration'>
                        <button className='button' onClick={() => removeData(employees[key]._id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }
 
    return (
        <>
            <h1 id='title'>Users Manager</h1>
            <table id='employee'>
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