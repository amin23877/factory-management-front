import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    Divider,
    Hidden,
    ListItemIcon,
    makeStyles,
    ListItemText,
    useMediaQuery,
} from "@material-ui/core";
import ShopRounded from "@material-ui/icons/ShopRounded";
import ShoppingCartRounded from "@material-ui/icons/ShoppingCartRounded";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import CustomScrollbars from "./CustomScroll";
import { logout } from "../features/Session/sessionsSlice";
import Confirm from "../features/Modals/Confirm";

import phazifyLogo from "../assets/phazify.png";
import phocusLogo from "../assets/logo.png";
import drawerBg from "../assets/sidebar.png";
import { SettingsRounded } from "@material-ui/icons";

const drawerItems = [
    {
        name: "Home",
        link: "/panel",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="inherit" width="17" height="18" viewBox="0 0 17 18">
                <defs>
                    <clipPath id="clip-path">
                        <rect
                            id="Rectangle_6434"
                            data-name="Rectangle 6434"
                            width="17"
                            height="18"
                            transform="translate(0.784 0.249)"
                        />
                    </clipPath>
                </defs>
                <g id="home" transform="translate(-0.784 -0.249)" clip-path="url(#clip-path)">
                    <path
                        id="Path_13072"
                        data-name="Path 13072"
                        d="M17.259,20.8H3.044A2.044,2.044,0,0,1,1,18.756V10.825a.9.9,0,0,1,.915-.915.9.9,0,0,1,.915.915v7.931a.208.208,0,0,0,.214.213H17.259a.208.208,0,0,0,.214-.213V10.825a.915.915,0,0,1,1.83,0v7.931A2.044,2.044,0,0,1,17.259,20.8Z"
                        transform="translate(-0.831 -2.47)"
                    />
                    <path
                        id="Path_13073"
                        data-name="Path 13073"
                        d="M18.39,10.246A.969.969,0,0,1,17.78,10L10.153,3.138,2.527,10a.913.913,0,0,1-1.281-.061.949.949,0,0,1,.061-1.312L9.543,1.247a.928.928,0,0,1,1.22,0L19,8.629a.913.913,0,0,1,.061,1.281A.9.9,0,0,1,18.39,10.246Z"
                        transform="translate(-0.833 -0.976)"
                    />
                    <path
                        id="Path_13074"
                        data-name="Path 13074"
                        d="M13.616,21.151H9.1a.9.9,0,0,1-.915-.915V12.915A.9.9,0,0,1,9.1,12h4.484a.9.9,0,0,1,.915.915v7.321A.874.874,0,0,1,13.616,21.151Zm-3.6-1.83h2.654V13.83H10.017Z"
                        transform="translate(-2.039 -2.822)"
                    />
                </g>
            </svg>
        ),
    },
    {
        name: "Dashboard",
        link: "/panel/dashboard",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18.327"
                height="18.327"
                viewBox="0 0 18.327 18.327"
                fill="inherit"
            >
                <defs>
                    <clipPath id="clip-path">
                        <rect
                            id="Rectangle_6471"
                            data-name="Rectangle 6471"
                            width="18.327"
                            height="18.327"
                            transform="translate(0 0)"
                        />
                    </clipPath>
                </defs>
                <g id="pie-chart" clip-path="url(#clip-path)">
                    <path
                        id="Path_13178"
                        data-name="Path 13178"
                        d="M20.06,10.423H12.337a.9.9,0,0,1-.919-.919V1.719a.951.951,0,0,1,.276-.674A.922.922,0,0,1,12.367.8a9.14,9.14,0,0,1,8.581,8.643.943.943,0,0,1-.889.981Zm-6.8-1.839h5.762a7.368,7.368,0,0,0-5.762-5.823Z"
                        transform="translate(-2.652 -0.8)"
                    />
                    <path
                        id="Path_13179"
                        data-name="Path 13179"
                        d="M9.964,19.18A9.169,9.169,0,0,1,7.7,1.128a.914.914,0,1,1,.429,1.778,7.334,7.334,0,1,0,8.919,8.98.922.922,0,1,1,1.778.49A9.16,9.16,0,0,1,9.964,19.18Z"
                        transform="translate(-0.8 -0.853)"
                    />
                </g>
            </svg>
        ),
    },
    {
        name: "Clients",
        link: "/panel/clients",
        icon: (
            <svg
                id="file-text"
                fill="inherit"
                xmlns="http://www.w3.org/2000/svg"
                width="15.439"
                height="17.877"
                viewBox="0 0 15.439 17.877"
            >
                <defs></defs>
                <path
                    id="Path_470"
                    data-name="Path 470"
                    d="M16.538,18.877H2.9a.881.881,0,0,1-.9-.892V1.892A.881.881,0,0,1,2.9,1h7.569a.881.881,0,0,1,.9.892V7.009h5.166a.881.881,0,0,1,.9.892V17.985A.9.9,0,0,1,16.538,18.877ZM3.8,17.092H15.637v-8.3H10.471a.881.881,0,0,1-.9-.892V2.785H3.8Z"
                    transform="translate(-2 -1)"
                />
                <path
                    id="Path_471"
                    data-name="Path 471"
                    d="M18.284,8.793a.868.868,0,0,1-.631-.268L11.586,2.517a.857.857,0,0,1,0-1.249.877.877,0,0,1,1.262,0l6.068,5.979a.857.857,0,0,1,0,1.249A.8.8,0,0,1,18.284,8.793Z"
                    transform="translate(-3.746 -1)"
                />
                <path
                    id="Path_472"
                    data-name="Path 472"
                    d="M14.181,18.122H6.672a.892.892,0,1,1,0-1.785h7.479a.892.892,0,0,1,.03,1.785Z"
                    transform="translate(-2.707 -3.874)"
                />
                <path
                    id="Path_473"
                    data-name="Path 473"
                    d="M14.181,14.132H6.672a.892.892,0,1,1,0-1.785h7.479a.892.892,0,0,1,.03,1.785Z"
                    transform="translate(-2.707 -3.127)"
                />
                <path
                    id="Path_474"
                    data-name="Path 474"
                    d="M8.564,10.179H6.672a.892.892,0,1,1,0-1.785H8.564a.892.892,0,1,1,0,1.785Z"
                    transform="translate(-2.707 -2.386)"
                />
            </svg>
        ),
    },
    {
        name: "Sales",
        link: "/panel/sales",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="inherit"
                width="19.037"
                height="16.414"
                viewBox="0 0 19.037 16.414"
            >
                <path
                    id="Path_13046"
                    data-name="Path 13046"
                    d="M19.055,18.414H1.95a.938.938,0,0,1-.95-.96V4.528A2.5,2.5,0,0,1,3.5,2H7.62a2.437,2.437,0,0,1,1.964.992l1.394,1.824h6.557a2.52,2.52,0,0,1,2.5,2.528V17.486A.98.98,0,0,1,19.055,18.414ZM2.9,16.494H18.1V7.311a.6.6,0,0,0-.6-.608h-7a.941.941,0,0,1-.76-.384L8.064,4.112a.8.8,0,0,0-.475-.192H3.471a.579.579,0,0,0-.57.608Z"
                    transform="translate(-1 -2)"
                />
            </svg>
        ),
    },
    {
        name: "Purchase",
        link: "/panel/purchase",
        icon: <ShoppingCartRounded />,
    },
    {
        name: "Vendors",
        link: "/panel/vendor",
        icon: <ShopRounded />,
    },
    {
        name: "Inventory",
        link: "/panel/inventory",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="inherit"
                width="15.733"
                height="16.978"
                viewBox="0 0 15.733 16.978"
            >
                <defs>
                    <clipPath id="clip-path">
                        <rect
                            id="Rectangle_6519"
                            data-name="Rectangle 6519"
                            width="15.733"
                            height="16.978"
                            transform="translate(0 0)"
                        />
                    </clipPath>
                </defs>
                <g id="user-check" clip-path="url(#clip-path)">
                    <path
                        id="Path_13306"
                        data-name="Path 13306"
                        d="M2.449,20.732a.834.834,0,0,1-.849-.849V17.45c0-2.83,1.556-4.386,4.386-4.386h4.952c2.83,0,4.386,1.556,4.386,4.386v2.433a.849.849,0,1,1-1.7,0V17.45c0-1.9-.821-2.688-2.688-2.688H5.986c-1.9,0-2.688.821-2.688,2.688v2.433A.851.851,0,0,1,2.449,20.732Z"
                        transform="translate(-1.6 -3.755)"
                    />
                    <path
                        id="Path_13307"
                        data-name="Path 13307"
                        d="M9.2,9.595a4.3,4.3,0,1,1,4.3-4.3A4.3,4.3,0,0,1,9.2,9.595Zm0-6.9a2.6,2.6,0,1,0,2.6,2.6A2.6,2.6,0,0,0,9.2,2.691Z"
                        transform="translate(-2.355 -0.993)"
                    />
                    <path
                        id="Path_13308"
                        data-name="Path 13308"
                        d="M17.451,12.363a.865.865,0,0,1-.566-.2L15.64,11.089a.843.843,0,0,1,1.1-1.273l.623.566,1.613-1.613a.84.84,0,0,1,1.188,1.188l-2.122,2.151A.77.77,0,0,1,17.451,12.363Z"
                        transform="translate(-4.746 -2.714)"
                    />
                </g>
            </svg>
        ),
    },
    {
        name: "Field Service",
        link: "/panel/fieldservice",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="inherit" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
            </svg>
        ),
    },
    {
        name: "Engineering",
        link: "/panel/engineering",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="inherit" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
            </svg>
        ),
    },
    {
        name: "Roles",
        link: "/panel/roles",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="inherit"
                width="15.34"
                height="15.34"
                viewBox="0 0 15.34 15.34"
            >
                <path
                    id="Path_13712"
                    data-name="Path 13712"
                    d="M16.635,3H4.7A1.7,1.7,0,0,0,3,4.7V16.635a1.7,1.7,0,0,0,1.7,1.7H16.635a1.709,1.709,0,0,0,1.7-1.7V4.7A1.7,1.7,0,0,0,16.635,3Zm0,13.635H4.7V6.409H16.635Zm-1.7-5.965H6.409v-1.7h8.522Zm-3.409,3.409H6.409v-1.7h5.113Z"
                    transform="translate(-3 -3)"
                />
            </svg>
        ),
    },
    {
        name: "Production",
        link: "/panel/production",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="inherit"
                width="15.34"
                height="15.34"
                viewBox="0 0 15.34 15.34"
            >
                <path
                    id="Path_13712"
                    data-name="Path 13712"
                    d="M16.635,3H4.7A1.7,1.7,0,0,0,3,4.7V16.635a1.7,1.7,0,0,0,1.7,1.7H16.635a1.709,1.709,0,0,0,1.7-1.7V4.7A1.7,1.7,0,0,0,16.635,3Zm0,13.635H4.7V6.409H16.635Zm-1.7-5.965H6.409v-1.7h8.522Zm-3.409,3.409H6.409v-1.7h5.113Z"
                    transform="translate(-3 -3)"
                />
            </svg>
        ),
    },
    {
        name: "Activity",
        link: "/panel/activity",
        icon: (
            <svg
                id="Group_40201"
                fill="inherit"
                data-name="Group 40201"
                xmlns="http://www.w3.org/2000/svg"
                width="15.302"
                height="15.34"
                viewBox="0 0 15.302 15.34"
            >
                <path
                    id="Path_13713"
                    data-name="Path 13713"
                    d="M2147.037-404.691c-1.053,0-2.107,0-3.161,0a3.95,3.95,0,0,1-4.168-4.038q-.073-3.3,0-6.6a3.984,3.984,0,0,1,4.183-4.073c1.725-.01,3.449,0,5.176,0,.046,0,.092,0,.138,0a.555.555,0,0,1,.58.563.545.545,0,0,1-.6.534c-.092,0-.185,0-.278,0-1.667,0-3.334,0-5,0a2.918,2.918,0,0,0-3.1,2.952c-.007.127-.011.255-.011.382,0,1.957-.005,3.914,0,5.87a5.034,5.034,0,0,0,.092.965,2.744,2.744,0,0,0,2.755,2.33q3.386.041,6.773,0a2.823,2.823,0,0,0,2.846-2.683c.028-.276.039-.555.04-.832,0-1.609,0-3.219,0-4.828,0-.417.212-.665.543-.667s.546.247.546.663c0,1.737.012,3.474-.009,5.21a5.361,5.361,0,0,1-.187,1.335,3.857,3.857,0,0,1-3.752,2.906c-1.135.024-2.27,0-3.4,0Z"
                    transform="translate(-2139.671 420.027)"
                />
                <path
                    id="Path_13714"
                    data-name="Path 13714"
                    d="M2297.058-190.363l1.668-2.153a2.321,2.321,0,0,1,.2-.241.527.527,0,0,1,.724-.067.511.511,0,0,1,.125.738q-1.091,1.44-2.212,2.855c-.211.266-.5.265-.8.033-.586-.452-1.166-.914-1.749-1.371-.09-.07-.183-.136-.3-.219-.336.436-.661.855-.984,1.276-.269.348-.534.7-.805,1.046s-.587.42-.861.2-.275-.526-.021-.859q1.034-1.352,2.075-2.7c.294-.379.56-.406.948-.1C2295.723-191.415,2296.375-190.9,2297.058-190.363Z"
                    transform="translate(-2288.53 198.512)"
                />
                <path
                    id="Path_13715"
                    data-name="Path 13715"
                    d="M2660.749-443.806a1.958,1.958,0,0,1-1.947-2.01,1.975,1.975,0,0,1,1.994-1.935,1.987,1.987,0,0,1,1.953,1.983A1.971,1.971,0,0,1,2660.749-443.806Zm.009-1.1a.873.873,0,0,0,.89-.872.892.892,0,0,0-.862-.873.876.876,0,0,0-.883.88A.859.859,0,0,0,2660.758-444.906Z"
                    transform="translate(-2647.446 447.752)"
                />
            </svg>
        ),
    },
    {
        name: "Projects",
        link: "/panel/Projects",
        icon: (
            <svg
                id="Group_40203"
                fill="inherit"
                data-name="Group 40203"
                xmlns="http://www.w3.org/2000/svg"
                width="15.312"
                height="15.161"
                viewBox="0 0 15.312 15.161"
            >
                <path
                    id="Path_13716"
                    data-name="Path 13716"
                    d="M2018.32,876.012h-5.82a1.179,1.179,0,0,1-1.227-1.231q0-4.051,0-8.1a1.178,1.178,0,0,1,1.252-1.261c.946,0,1.891,0,2.836,0a.254.254,0,0,1,.259.147c.47.826.952,1.645,1.422,2.471a.312.312,0,0,0,.313.187q3.4-.009,6.8,0a1.18,1.18,0,0,1,1.252,1.26q0,2.652,0,5.3a1.184,1.184,0,0,1-1.228,1.231Zm-1.544-2.063c-.008.294.138.405.365.307.208-.09.405-.2.606-.306a1.223,1.223,0,0,1,1.18,0c.18.092.353.2.54.275.1.039.255.07.319.02a.47.47,0,0,0,.1-.32,1.372,1.372,0,0,0-.057-.38,1.354,1.354,0,0,1,.467-1.484,1.554,1.554,0,0,0,.285-.285c.065-.092.149-.237.117-.313a.473.473,0,0,0-.3-.193,5.071,5.071,0,0,0-.562-.086,1.223,1.223,0,0,1-.97-.7c-.091-.187-.178-.377-.279-.559-.15-.27-.363-.27-.51,0-.1.177-.182.361-.269.543a1.234,1.234,0,0,1-1.033.724,3.719,3.719,0,0,0-.544.083c-.1.028-.236.1-.264.185a.4.4,0,0,0,.106.3,6.12,6.12,0,0,0,.442.442,1.214,1.214,0,0,1,.356,1.141C2016.838,873.559,2016.8,873.777,2016.776,873.949Z"
                    transform="translate(-2011.272 -860.851)"
                />
                <path
                    id="Path_13717"
                    data-name="Path 13717"
                    d="M2122.172,754.8V744.33c-.19,0-.365,0-.54,0a3.952,3.952,0,0,1-.6-.029,1.1,1.1,0,0,1-.925-1.1c-.006-.3,0-.6,0-.934h-7.75a.6.6,0,0,0-.662.66q0,1.252,0,2.5v.212h-.566c0-.056-.01-.109-.01-.162q0-1.27,0-2.541a1.18,1.18,0,0,1,1.246-1.248q3.775,0,7.551.005a.476.476,0,0,1,.3.126q1.214,1.195,2.41,2.408a.427.427,0,0,1,.114.271q.009,4.631,0,9.262A1.127,1.127,0,0,1,2122.172,754.8Z"
                    transform="translate(-2107.429 -741.692)"
                />
                <path
                    id="Path_13718"
                    data-name="Path 13718"
                    d="M2171.324,830.09c-1.1,0-2.2,0-3.294,0a.376.376,0,0,1-.255-.065.438.438,0,0,1-.1-.3c.017-.141.143-.2.287-.205h6.624a1.072,1.072,0,0,1,.147,0,.284.284,0,0,1,.269.278.291.291,0,0,1-.273.293,1.131,1.131,0,0,1-.129,0Z"
                    transform="translate(-2161.902 -826.273)"
                />
                <path
                    id="Path_13719"
                    data-name="Path 13719"
                    d="M2170.727,870.016h-3.2c-.049,0-.1,0-.147,0a.3.3,0,0,1-.308-.279.292.292,0,0,1,.31-.294c.393,0,.785,0,1.177,0h5.428a1.267,1.267,0,0,1,.166,0,.283.283,0,0,1,.27.277.29.29,0,0,1-.271.294,1.281,1.281,0,0,1-.147,0Z"
                    transform="translate(-2161.322 -864.726)"
                />
                <path
                    id="Path_13720"
                    data-name="Path 13720"
                    d="M2171.488,909.42c.1-.006.168-.013.233-.013h6.607c.217,0,.353.119.349.294s-.139.28-.344.281c-.564,0-1.129,0-1.693,0-1.54,0-3.08,0-4.62,0a.286.286,0,0,1-.315-.177C2171.653,909.687,2171.576,909.575,2171.488,909.42Z"
                    transform="translate(-2165.577 -903.219)"
                />
            </svg>
        ),
    },
    {
        name: "Settings",
        link: "/panel/Settings",
        icon: <SettingsRounded />,
    },
];

