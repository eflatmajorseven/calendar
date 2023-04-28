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

         
     export default  function SlotUser ({open, children, onClose, slot}) {

       const [startShift, setStartShift] = useState(new Date());
       const [endShift, setEndShift] = useState(new Date());
       const [shiftTime, setShiftTime] = useState(new Date());
      
          
            const handleStartShiftChange = (e) => {
              const time = e.target.value
              setStartShift(time);
              // const date = slot.date.toString().split('T')[0]  
              // setStartShift(date+"T"+time+":00")
            };
            const handleEndShiftChange = (e) => {
              const time = e.target.value 
              setEndShift(time)
            };
            const handleSubmit =(e)=> {
                e.preventDefault();
                if (!startShift || !endShift){
                     onClose()
              }else{
                AuthService.saveSlot(slot._id,startShift,endShift)
                onClose()
              }
              
                //calcShiftTime();
       
            }
//TODO neveikia datu palyginimas
            // const calcShiftTime = () => {
            //   if (endShift > startShift) {
            //   const diff = endShift.valueOf() - startShift.valueOf()
            //   setShiftTime(diff)
            // }
            //   else{
            //   alert("end shift time value is bigger than start shift") }
            // }  

            if (!open) return null;
              return ReactDom.createPortal(
                <>
                <div style={OVERLAY_STYLES}/>
                <div style={MODAL_STYLES} className='popup'>
  <button onClick={onClose}>Close</button>
                  <div>
                  <h4>Data: {slot.date}</h4>
                  <h4>Vardas: {slot.name}</h4>
                  <h4>Pavardė: {slot.lastname}</h4>
                  
                  <Form onSubmit={handleSubmit} > 
                  <label for="startShift">Select start of shift time:</label>
                  <input type="datetime-local" id="startShift" name="startShift" onChange={handleStartShiftChange}></input>

                  <label for="endShift">Select end of shift time:</label>
                  <input type="datetime-local" id="endShift" name="endShift" onChange={handleEndShiftChange}></input>

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