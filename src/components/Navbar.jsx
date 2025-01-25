import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from 'react'
import axios from 'axios'
import { addMeeting } from '../redux/meetSlics'
import { useDispatch } from 'react-redux'

function Navbar() {
    let url = ''
    const [date, setDate] = useState(new Date())
    const dispatch = useDispatch();


    const titleInput = useRef(null)
    const importantInput = useRef(null)

    function handleSubmit() {
        let requestBody = {
            title: titleInput.current.value,
            date: date.toISOString(),
            isImportant: importantInput.current.checked
        }
        console.log(requestBody, importantInput.current.checked)

        axios.post(`${url}/meet.json`, requestBody).then((response) => {
            let meeting = {}
            if (response.data) {
                meeting = {
                    id: response.data.name,
                    ...requestBody
                }
            }
            dispatch(addMeeting(meeting))
            console.log("data saved")

        })
    }
    return (
        <>
            <div>
                <div className="border-b bg-gray-100 border-neutral-100  py-3">
                    <div className='max-w-4xl mx-auto flex items-center justify-between'>
                        <Link to='/' className='text-2xl font-semibold'>Codekaro</Link>
                        <div className="flex gap-4 items-center font-semibold">
                            <Link to='/'>Past meetings</Link>
                            <Link to='/important'>Important</Link>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button className='font-medium' variant="outline">Add meeting</Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Add new meeting</SheetTitle>
                                        <SheetDescription className='text-neutral-700'>
                                            create new meetings with your members . Click save when you're done.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Title
                                            </Label>
                                            <Input ref={titleInput} id="name" placeholder="Meeting Id" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Date
                                            </Label>
                                            {/* <Input id="username" placeholder="Meeting Date" className="col-span-3" /> */}
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "col-span-3 justify-start text-left font-normal",
                                                            !date && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {/* {date instanceof Date && !isNaN(date) ? format(date, "PPP") : <span>Pick a date</span>} */}
                                                        {date ? format(new Date(date), "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                                                    <Select
                                                        onValueChange={(value) =>
                                                            setDate(addDays(new Date(), parseInt(value)))
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent position="popper">
                                                            <SelectItem value="0">Today</SelectItem>
                                                            <SelectItem value="1">Tomorrow</SelectItem>
                                                            <SelectItem value="3">In 3 days</SelectItem>
                                                            <SelectItem value="7">In a week</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <div className="rounded-md border">
                                                        <Calendar mode="single" selected={date} onSelect={setDate} />
                                                    </div>
                                                </PopoverContent>
                                                <div className='flex gap-3 ml-14'>

                                                    <input type="checkbox" ref={importantInput} name="Important" id="" />

                                                    <label className='font-medium' htmlFor="Important">
                                                        Important</label>
                                                </div>
                                            </Popover>

                                        </div>


                                    </div>
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <Button onClick={handleSubmit}>Add Meetings</Button>
                                        </SheetClose>

                                    </SheetFooter>


                                </SheetContent>

                            </Sheet>

                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
