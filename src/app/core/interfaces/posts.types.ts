export interface IPosts {
    page: number;
    size: number;
    totalRecords: number;
    data: {
        id: string;
        title: string;
        content: string;
        status: string;
        authorId: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        };
        createdAt: string;
        updatedAt: string;
    }[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
}


export interface IPost {
    success: boolean;
    data: {
        id: string;
        title: string;
        content: string;
        status: string;
        authorId: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        };
        createdAt: string;
        updatedAt: string;
    };
}
