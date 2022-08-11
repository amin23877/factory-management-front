import React, { Suspense, useEffect, useState } from "react";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { Tabs, Tab, Box, ListItem, IconButton } from "@material-ui/core";

import TasksTable from "features/Production/Task/Tasks";
import TasksListTable from "features/Production/Task/TasksList";
import TasksListDetail from "pages/Production/Tasks/TaskList/Details";
import { BasePaper } from "app/Paper";
import Confirm from "common/Confirm";

import { deleteTaskList } from "api/taskList";
import List from "app/SideUtilityList";
import Toast from "app/Toast";
import AddTaskListModal from "features/Production/Task/TasksList/AddModal";
import { LockProvider } from "common/Lock";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

function Index() {
  const history = useHistory();
  const location = useLocation();

  const tabs = ["task", "tasklist", "details"];
  const taskId = location.pathname.split("/")[5];

  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/").length === 6 ? 2 : tabs.indexOf(location.pathname.split("/")[4])
  );
  const [addTaskListModal, setAddTaskListModal] = useState(false);
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    if (location.pathname.split("/")[4]) {
      if (location.pathname.split("/").length === 6) {
        setActiveTab(2);
      } else {
        setActiveTab(tabs.indexOf(location.pathname.split("/")[4]));
      }
    }
  }, [location]);

  useEffect(() => {
    console.log(window.location.search);
  }, [window.location.search]);

  const handleDelete = () => {
    Confirm({
      onConfirm: async () => {
        try {
          if (taskId) {
            await deleteTaskList(taskId);
            Toast("Record deleted", "success");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setRefresh((p) => p + 1);
          history.push("/panel/production/tasks/taskList");
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
              history.push("/panel/production/tasks/" + tabs[nv]);
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
              disabled={activeTab !== 2}
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                </span>
              }
            />
          </Tabs>
          <div style={{ flexGrow: 1 }} />
          {true && (
            <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", margin: "5px" }}>
              <>
                <ListItem>
                  <IconButton title="Add" onClick={() => setAddTaskListModal(true)}>
                    <AddRounded />
                  </IconButton>
                </ListItem>
                {activeTab === 2 && (
                  <ListItem>
                    <IconButton title="Delete" onClick={() => taskId && handleDelete()}>
                      <DeleteRounded />
                    </IconButton>
                  </ListItem>
                )}
              </>
            </List>
          )}
        </Box>
        <Suspense fallback={<MyBackdrop />}>
          <Switch>
            <Route exact path="/panel/production/tasks">
              <Redirect to="/panel/production/tasks/task" />
            </Route>
            <Route exact path="/panel/production/tasks/task">
              <TasksTable
              //   onRowSelected={(u) => {
              //     setSelectedTaskList(null);
              //     setActiveTab(2);
              //     setSelectedTask(u);
              //   }}
              />
            </Route>
            <Route exact path="/panel/production/tasks/tasklist">
              <TasksListTable
                refresh={refresh}
                onRowSelected={(t) => {
                  history.push(`/panel/production/tasks/taskList/${t.id}`);
                }}
              />
            </Route>
            <Route exact path="/panel/production/tasks/task/:taskId">
              {/* {activeTab === 2 && selectedTask && <UnitDetails unit={selectedTask} />} */}
            </Route>
            <Route exact path="/panel/production/tasks/taskList/:taskId">
              <LockProvider>
                <TasksListDetail setRefresh={setRefresh} />
              </LockProvider>
            </Route>
          </Switch>
        </Suspense>
      </BasePaper>
    </>
  );
}

export default Index;
