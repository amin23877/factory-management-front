import React, { useState, useMemo, useEffect, Fragment } from "react";
import { Box, Button, Tabs, Tab } from "@material-ui/core";
import { GridColDef, DataGrid } from "@material-ui/data-grid";
import useSWR from "swr";

import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

import AddProjectModal from './Modals'
import Calender from './calender'
import { TaskModal } from "./Modals";


import Table from '../../app/CollapsableTable'
import { BasePaper } from "../../app/Paper";



export default function QuotePanel() {

    const [addProject, setAddProject] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(false);
    const [selectedTask, setSelectedTask] = useState<any>(false);
    const [selectedCalender, setSelectedCalender] = useState<any>(false);
    const [tasks, setTasks] = useState<any[]>([])
    const [bars, setBars] = useState<any[]>([])
    const [formatProject, setFormatProject] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState(0);


    const { data: projects, mutate: mutate } = useSWR("/engineering/project");
    const { data: calenderData, mutate: mutates } = useSWR("/engineering/project/linear")

    const projectCols: GridColDef[] = useMemo(
        () => [
            { field: "name", headerName: "Project", width: 150 },
            { field: "start", headerName: "Start Time", width: 150 },
            { field: "days", headerName: "Days", width: 150 },
            { field: "done", headerName: " % Done", width: 150 },
            { field: "note", headerName: "Note", width: 150 },
            {
                field: "employee",
                headerName: "Employee",
                width: 150,
            },
        ],
        []
    );
    const projectSubCols: GridColDef[] = useMemo(
        () => [
            { field: "name", headerName: "Task", width: 150 },
            { field: "start", headerName: "Start Time", width: 150 },
            { field: "days", headerName: "Days", width: 150 },
            { field: "done", headerName: " % Done", width: 150 },
            { field: "note", headerName: "Note", width: 150 },
            {
                field: "username",
                headerName: "Employee",
                width: 150,
            },
        ],
        []
    );


    useEffect(() => {
        setFormatProject([]);
        setTasks([]);
        setBars([]);
        projects?.map((i: any, index: number) => {
            setFormatProject(prev => [...prev, { ...i, employee: i?.EmployeeId?.username }])
        })
        selectedCalender?.subs?.map((i: any, index: number) => {
            // , subs: [...i.subs, i.subs.map((s: any) => { })]
            if (i.ProjectId) {
                setTasks(prev => [...prev, { id: index, title: i.name }]);
                setBars(prev => [...prev, {
                    id: 2 * index - 1,
                    group: index,
                    title: '',
                    start_time: i.start,
                    end_time: i.start + i.days * i.done / 100 * 86400000,
                    canMove: false,
                    canResize: false,
                    canChangeGroup: false,
                    itemProps: {
                        // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
                        'data-custom-attribute': 'Random content',
                        'aria-hidden': false,
                        onDoubleClick: () => { setSelectedProject(i) },
                        style: {
                            background: '#bbb',
                            color: 'black'
                        }
                    }
                }, {
                    id: 2 * index,
                    group: index,
                    title: i.name,
                    start_time: i.start + i.days * i.done / 100 * 86400000,
                    end_time: i.start + i.days * 86400000,
                    itemProps: {
                        // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
                        'data-custom-attribute': 'Random content',
                        'aria-hidden': false,
                        onDoubleClick: () => { setSelectedProject(i) },
                        style: {
                            color: 'black'
                        }
                    }
                }])
            } else {
                setTasks(prev => [...prev, { id: index, title: i.name }]);
                setBars(prev => [...prev, {
                    id: 2 * index - 1,
                    group: index,
                    title: '',
                    start_time: i.start,
                    end_time: i.start + i.days * i.done / 100 * 86400000,
                    canMove: false,
                    canResize: false,
                    canChangeGroup: false,
                    itemProps: {
                        // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
                        'data-custom-attribute': 'Random content',
                        'aria-hidden': false,
                        onDoubleClick: () => { setSelectedProject(i) },
                        style: {
                            background: '#bbb',
                            color: 'black'
                        }
                    }
                }, {
                    id: 2 * index,
                    group: index,
                    title: i.name,
                    start_time: i.start + i.days * i.done / 100 * 86400000,
                    end_time: i.start + i.days * 86400000,
                    itemProps: {
                        // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
                        'data-custom-attribute': 'Random content',
                        'aria-hidden': false,
                        onDoubleClick: () => { setSelectedProject(i) },
                        style: {
                            background: '#32CD32',
                            color: 'black'
                        }

                    }
                }])
            }

        })
    }, [projects, selectedCalender])

    const keys =
    {
        groupIdKey: 'id',
        groupTitleKey: 'title',
        groupRightTitleKey: 'rightTitle',
        itemIdKey: 'id',
        itemTitleKey: 'title',    // key for item div content
        itemDivTitleKey: 'title', // key for item div title (<div title="text"/>)
        itemGroupKey: 'group',
        itemTimeStartKey: 'start_time',
        itemTimeEndKey: 'end_time',
    }

    const s = {
        second: 0,
        minute: 0,
        hour: 0,
        day: 1,
        month: 1,
        year: 1
    }

    return (
        <Box>
            <AddProjectModal open={addProject} onClose={() => setAddProject(false)} />
            {selectedProject && selectedProject.id &&
                <AddProjectModal open={selectedProject} onClose={() => setSelectedProject(false)} project={selectedProject} />}
            {selectedTask && selectedTask.id &&
                <TaskModal open={selectedTask} onClose={() => setSelectedTask(false)} task={selectedTask} />
            }
            <Box mb={2} display="flex" alignItems="center">
                <Button onClick={() => setAddProject(true)}>Add project</Button>
                <div style={{ flexGrow: 1 }} />
            </Box>
            <BasePaper >
                <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
                    <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                        <Tab label="List" />
                        <Tab label="calender" onClick={() => { setSelectedCalender(false) }} />
                    </Tabs>
                    <div style={{ flexGrow: 1 }} />
                </Box>
                {activeTab === 0 &&
                    <Box flex={1}>

                        {
                            < Table
                                rows={formatProject || []}
                                cols={projectCols}
                                subCols={projectSubCols}
                                onRowSelected={(a) => { setSelectedProject(a) }}
                                onSubRowSelected={(d) => { setSelectedTask(d) }}
                                onCalenderClicked={
                                    (c) => {
                                        setActiveTab(1);
                                        setSelectedCalender(c);
                                    }}
                            />
                        }
                    </Box>
                }
                {activeTab === 1 &&
                    <Box display="flex" alignItems="center" >
                        <Box width="75vw" style={{ margin: ' 1px auto' }}>
                            {selectedCalender ?
                                <Fragment>
                                    <h3> Project : {selectedCalender.name} </h3>
                                    {bars && tasks &&
                                        <Timeline
                                            groups={tasks}
                                            items={bars}
                                            defaultTimeStart={moment().add(-20, 'day')}
                                            defaultTimeEnd={moment().add(15, 'day')}
                                            timeSteps={s}
                                            minZoom={60 * 60 * 1000 * 24 * 7}
                                            keys={keys}
                                        />}
                                </Fragment>
                                :
                                <Fragment>
                                    <h3>All Projects TimeLine</h3>
                                    <Calender />
                                </Fragment>
                            }

                        </Box>
                    </Box>
                }
            </BasePaper>
        </Box >
    );
}
