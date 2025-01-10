import { IoIosArrowDown } from "react-icons/io";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {useState} from 'react'

const EventList = (currentDate, currentMonth, currentYear) => {
  
    

  return (
    <div className='w-[30%]'>
                <div className='flex items-center justify-between text-center'>
                    <h1 className='text-2xl font-semibold'>Today</h1>
                    <button className='text-3xl font-semibold'>+</button>
                </div>
                <Separator className='w-full h-[2px] bg-black' />
                <ScrollArea className="h-full w-full p-4">
                    <div className='w-full h-12 p-3 rounded-lg bg-blue-300'>
                        <div className='flex justify-between items-center w-full h-full'>
                            <p>Task</p>
                            <IoIosArrowDown />
                        </div>
                        <div className='hidden'>
                            <div>
                                Start time:
                                <input type="time" className='bg-transparent mx-3' />
                            </div>
                            <div>
                                End time:
                                <input type="time" className='bg-transparent mx-4' />
                            </div>
                            <div>
                                Description:
                                <p>vfjlckhgcjhxyfgckghmv hlfukycvbhj f lkuyfhvhv</p>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
  
  )
}

export default EventList