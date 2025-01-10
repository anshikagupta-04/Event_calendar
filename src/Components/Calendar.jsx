import React, { useState } from 'react'
import { Separator } from "@/Components/ui/separator"
import Event from './Event';
import EventList from './EventList';

const Calendar = () => {
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const currentDate = new Date()

    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

    const [selectedDate, setSelectedDate] = useState(currentDate)
    const [showEventPopUp, setShowEventPopUp] = useState(false)

    const [events, setEvents] = useState(() => {
        const savedTasks = localStorage.getItem('calendarTasks');
        return savedTasks ? JSON.parse(savedTasks) : {};
    });

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear))
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear))
    }

    const isWeekend = (day) => {
        const dayOfWeek = (firstDayOfMonth + (day - 1)) % 7;
        return dayOfWeek === 0 || dayOfWeek === 6;
    };

    const isToday = (day) => {
        return (day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear())
    }

    const handleDayClick = (day) => {
        const clickedDate = new Date(currentYear, currentMonth, day)
        const today = new Date()

        setSelectedDate(clickedDate)
        if (clickedDate >= today) {
            console.log(selectedDate);

            setShowEventPopUp(true)
        }

        if (clickedDate.getFullYear === today.getFullYear && clickedDate.getMonth === today.getMonth && clickedDate.getDay === today.getDay && clickedDate.getDate === today.getDate) {
            setShowEventPopUp(true)
        }
    }

    const handleSaveEvent = (newTask, selectedDate) => {
        console.log(selectedDate);
        if (!selectedDate) {
            console.error("Cannot save event without a selected date.");
            return;
        }
        setEvents((prevEvents) => ({
            ...prevEvents,
            [selectedDate]: [...(prevEvents[selectedDate] || []), newTask],
        }));
        console.log(`Updated Events for ${selectedDate}:`, newTask);
        console.log(events);

    };

    const handleDeleteEvent = (taskId) => {
        setEvents((prevEvents) => {
            const updatedEvents = { ...prevEvents };
            updatedEvents[selectedDate] = updatedEvents[selectedDate].filter(task => task.id !== taskId);
            return updatedEvents;
        });
    };

    const isSelectedDay = (day) => {
        return (day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear())
    }

    return (
        <div className='w-[75%] h-auto bg-slate-200 md:flex-col lg:flex-row flex flex-col justify-center p-10 gap-12'>
            <div className='w-[65%] h-[95%] flex flex-col text-center items-center gap-2 text-lg'>
                <h1 className='font-semibold text-5xl self-start mx-6 mb-5 font-serif'>Calender</h1>
                <div className='lg:w-60 w-52 flex items-center justify-between text-center'>
                    <button onClick={prevMonth} className='w-7 h-7 border border-black rounded-full bg-slate-400 text-base'>&lt;</button>
                    <div className='text-center lg:text-2xl text-xl font-medium'>
                        <div>{monthsOfYear[currentMonth]} {currentYear}</div>
                    </div>
                    <button onClick={nextMonth} className='w-7 h-7 border border-black rounded-full bg-slate-400 text-base'>&gt;</button>
                </div>
                <div className="w-full mx-auto p-4 ">
                    <div className="grid grid-cols-7 mb-1">
                        {dayOfWeek.map((day) => <span key={day} className={`flex items-center justify-center py-2 text-base font-semibold text-gray-700 border border-gray-400 rounded ${(day === 'Sun') || (day === 'Sat') ? 'bg-cyan-300 bg-opacity-50' : ''}`}>{day}</span>)}
                    </div>
                    <div className="grid grid-cols-7">
                        {[...Array(firstDayOfMonth).keys()].map((_, index) =>
                            <span key={`empty-${index}`} />
                        )}
                        {[...Array(daysInMonth).keys()].map((day) =>
                            <span key={day + 1} className={`flex flex-col items-end justify-start w-full h-16 p-3 text-base border border-gray-400 rounded 
                                ${isToday(day + 1) ? 'bg-zinc-400' : ''} 
                                ${isSelectedDay(day + 1) ? 'bg-white' : (isWeekend(day + 1) ? 'bg-cyan-100 bg-opacity-50' : '')}
                                 `} onClick={() => { handleDayClick(day + 1) }}>
                                {/* {isWeekend(day+1) && console.log(day+1)} */}
                                {day + 1}
                            </span>
                        )}
                    </div>
                </div>


            </div>
            <Separator className='lg:h-[min(80vw,80vh)] lg:w-[0.8px] md:w-full md:h-[1px] w-full h-[1px] bg-black ' />
            <EventList events={events} selectedDate={selectedDate} handleDeleteEvent={handleDeleteEvent} />
            <Event showEventPopUp={showEventPopUp} onClose={() => setShowEventPopUp(false)} selectedDate={selectedDate} onSave={handleSaveEvent} />
        </div>
    )
}

export default Calendar