import Axios from 'axios';

export interface IQuote {
        id?: number | null,
        number?: string,
        
        entryDate: string,
        expireDate: string,
        
        location: string,
        leadTime: string,
        
        salesperson: number | null,
        requester: number | null,
        client: number | null,
        noTaxClient: boolean,
        
        shippingAddress: number | null,
        shippingContact: number | null,
        shippingPhone: number | null,
        shippingEmail: number | null,
        shippingEntitiy: string,
        
        billingContact: number | null,
        billingAddress: number | null,
        billingPhone: number | null,
        billingEmail: number | null,
        billingEntitiy: string,
        
        department: string,
        acctStatus: string,
        creditTerms: string,

        quoteStatus: string,
        
        frieghtTerms: string,
        paymentTerms: string,
        
        depositRequired: boolean,
        deposit: number | null,
        depositAmount: number | null,
        
        estimatedShipDate: string,
        commissionLabel: string,
        
        regularCommission: number | null,
        overageCommission: number | null,
        
        EmployeeId: number | null,
        ProjectId: number | null
}

export interface ILineItem {
    id?: number,
    QuoteId?: number
    index: number,
    ItemId: number,
    description: string,
    quantity: number,
    price: number,
    tax: boolean,
}

export const LineItemInit:ILineItem ={
    index: 0,
    ItemId: 0,
    description: '',
    quantity: 0,
    price: 0,
    tax: false,
}

export const QuoteInit:IQuote = {
    entryDate: "",
    expireDate: "",
    
    location: "",
    leadTime: "",
    
    salesperson: null,
    requester: null,
    client: null,
    noTaxClient: false,
    
    shippingAddress: null,
    shippingContact: null,
    shippingPhone: null,
    shippingEmail: null,
    shippingEntitiy: "",
    
    billingContact: null,
    billingAddress: null,
    billingPhone: null,
    billingEmail: null,
    billingEntitiy: "",
    
    department: "",
    acctStatus: "",
    creditTerms: "",

    quoteStatus: "",
    
    frieghtTerms: "",
    paymentTerms: "",
    
    depositRequired: false,
    deposit: null,
    depositAmount: null,
    
    estimatedShipDate: "",
    commissionLabel: "",
    
    regularCommission: null,
    overageCommission: null,
    
    EmployeeId: null,
    ProjectId: null
}

export const createLineItem = async (qId:number, data:ILineItem) => {
    try {
        const resp = await Axios.post(`/quote/${qId}/line`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const editLineItem = async (id:number, data:ILineItem) => {
    try {
        const resp = await Axios.patch(`/line/${id}`, data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteLineItem = async (id:number) => {
    try {
        const resp = await Axios.delete(`/line/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getLineItems = async (quoteId: number) => {
    try {
        const resp = await Axios.get(`/line`, {params:{QuoteId:quoteId}});
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const getQuotes = async () => {
    try {
        const resp = await Axios.get('/quote');
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const createQuote = async (data:IQuote) => {
    try {
        const resp = await Axios.post('/quote', {...data, 
            entryDate: data.entryDate === "" ? null : new Date(data.entryDate).toISOString(),
            expireDate: data.expireDate === "" ? null : new Date(data.expireDate).toISOString(),
            estimatedShipDate: data.estimatedShipDate === "" ? null : new Date(data.estimatedShipDate).toISOString(),
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateQuote = async (id:number, data:IQuote) => {
    try {
        const resp = await Axios.patch(`/quote/${id}`, {...data, 
            entryDate: data.entryDate === "" ? null : new Date(data.entryDate).toISOString(),
            expireDate: data.expireDate === "" ? null : new Date(data.expireDate).toISOString(),
            estimatedShipDate: data.estimatedShipDate === "" ? null : new Date(data.estimatedShipDate).toISOString(),
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}