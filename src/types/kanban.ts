import type { Board } from "./board";
import type { Status } from "./status";
import type { Task } from "./task";

export interface UIStatus extends Status {
    tasks: Task[];
}

export interface UIBoard extends Board {
    statuses: UIStatus[];
}