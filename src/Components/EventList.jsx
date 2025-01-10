import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"

const EventList = ({ events, selectedDate, handleDeleteEvent }) => {



    return (
        <div className='w-[30%]'>
            <div className='flex items-center justify-between text-center'>
                <h1 className='text-2xl font-semibold'>Task</h1>
            </div>
            <Separator className='w-full h-[2px] bg-black' />
            <ScrollArea className="h-full w-full p-4">
                {selectedDate && events[selectedDate]?.length > 0 ? (
                    <ul className="space-y-4">
                        {events[selectedDate].map((task) => (
                            <li key={task.id} className="p-4 bg-blue-300 rounded shadow-md">
                                <h3 className="font-bold">{task.title}</h3>
                                <p className="text-sm text-gray-600">
                                    {task.startTime} - {task.endTime}
                                </p>
                                <p className="text-gray-700">{task.description}</p>
                                <button
                                    className="text-sm text-red-500 hover:underline"
                                    onClick={() => handleDeleteEvent(task.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No events for this date.</p>
                )}
            </ScrollArea>
        </div>

    )
}

export default EventList