import React from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { HomeRounded, ShoppingCartRounded, GpsFixedRounded, BuildRounded, HeadsetMicRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyleBottom = makeStyles({
    root: {
        width: "100vw",
        position: "fixed",
        bottom: 0,
        zIndex: 6,
        boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
        background: "rgb(30,40,50)",
        color: "#9e9e9e",
        "& .Mui-selected": {
            color: "rgb(230,128,49)",
        },
    },
    icon: {
        color: "#9e9e9e",
    },
    selected: {
        color: "rgb(230,128,49)",
    },
});

export default function BottomNav({ value, handleChange }: { value: string; handleChange: any }) {
    const classesBottom = useStyleBottom();

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classesBottom.root}>
            <BottomNavigationAction
                label="Sales"
                value="/panel/sales"
                icon={<ShoppingCartRounded />}
                style={{ marginLeft: "15px" }}
                classes={{ root: classesBottom.icon, selected: classesBottom.selected }}
            />
            <BottomNavigationAction
                label="Inventory"
                value="/panel/inventory"
                icon={<GpsFixedRounded />}
                classes={{ root: classesBottom.icon, selected: classesBottom.selected }}
            />
            <BottomNavigationAction
                label="Home"
                value="/panel/"
                icon={<HomeRounded />}
                classes={{ root: classesBottom.icon, selected: classesBottom.selected }}
            />
            <BottomNavigationAction
                label="Engineering"
                value="/panel/engineering"
                icon={<BuildRounded />}
                classes={{ root: classesBottom.icon, selected: classesBottom.selected }}
            />
            <BottomNavigationAction
                label="Services"
                value="/panel/fieldservice"
                icon={<HeadsetMicRounded />}
                style={{ marginRight: "15px" }}
                classes={{ root: classesBottom.icon, selected: classesBottom.selected }}
            />
        </BottomNavigation>
    );
}
