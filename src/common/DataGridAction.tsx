import React from "react";
import { ClearRounded, AddRounded, SearchRounded, EditRounded } from "@material-ui/icons";

import { useLock } from "./Lock";

type iconsType = "delete" | "edit" | "add" | "view";

function Icon({ icon, style }: { icon: iconsType; style?: React.CSSProperties }) {
  switch (icon) {
    case "delete":
      return <ClearRounded style={style} />;
    case "add":
      return <AddRounded style={style} />;
    case "edit":
      return <EditRounded style={style} />;
    case "view":
      return <SearchRounded style={style} />;
    default:
      return <SearchRounded style={style} />;
  }
}

export default function DataGridAction({
  icon,
  activeColor,
  controlledLock,
  onClick,
}: {
  icon: iconsType;
  activeColor?: string;
  controlledLock?: boolean;
  onClick?: () => void;
}) {
  const { lock } = useLock();
  const finalLock = controlledLock !== undefined ? controlledLock : lock;
  const color = activeColor || "#426792";

  return (
    <div onClick={onClick}>
      <Icon
        icon={icon}
        style={{
          fontSize: "1.8rem",
          color: finalLock ? "#ccc" : color,
          cursor: finalLock ? "auto" : "pointer",
        }}
      />
    </div>
  );
}
