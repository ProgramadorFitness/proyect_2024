export interface AuthResponse{
    body:{
        accessToken: string;
    };
}

export interface AuthResponseError {
    body:{
        error: string;
    };
}

export interface User{
    username: string;
    password: string;
}