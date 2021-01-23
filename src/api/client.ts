import Axios from 'axios';

interface IClient {
    name:string,
    abbr:string,
    location:string,
    refferedBy:string,
    linkedIn:string,
    facebook:string,
    instagram:string,
    website:string,
    prospect: boolean,
    size:"small" | "medium" | "large",
    fax:string,
    parent: number,
    defaultBillingContact?:string,
    preferredCompany:string,
    preferredService:string,
    account:string,
    specialInstructions:string,
    allowedShippingPercentOverUnder: number,
    ClientTypeId:string
}

export const AddClientInit = {
    name:"",
    abbr:"",
    location:"",
    refferedBy:"",
    linkedIn:"",
    facebook:"",
    instagram:"",
    website:"",
    prospect:false,
    size:'small',
    fax:"",
    parent: null,
    preferredCompany:"",
    preferredService:"",
    account:"",
    specialInstructions:"",
    allowedShippingPercentOverUnder:0.0,
    ClientTypeId:""
}

export const getClients = async () => {
    try {
        const resp = await Axios.get('/client');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const addClient = async (clientData:IClient) => {
    try {
        const resp = await Axios.post('/client', clientData);
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export const deleteClient = async (id:number) => {
    try {
        const resp = await Axios.delete(`/client/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const editClient = async (id:number, data:IClient) => {
    try {
        const resp = await Axios.patch(`/client/${id}`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}