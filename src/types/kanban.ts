export type Priority = 'low' | 'medium' | 'high';

export interface Task {
    id: string;
    title: string;
    description?: string;
    priority?: Priority;
    createdAt?: Date;
    dueDate?: Date;
}

export interface Column {
    id: string;
    title: string;
    tasks: Task[];
}

export type ColumnStatus = 'todo' | 'inprogress' | 'review' | 'done';

export interface Board {
    id: string;
    title: string;
    columns: Column[];
    createdAt?: Date;
}

