import { NavigateFunction } from "react-router-dom"
import { BreadCrumbsType } from './Types';

export const getCreateMeetingBreadCrumbs = (
    navigate:NavigateFunction) : Array<BreadCrumbsType> => [
    {
        text:"Dashboard",
        href:"#",
        onClick:()=>{navigate("/")}
    },
    {text:"Crear Reunión"}
]

export const getOneonOneMeetingsBreadCrumbs= (
    navigate:NavigateFunction) : Array<BreadCrumbsType> => [
    {
        text:"Dashboard",
        href:"#",
        onClick:()=>{navigate("/")}
    },
    {
        text:"Crear Reunión",
        href:"#",
        onClick:()=>{navigate("/create")}
    },
    {
        text:"Crear Reunión uno a uno",
    }
]


export const getVideoConferenceBreadCrumbs= (
    navigate:NavigateFunction) : Array<BreadCrumbsType> => [
    {
        text:"Dashboard",
        href:"#",
        onClick:()=>{navigate("/")}
    },
    {
        text:"Crear Reunión",
        href:"#",
        onClick:()=>{navigate("/create")}
    },
    {
        text:"Crear Video Conferencia",
    }
]

export const getMyMeetingsBreadCrumbs = (
    navigate:NavigateFunction) : Array<BreadCrumbsType> => [
    {
        text:"Dashboard",
        href:"#",
        onClick:()=>{navigate("/")}
    },
    {
        text:"Mis Reuniones",
    }
]

export const getMeetingsBreadCrumbs = (
    navigate:NavigateFunction) : Array<BreadCrumbsType> => [
    {
        text:"Dashboard",
        href:"#",
        onClick:()=>{navigate("/")}
    },
    {
        text:"Reuniones",
    }
]

