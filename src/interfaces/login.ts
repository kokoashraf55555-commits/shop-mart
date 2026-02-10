export interface SuccessLoginResponse {
     message: string,
    user:UserResponse,
    token: string
} 
export interface UserResponse {
     message: string,
    email:string,
    role:string,
    name: string;
 
}

export interface FailedLoginResponse {
     message: string,
     statusMsg:string
    
} 