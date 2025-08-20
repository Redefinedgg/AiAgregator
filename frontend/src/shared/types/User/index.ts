export interface User {
    id: string;
    uuid: string;
    nickname: string;
    email: string;
    balance: number;
    updatedAt: Date;
    createdAt: Date;
}

export default User;