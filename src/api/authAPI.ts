import { mockUsers, type MockUser } from "./mockKanbanData.ts";

const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const mockAuthApi = {
    async login(email: string, password: string): Promise<MockUser> {
        await delay(1000);

        const user = mockUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) {
            throw new Error("Invalid email or password");
        }

        return user;
    },

    async register(
        username: string,
        email: string,
        password: string
    ): Promise<MockUser> {
        await delay(1000);

        const exists = mockUsers.some(
            (u) => u.email === email || u.username === username
        );

        if (exists) {
            throw new Error("User already exists");
        }

        const newUser: MockUser = {
            id: `u${Date.now()}`,
            username,
            email,
            password,
            boardIds: [],
        };

        mockUsers.push(newUser);
        return newUser;
    },
};
