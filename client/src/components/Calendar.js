import React, {useState,useEffect} from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import AuthService from "../services/auth.service"
import Slot from './Slot'

const CALENDAR_STYLES = {
    position: 'relative',
    zIndex:1
  }

export default function Calendar () {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenUser, setIsOpenUser] = useState(false)
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState("");
    const [slotas, setSlot] = useState("");

    useEffect(() => {
        AuthService.getSlots().then((data) => {
        setSlots(data);
        })
       
     }, []);

     const populateSlots = (slots) => {
        if (!slots) return null;
    
        return slots.map((slot) => (
          { value:slot,
            title:slot.name+" "+slot.lastname.charAt(0),
            date:slot.date
           }
           
        ))
     }

     const handleDateClick = (arg) => { 
        setIsOpen(true);
        setDate(arg.dateStr);
        //alert("test");
          }
    
    
    return (
        <div>
            <div className='calendar' style={CALENDAR_STYLES}>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    dateClick={handleDateClick}
                    eventContent={renderEventContent}
                    events={populateSlots(slots)}
                />
            </div>
            
      <Slot open={isOpen} onClose={()=> setIsOpen(false)}
      date={date}>         
      </Slot>
    
        </div>
    )
}

function renderEventContent(eventInfo) {
    return (
      <>
        {/* <b>{eventInfo.timeText}</b> */}
        <i>{eventInfo.event.title}</i>
      </>
    )
  }