const MainDrawer = ({
    width,
    isOpen,
    onToggle,
    closeThis,
}: {
    width?: number;
    isOpen: boolean;
    onToggle: () => void;
    closeThis: () => void;
}) => {
    const useStyles = makeStyles((theme) => ({
        toolbar: {
            ...theme.mixins.toolbar,
            margin: "0.5em 1em",
        },
        drawerPaper: {
            overflow: "hidden",
            width,
            backgroundImage: `url(${drawerBg})`,
            backgroundPositionX: "center",
            backgroundSize: "cover",
        },
        icon: {
            color: "#500",
        },
    }));

    const dstyle = {
        marginBottom: "4px",
        width: "220px",
    };
    const adstyle = {
        marginTop: "10px",
        marginBottom: "10px",
        width: "210px",
        backgroundColor: "#31479c",
        display: "flex",
        borderRadius: " 0 10px 10px 0",
        height: "40px",
        alignItems: "center",
        paddingTop: "4px",
    };

    const [confirm, setConfirm] = useState(false);
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleLogout} />
            <nav style={{ width, flexShrink: 0 }}>
                <Drawer variant="permanent" style={{ width }} classes={{ paper: classes.drawerPaper }} anchor="left">
                    <div className={classes.toolbar} style={{ backgroundColor: "transparent" }}>
                        <img src={phocusLogo} alt="Phocus" style={{ width: "80%", height: "auto" }} />
                        <div
                            style={{
                                color: "white",
                                position: "absolute",
                                top: "25px",
                                right: "15px",
                                cursor: "pointer",
                            }}
                            onClick={closeThis}
                        >
                            <ChevronLeftIcon />
                        </div>
                    </div>
                    <Divider />
                    <CustomScrollbars style={{ height: 700 }}>
                        <List style={{ marginBottom: "auto", paddingTop: "2px" }}>
                            {drawerItems.map((item, i) => (
                                <div style={location.pathname === item.link ? adstyle : dstyle}>
                                    <Link
                                        key={i}
                                        to={item.link}
                                        style={{ textDecoration: "none", border: "none", outline: "none" }}
                                    >
                                        <ListItem
                                            style={{
                                                padding: "5px 12px",
                                                color: location.pathname === item.link ? "#fff" : "#848484",
                                                fontWeight: location.pathname === item.link ? "bold" : "normal",
                                            }}
                                        >
                                            <ListItemIcon
                                                style={{
                                                    fill: location.pathname === item.link ? "#fff" : "#8e8e8e",
                                                }}
                                                className={location.pathname === item.link ? "Active" : ""}
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText> {item.name} </ListItemText>
                                        </ListItem>
                                    </Link>
                                    {location.pathname === item.link ? (
                                        <div
                                            style={{
                                                backgroundColor: "#fff",
                                                height: "15px",
                                                width: "0px",
                                                marginBottom: "auto",
                                                marginTop: "auto",
                                                border: "1px solid white",
                                                marginLeft: "auto",
                                                marginRight: "10px",
                                                borderRadius: "30%",
                                            }}
                                        ></div>
                                    ) : null}
                                </div>
                            ))}
                        </List>
                    </CustomScrollbars>
                    <div style={dstyle}>
                        <ListItem
                            button
                            onClick={() => setConfirm(true)}
                            style={{
                                width: "100%",
                                paddingLeft: "auto",
                                color: "#848484",
                            }}
                        >
                            <ListItemIcon
                                style={{
                                    color: "#848484",
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#8e8e8e"
                                    viewBox="0 0 639.933 640.649"
                                    width="15.34"
                                    height="15.34"
                                >
                                    <g id="Group_40297" transform="translate(4038.43 136.486)" data-name="Group 40297">
                                        <g
                                            id="Group_40296"
                                            transform="translate(-4038.43 -136.486)"
                                            data-name="Group 40296"
                                        >
                                            <path
                                                id="Path_13746"
                                                transform="translate(4008.62 136.486)"
                                                d="M -3369.05 186.763 c 0 60.525 0.1 121.051 -0.024 181.575 c -0.166 81.326 -54.063 135.587 -134.886 135.695 q -152.429 0.2 -304.859 0.032 c -82.268 -0.133 -135.587 -53.754 -136.039 -136.38 c -0.1 -17.7 -0.4 -35.41 0.024 -53.1 c 0.508 -20.934 13.875 -34.837 32.322 -34.507 s 31.212 14.334 31.582 35.357 c 0.351 19.979 -0.083 39.973 0.3 59.952 c 0.7 36.534 25.683 63.666 62.235 63.946 q 160.986 1.237 321.985 0.089 c 38.68 -0.268 62.9 -27.533 63.079 -68.38 c 0.333 -74.8 0.123 -149.6 0.132 -224.4 q 0.01 -71.945 -0.021 -143.89 c -0.093 -50.025 -23.613 -74.189 -73.07 -74.3 q -151.576 -0.344 -303.152 -0.057 c -45.861 0.083 -71.152 25.572 -71.373 71.076 c -0.088 18.271 0.3 36.552 -0.152 54.813 c -0.488 19.709 -13.593 33.431 -31.369 33.782 s -31.724 -12.865 -32.216 -32.781 c -0.62 -25.09 -1.227 -50.349 0.883 -75.305 c 5.416 -64.076 56.881 -114.241 121.257 -115.172 q 164.387 -2.377 328.826 -0.29 c 71.52 0.953 123.8 57.1 124.556 130.394 c 0.655 63.944 0.136 127.9 0.136 191.851 Z"
                                                data-name="Path 13746"
                                            />
                                            <path
                                                id="Path_13747"
                                                transform="translate(4038.43 45.974)"
                                                d="M -3737.88 307.674 c -5.419 -0.247 -10.838 -0.7 -16.259 -0.71 q -118.986 -0.213 -237.971 -0.323 c -4.565 -0.005 -9.139 0.136 -13.694 -0.095 c -19.426 -0.983 -32.864 -14.355 -32.626 -32.328 c 0.229 -17.4 13.081 -30.647 31.83 -31.294 c 21.093 -0.727 42.224 -0.443 63.339 -0.448 q 95.872 -0.018 191.745 0.046 c 4.4 0 8.808 -0.509 17.759 -1.063 c -15.19 -15.375 -28.046 -27.729 -40.117 -40.807 c -10.468 -11.342 -11.506 -24.838 -4.155 -38.052 c 7.578 -13.622 20.27 -18.254 35.08 -14.542 a 36.709 36.709 0 0 1 15.832 9.309 q 46.454 45.531 92.167 91.814 c 16.668 16.976 16.536 34.168 -0.157 51.126 q -44.431 45.136 -89.677 89.466 c -16.312 15.994 -35.13 16.947 -48.356 3.474 c -13.676 -13.931 -12.4 -33.6 4.322 -49.807 c 10.964 -10.626 23.116 -20.026 34.736 -29.975 Z"
                                                data-name="Path 13747"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </ListItemIcon>
                            <ListItemText> Logout </ListItemText>
                        </ListItem>
                    </div>
                    {/* <Divider /> */}
                    <div style={{ textAlign: "center" }}>
                        <img
                            alt="Phazify"
                            src={phazifyLogo}
                            style={{ background: "rgba(145, 145, 145, 0.21)", padding: "0 1em", borderRadius: "0.4em" }}
                        />
                    </div>
                </Drawer>
            </nav>
        </>
    );
};

export default function MainNavbar({
    width,
    isOpen,
    onToggle,
    children,
    closeIt,
}: {
    width?: number;
    isOpen: boolean;
    onToggle: () => void;
    children: any;
    closeIt: () => void;
}) {
    return (
        <>
            <MainDrawer onToggle={onToggle} width={width} isOpen={isOpen} closeThis={closeIt} />
            {children}
        </>
    );
}
