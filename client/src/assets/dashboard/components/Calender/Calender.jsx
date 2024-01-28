/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'

export default function MyCalender() {
    const [value, setValue] = useState(new Date())

    return (
        <div>
            <Calendar onChange={setValue} value={value} calendarType='islamic' className={"calender"}/>
        </div>
    );
}