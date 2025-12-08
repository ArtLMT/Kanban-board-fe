import type { Task, Priority } from "../../types/kanban.ts";
import { Button, Card, Badge, Icon } from "../atoms";

type TaskCardProps = {
    task: Task;
    onDelete?: (id: string) => void;
    onEdit?: (task: Task) => void;
};

const priorityVariant = (priority?: Priority) => {
    switch (priority) {
        case 'high':
            return 'error';
        case 'medium':
            return 'warning';
        case 'low':
            return 'success';
        default:
            return 'secondary';
    }
};

const priorityLabel = (priority?: Priority) => {
    switch (priority) {
        case 'high':
            return 'High';
        case 'medium':
            return 'Medium';
        case 'low':
            return 'Low';
        default:
            return 'No Priority';
    }
};

export const TaskCard = ({
    task,
    onDelete,
    onEdit
}: TaskCardProps) => {
    return (
        <Card
            variant="elevated"
            className="mb-3 cursor-move hover:shadow-md transition-shadow group"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 flex-1 pr-2">
                    {task.title}
                </h3>
                <Icon name="drag" size="sm" className="text-gray-400 group-hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {task.description && (
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            )}

            <div className="flex justify-between items-center">
                {task.priority && (
                    <Badge variant={priorityVariant(task.priority)} size="sm">
                        {priorityLabel(task.priority)}
                    </Badge>
                )}
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit?.(task)}
                        className="p-1"
                        title="Edit task"
                    >
                        <Icon name="edit" size="sm" />
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete?.(task.id)}
                        className="p-1"
                        title="Delete task"
                    >
                        <Icon name="trash" size="sm" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

