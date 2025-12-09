
import type { Board, Column} from "../types/kanban";

const defaultColumns: Omit<Column, 'id'>[] = [
    { title: "To Do", tasks: [] },
    { title: "In Progress", tasks: [] },
    { title: "Done", tasks: [] },
];

export const createDefaultBoard = (title: string, customId?: string): Board => {
    const boardId = customId || Date.now().toString();
    return {
        id: boardId,
        title,
        columns: defaultColumns.map((col, idx) => ({
            ...col,
            id: `${boardId}_c${idx + 1}`,
        })),
        createdAt: new Date(),
    };
};

export const createDefaultColumn = (title: string, boardId: string): Column => ({
    id: `${boardId}_c_${Date.now()}`,
    title,
    tasks: [],
});

export const mockBoards: Board[] = [
    createDefaultBoard("Frontend Kanban Project","1"),
    createDefaultBoard("Personal Tasks","2"),
];

if (mockBoards[0] && mockBoards[0].columns.length >= 3) {
    mockBoards[0].columns[0].tasks = [
        {
            id: "t1",
            title: "Design landing page",
            description: "Create wireframe and UI",
            priority: "high",
        },
    ];

    mockBoards[0].columns[1].tasks = [
        {
            id: "t2",
            title: "Build Kanban UI",
            priority: "medium",
        },
    ];

    mockBoards[0].columns[2].tasks = [
        {
            id: "t3",
            title: "Setup project",
            priority: "low",
        },
    ];
}

// Board 2 (ID: "2")
if (mockBoards[1] && mockBoards[1].columns.length >= 1) {
    mockBoards[1].columns[0].tasks = [
        {
            id: "t4",
            title: "Learn React DnD",
            priority: "high",
        },
    ];
}
