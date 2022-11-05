import React, { useState, useEffect } from "react";
import Dialog from "app/Dialog";

import { GeneralForm } from "app/Forms";
import { addRole } from "api/role";
import useSWR from "swr";

export const AddRoleModal = ({
  open,
  onClose,
  setRefresh,
  initialVals,
}: {
  open: boolean;
  onClose: () => void;
  setRefresh: any;
  initialVals?: any;
}) => {
  const { data: apis } = useSWR(initialVals ? `/role/${initialVals.id}/api` : null);

  const [apiArray, setApiArray] = useState();

  useEffect(() => {
    if (apis?.result[0]) {
      let temp = apis.result.map((api: any) => api.apis._id);
      setApiArray(temp);
    }
  }, [apis]);

  return (
    <Dialog open={open} onClose={onClose} title={initialVals ? "Edit Role" : "Add new role"} fullScreen>
      <div>
        {initialVals && apiArray && (
          <GeneralForm
            addRecord={addRole}
            type="Role"
            setRefresh={setRefresh}
            onClose={onClose}
            initialVals={{ ...initialVals, apis: apiArray }}
          />
        )}
        {!initialVals && <GeneralForm addRecord={addRole} type="Role" setRefresh={setRefresh} onClose={onClose} />}
      </div>
    </Dialog>
  );
};
