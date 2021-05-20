import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable, DropArg } from "@fullcalendar/interaction";
import Swal from "sweetalert2";

import { BasePaper } from "../app/Paper";

interface ITask {
    title: string;
    id: string;
}

export default function Tasks() {
    const [calendarEvents, setCalendarEvents] = useState([
        {
            title: "Default event",
            start: new Date(),
            // end: new Date().setDate(new Date().getDate() + 1),
            id: "999",
            color: "red",
        },
    ]);
    const [tasks, setTasks] = useState<ITask[]>([]);

    const draggableEvents = useRef<HTMLElement | null>();

    useEffect(() => {
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

    const addEvent = (e: DropArg) => {
        console.log({ title: e.draggedEl.innerHTML, id: e.draggedEl.id, start: e.dateStr as any });
    };

    const handleEventClick = (eventClick: EventClickArg) => {
        Swal.fire({
            title: eventClick.event.title,
            html:
                `<div class="table-responsive">
            <table class="table">
            <tbody>
            <tr >
            <td>Title</td>
            <td><strong>` +
                eventClick.event.title +
                `</strong></td>
            </tr>
            <tr >
            <td>Start Time</td>
            <td><strong>
            ` +
                eventClick.event.start +
                `
            </strong></td>
            </tr>
            </tbody>
            </table>
            </div>`,

            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Remove Event",
            cancelButtonText: "Close",
        }).then((result) => {
            if (result.value) {
                eventClick.event.remove(); // It will remove event from the calendar
                Swal.fire("Deleted!", "Your Event has been deleted.", "success");
            }
        });
    };

    const handleAddTaskClick = () => {
        Swal.fire({
            title: "Task Form",
            html: `<input type="text" id="task-name" class="swal2-input" placeholder="Task name...">`,
            confirmButtonText: "Add",
            focusConfirm: false,
            preConfirm: () => {
                const name = (Swal?.getPopup()?.querySelector("#task-name") as any).value;
                if (!name) {
                    Swal.showValidationMessage(`Please enter name`);
                }
                return { name };
            },
        }).then((result) => {
            if (result.value) {
                const id = String(Math.floor(Math.random() * 100));
                Swal.fire(`Task ${result?.value?.name} added.`.trim());
                setTasks((prev) => [...prev, { title: result.value?.name, id }]);
            }
        });
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
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
                            {tasks.map((e) => (
                                <div className="fc-event" title={e.title} key={e.id} id={e.id}>
                                    {e.title}
                                </div>
                            ))}
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={9}>
                    <BasePaper>
                        <FullCalendar
                            initialView="dayGridMonth"
                            weekends={false}
                            rerenderDelay={10}
                            eventDurationEditable={false}
                            editable={true}
                            droppable={true}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            events={calendarEvents}
                            eventClick={handleEventClick}
                            drop={addEvent}
                            // eventReceive={(e) => console.log(e)}
                        />
                    </BasePaper>
                </Grid>
            </Grid>
        </Container>
    );
}
