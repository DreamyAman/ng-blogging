export interface IloginResponse {
    success: boolean;
    data: {
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            role: string;
            createdAt: string;
            updatedAt: string;
        };
        accessToken: string;
    };
}
export interface IRequestTokenSuccess {
    success: boolean;
    data: {
        accessToken: string;
    }
}
