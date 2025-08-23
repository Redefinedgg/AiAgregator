export interface User {
    id: string;
    uuid: string;
    username: string;
    email: string;
    balance: number;
    updatedAt: Date;
    createdAt: Date;
}

export default User;