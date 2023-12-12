export interface Client {
    id?: number;
    id_number?: number;
    name?: string;
    lastName?: string;
    address?: string;
    email?: string;
    phone?: string;
    phone2?: string;
    state?: string;
    genre?: string;
    city?: string;
    neighborhood?: string;
}

export interface Loan {
    id?: number;
    id_wallet?: number;
    value_initial?: number;
    value_end?: number;
    interest?: number;
    startLoan?: string;
    finishLoan?: string;
    dues?: number;
    duesValue?: number;
    paymentF?: string;
    id_client?: number;
    id_number?: number;
    name?: string;
    lastName?: string;
    address?: string;
    email?: string;
    phone?: string;
    phone2?: string;
    state?: string;
}


export interface Collector {
    id?: number;
    id_number?: number;
    name?: string;
    lastName?: string;
    address?: string;
    email?: string;
    phone?: string;
    phone2?: string;
    state?: string;
    genre?: string;
    city?: string;
    neighborhood?: string;
}
export interface Wallet {
    id?: number;
    value_initial?: number;
    value_end?: number;
    interest?: number;
    id_client?: number;
    id_number?: number;
    name?: string;
    lastName?: string;
    address?: string;
    email?: string;
    phone?: string;
    phone2?: string;
    state?: string;
}