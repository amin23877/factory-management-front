import React from "react";
import Dialog from "app/Dialog";

import { GeneralForm } from "app/Forms";
import { addRole } from "api/role";

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
  return (
    <Dialog open={open} onClose={onClose} title="Add new role" fullScreen>
      <div>
        <GeneralForm
          addRecord={addRole}
          type="Role"
          setRefresh={setRefresh}
          onClose={onClose}
          initialVals={initialVals}
        />
      </div>
    </Dialog>
  );
};
