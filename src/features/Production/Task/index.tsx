import React, { useState } from "react";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { Tabs, Tab, Box, ListItem, IconButton } from "@material-ui/core";

import TasksTable from "./Tasks";
import TasksListTable from "./TasksList";
import TasksListDetail from "./TasksList/Details";
import { BasePaper } from "app/Paper";
import Confirm from "common/Confirm";

import { deleteTaskList, ITaskList } from "api/taskList";
import { ITask } from "api/task";
import List from "app/SideUtilityList";
import Toast from "app/Toast";
import { mutate } from "swr";
import AddTaskListModal from "./TasksList/AddModal";
import { LockProvider } from "common/Lock";

function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [selectedTaskList, setSelectedTaskList] = useState<ITaskList | null>(null);
  const [addTaskListModal, setAddTaskListModal] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const handleDelete = () => {
    Confirm({
      onConfirm: async () => {
        try {
          if (selectedTaskList && selectedTaskList.id) {
            await deleteTaskList(selectedTaskList.id);

            Toast("Record deleted", "success");
          }
        } catch (error) {
          console.log(error);
        } finally {
          mutate("/task");
          setActiveTab(1);
          setSelectedTaskList(null);
        }
      },
    });
  };

  return (
    <>
      <AddTaskListModal open={addTaskListModal} onClose={() => setAddTaskListModal(false)} setRefresh={setRefresh} />
      <BasePaper>
        <Box display="flex">
          <Tabs
            value={activeTab}
            onChange={(e, nv) => setActiveTab(nv)}
            textColor="primary"
            style={{ marginBottom: "10px" }}
          >
            <Tab
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <ListAltRounded style={{ marginRight: "5px" }} /> Tasks
                </span>
              }
              wrapped
            />
            <Tab
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <ListAltRounded style={{ marginRight: "5px" }} /> Tasks List
                </span>
              }
              wrapped
            />
            <Tab
              disabled={!(selectedTaskList || selectedTask)}
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                </span>
              }
            />
          </Tabs>
          <div style={{ flexGrow: 1 }} />
          {true && (
            <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
              <>
                <ListItem>
                  <IconButton title="Add" onClick={() => setAddTaskListModal(true)}>
                    <AddRounded />
                  </IconButton>
                </ListItem>
                <ListItem>
                  <IconButton
                    title="Delete"
                    onClick={() => selectedTaskList && selectedTaskList?.id && handleDelete()}
                    disabled={!(selectedTask || selectedTaskList)}
                  >
                    <DeleteRounded />
                  </IconButton>
                </ListItem>
              </>
            </List>
          )}
        </Box>
        <div style={activeTab !== 0 ? { display: "none" } : { flex: 1 }}>
          <TasksTable
          //   onRowSelected={(u) => {
          //     setSelectedTaskList(null);
          //     setActiveTab(2);
          //     setSelectedTask(u);
          //   }}
          />
        </div>

        <div style={activeTab !== 1 ? { display: "none" } : { flex: 1 }}>
          <TasksListTable
            refresh={refresh}
            onRowSelected={(t) => {
              setSelectedTask(null);
              setSelectedTaskList(t);
              setActiveTab(2);
            }}
          />
        </div>

        {/* {activeTab === 2 && selectedTask && <UnitDetails unit={selectedTask} />} */}
        {activeTab === 2 && selectedTaskList && (
          <LockProvider>
            <TasksListDetail taskList={selectedTaskList} />
          </LockProvider>
        )}
      </BasePaper>
    </>
  );
}

export default Index;
