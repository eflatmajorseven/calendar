import React, { useState, useEffect } from "react";
import ReactDom from 'react-dom'
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Select from 'react-select';
import AuthService from "../services/auth.service";


const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top:0,
  left:0,
  right:0,
  bottom:0,
  backgroundColor: 'rgba(0,0,0, .7)'
}

         
     export default  function Slot ({open, children, onClose, date}) {

       const [selectedOption, setSelectedOption] = useState(null);
       const [users, setUsers] = useState('');
      
       

           useEffect(() => {
               AuthService.getAllUsers().then((data) => {
               setUsers(data);
               
               })
              
            }, []);
          
            const populateOptions = (users) => {
                if (!users) return null;
                
              return users.map((user) => ( 
                  { value: user, label: user.name+" "+user.lastname} 
                ));
                    
            };


            const handleSelectChange = (selectedOption) => {
              setSelectedOption(selectedOption)
              console.log(selectedOption)
            };
            const handleSubmit =(e)=> {
                e.preventDefault();
                //alert(selectedOption.value.name)
                if (!selectedOption){
                      onClose();
                }
                else {
                AuthService.createSlotAdmin(selectedOption.value.name,selectedOption.value.lastname,date)
                onClose();
                }
            }
            if (!open) return null;
              return ReactDom.createPortal(
                <>
                <div style={OVERLAY_STYLES}/>
                <div style={MODAL_STYLES} className='popup'>
  <button onClick={onClose}>Close</button>
        {children} 
                  <div>
                  <h4>Data: {date}</h4>
                  <Form onSubmit={handleSubmit} > 
                  
                <Select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  options={populateOptions(users)}
                />
                <div className="form-group">
                <button className="btn btn-primary btn-block">Confirm</button>
              </div>
                <CheckButton style={{ display: "none" }} />
                </Form>
                </div>
                
                </div>
                </>,
  document.getElementById('portal')
              );
            }




  
 


