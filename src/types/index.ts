export type Todo = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

export type TodoFilter = 'all' | 'completed' | 'pending';