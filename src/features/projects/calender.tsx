import React, { useState, useEffect } from "react";

import { Box } from "@material-ui/core";
import useSWR from "swr";


import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

export default function Calender() {

    const [tasks, setTasks] = useState<any[]>([])
    const [bars, setBars] = useState<any[]>([])

    const { data: calenderData, mutate: mutates } = useSWR("/engineering/project")

    useEffect(() => {

        setTasks([]);
        setBars([]);

        calenderData?.map((i: any, index: number) => {
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
                        // onDoubleClick: () => { setSelectedProject(i) },
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
                        // onDoubleClick: () => { setSelectedProject(i) },
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
                        // onDoubleClick: () => { setSelectedProject(i) },
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
                        // onDoubleClick: () => { setSelectedProject(i) },
                        style: {
                            background: '#32CD32',
                            color: 'black'
                        }

                    }
                }])
            }

        })
    }, [calenderData])

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
        <Box width="75vw" style={{ margin: ' 1px auto' }}>
            <Timeline
                groups={tasks}
                items={bars}
                defaultTimeStart={moment().add(-20, 'day')}
                defaultTimeEnd={moment().add(15, 'day')}
                timeSteps={s}
                minZoom={60 * 60 * 1000 * 24 * 7}
                keys={keys}
            />
        </Box>
    )
}