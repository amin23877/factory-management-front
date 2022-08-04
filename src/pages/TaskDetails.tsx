import React, { useEffect, useState } from "react";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { Tabs, Tab, Box, ListItem, IconButton } from "@material-ui/core";

import TasksListTable from "features/Production/Task/TasksList";
import TasksListDetail from "features/Production/Task/TasksList/Details";
import { BasePaper } from "app/Paper";
import Confirm from "common/Confirm";

import { deleteTaskList, ITaskList } from "api/taskList";
import List from "app/SideUtilityList";
import Toast from "app/Toast";
import useSWR, { mutate } from "swr";
import AddTaskListModal from "features/Production/Task/TasksList/AddModal";
import { LockProvider } from "common/Lock";
import { useParams } from "react-router-dom";

function Index() {
  const { taskId } = useParams<{ taskId: string }>();
  const { data: defaultTask } = useSWR<ITaskList>(taskId ? `/task/${taskId}` : null);

  const [activeTab, setActiveTab] = useState(0);
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
          setActiveTab(0);
          setSelectedTaskList(null);
        }
      },
    });
  };

  useEffect(() => {
    if (defaultTask && selectedTaskList === null) {
      setSelectedTaskList(defaultTask);
      setActiveTab(1);
    }
  }, [defaultTask, selectedTaskList]);

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
                  <ListAltRounded style={{ marginRight: "5px" }} /> Tasks List
                </span>
              }
              wrapped
            />
            <Tab
              disabled={!selectedTaskList}
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
                <ListItem>
                  <IconButton
                    title="Delete"
                    onClick={() => selectedTaskList && selectedTaskList?.id && handleDelete()}
                    disabled={!selectedTaskList}
                  >
                    <DeleteRounded />
                  </IconButton>
                </ListItem>
              </>
            </List>
          )}
        </Box>
        <div style={activeTab !== 0 ? { display: "none" } : { flex: 1 }}>
          <TasksListTable
            refresh={refresh}
            onRowSelected={(t) => {
              setSelectedTaskList(t);
              setActiveTab(1);
            }}
          />
        </div>
        {activeTab === 1 && selectedTaskList && (
          <LockProvider>
            <TasksListDetail taskList={selectedTaskList} />
          </LockProvider>
        )}
      </BasePaper>
    </>
  );
}

export default Index;
