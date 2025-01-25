import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { setExistingMeeting } from '../redux/meetSlics'
import { FaRegStar } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import axios from 'axios';
export default function Home() {
    let url = ''
    const { meets } = useSelector((state) => { return state.meet })
    const dispatch = useDispatch();
    useEffect(() => {
        fetchMeetings()
    }, []);



    function handleImp(e, id) {
        let newmeets = meets.map(meet => {
            let newmeet = { ...meet }
            if (newmeet.id == id) newmeet.isImportant = !newmeet.isImportant
            return newmeet
        })

        dispatch(setExistingMeeting(newmeets))
    }
    function handledelete(e, id) {
        let newmeets = meets.filter(meet => meet.id !== id)
        axios.delete(`${url}/meet/${id}.json`)

        dispatch(setExistingMeeting(newmeets))
    }


    async function fetchMeetings() {
        try {
            const response = await axios.get(`${url}/meet.json`);
            const tempMeeting = [];
            if (response.data) {
                console.log(response.data)
                for (let key in response.data) {
                    let meeting = {
                        id: key,
                        ...response.data[key]
                    };
                    tempMeeting.push(meeting)
                }
            }
            dispatch(setExistingMeeting(tempMeeting))

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>

            <div className='w-[540px] mx-auto mt-10 '>

                {meets.map((meet) => (


                    <div className='flex items-center justify-between'>

                        <li className='text-xl' key={meet.id}> {meet.title}</li>


                        <div className='flex gap-4'>
                            <button className={`icon ${meet.isImportant ? "red" : ""}`} onClick={(e) => handleImp(e, meet.id)}><FaRegStar /></button>
                            <button className={`icon `} onClick={(e) => handledelete(e, meet.id)}><TiDeleteOutline /></button>
                        </div>

                    </div>

                ))}


            </div>
        </>
    )
}


