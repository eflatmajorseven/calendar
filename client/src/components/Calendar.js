import React, {useState,useEffect} from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import AuthService from "../services/auth.service"

const CALENDAR_STYLES = {
    position: 'relative',
    zIndex:1
  }

export default function Calendar () {


    return (
        <div>
            <div className='calendar' style={CALENDAR_STYLES}>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                />
            </div>

        </div>
    )
}