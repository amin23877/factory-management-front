import React, { useState } from "react";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { Tabs, Tab, Box, ListItem, IconButton } from "@material-ui/core";

import TasksTable from "./Tasks";
import TasksListTable from "features/Production/Task/TasksList";
import TasksListDetail from "features/Production/Task/TasksList/Details";
import { BasePaper } from "app/Paper";
import Confirm from "common/Confirm";

import { deleteTaskList, ITaskList } from "api/taskList";
import { ITask } from "api/task";
import List from "app/SideUtilityList";
import Toast from "app/Toast";
import AddTaskListModal from "features/Production/Task/TasksList/AddModal";
import { LockProvider } from "common/Lock";
// import { useHistory } from "react-router-dom";

function Index() {
  //   const history = useHistory();

  //   const tabs = ["tasks", "tasksList", "details"];

  const [activeTab, setActiveTab] = useState(0);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [selectedTaskList, setSelectedTaskList] = useState<ITaskList | null>(null);
  const [addTaskListModal, setAddTaskListModal] = useState(false);
  const [refresh, setRefresh] = useState<number>(0);

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
          setRefresh((p) => p + 1);
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
            onChange={(e, nv) => {
              setActiveTab(nv);
            }}
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
          <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", margin: "5px" }}>
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
          </List>
        </Box>
        {/* <div style={activeTab !== 0 ? { display: "none" } : { flex: 1 }}>
          <TasksTable
          />
        </div> */}
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
        {activeTab === 2 && selectedTaskList && (
          <LockProvider>
            <TasksListDetail taskList={selectedTaskList} setRefresh={setRefresh} />
          </LockProvider>
        )}
      </BasePaper>
    </>
  );
}

export default Index;
