import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import useEffect from "react"

function Important() {
    let meetings = useSelector((state) => state.meet.meets);
    meetings = meetings.filter(meet => meet.isImportant)
    const dispatch = useDispatch()


    return (

        <div>
            <h1>Important Meetings</h1>
            <ul>
                {meetings.length > 0 ? (
                    meetings.map((meet) => (
                        <li key={meet.id}>{meet.title}</li>
                    ))
                ) : (
                    <p>No important meetings selected.</p>
                )}
            </ul>
        </div>
    )
}

export default Important
