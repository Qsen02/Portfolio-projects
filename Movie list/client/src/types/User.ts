export type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    accessToken: string,
    profileImage: string
}

export type UserContextType = {
    user: User | null;
    setUserState: (user: User) => void;
    clearUserState: (() => Promise<void>);
}