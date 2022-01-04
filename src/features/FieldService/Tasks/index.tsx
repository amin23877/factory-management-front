import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Paper, Typography, useMediaQuery } from "@material-ui/core";
import FullCalendar, { EventClickArg, EventDropArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable, DropArg } from "@fullcalendar/interaction";

import { BasePaper } from "../../../app/Paper";
import { changeTaskDate, getTasks, ITask } from "../../../api/task";
import TaskModal from "./TaskModal";

export default function Tasks() {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [selectedTask, setSelectedTask] = useState<ITask>();
    const [taskModal, setTaskModal] = useState(false);
    const calendar = useRef<FullCalendar | null>(null);

    const draggableEvents = useRef<HTMLElement | null>();

    const refreshTasks = async (refreshCalendar?: boolean) => {
        try {
            const resp = await getTasks();
            if (resp) {
                setTasks(resp);
                if (refreshCalendar) {
                    const ctasks = resp.filter((t: any) => Boolean(t.deadline));
                    ctasks.forEach((element: any) => {
                        element.title = element.name;
                        element.start = element.deadline;
                    });
                    setCalendarEvents(ctasks);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshTasks(true);

        if (draggableEvents.current) {
            new Draggable(draggableEvents.current, {
                itemSelector: ".fc-event",
                eventData: (eventEl) => {
                    let title = eventEl.getAttribute("title");
                    let id = eventEl.getAttribute("id");
                    return { title, id };
                },
            });
        }
    }, []);

    const addEvent = async (e: DropArg) => {
        try {
            const resp = await changeTaskDate(e.draggedEl.id, e.dateStr);
            if (resp) {
                refreshTasks();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeEventDate = async (e: EventDropArg) => {
        try {
            if (e.event.start?.toString()) {
                await changeTaskDate(e.event.id, e.event.start?.toString());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEventClick = (e: EventClickArg) => {
        console.log(calendar.current?.getApi());
        if (e.event.id) {
            const task = tasks.find((t) => t.id === e.event.id);
            if (task) {
                setSelectedTask(task);
                setTaskModal(true);
            }
        }
    };

    const handleAddTaskClick = () => {
        setSelectedTask(undefined);
        setTaskModal(true);
    };
    const phone = useMediaQuery("(max-width:1200px)");

    return (
        <>
            <TaskModal
                open={taskModal}
                onClose={() => setTaskModal(false)}
                onDone={() => refreshTasks(true)}
                selectedTask={selectedTask}
            />
            <Box display="flex" flexDirection={phone ? "column" : "row"} gridGap={10} maxHeight="calc(100vh - 50px)">
                <Box flex={1}>
                    <Paper
                        style={{
                            borderRadius: 20,
                            padding: "1em",
                            boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                        }}
                    >
                        <Typography variant="h6">Tasks</Typography>
                        <Box my={2} textAlign="center" borderBottom="2px solid #cccc">
                            <Button onClick={handleAddTaskClick}>Add new task</Button>
                        </Box>
                        <div id="external-events" ref={(e) => (draggableEvents.current = e)}>
                            {tasks.map(
                                (e) =>
                                    !e.deadline && (
                                        <div className="fc-event" title={e.name} key={e.id} id={e.id}>
                                            {e.name}
                                        </div>
                                    )
                            )}
                        </div>
                    </Paper>
                </Box>
                <Box flex={11}>
                    <BasePaper>
                        <FullCalendar
                            ref={(e) => (calendar.current = e)}
                            initialView="dayGridMonth"
                            rerenderDelay={10}
                            eventDurationEditable={false}
                            editable={true}
                            droppable={true}
                            plugins={[dayGridPlugin, interactionPlugin]}
                            events={calendarEvents}
                            eventClick={handleEventClick}
                            drop={addEvent}
                            eventDrop={handleChangeEventDate}
                        />
                    </BasePaper>
                </Box>
            </Box>
        </>
    );
}
