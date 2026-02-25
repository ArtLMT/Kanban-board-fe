import type { Task } from "../../types/task";
import { Button, Card, Icon } from "../atoms"; // Bỏ Badge nếu không dùng Priority

type TaskCardProps = {
    task: Task;
    onDelete?: (id: number) => void;
    onEdit?: (task: Task) => void;
};

// Hàm priorityVariant tạm thời comment nếu Task mới không có priority
/* const priorityVariant = (priority?: string) => { ... }
*/

export const TaskCard = ({
                             task,
                             onDelete,
                             onEdit
                         }: TaskCardProps) => {
    return (
        <Card
            variant="elevated"
            className="mb-3 cursor-move hover:shadow-md transition-shadow group bg-white p-3"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 flex-1 pr-2 break-words">
                    {task.title}
                </h3>
                <Icon name="drag" size="sm" className="text-gray-400 group-hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
            </div>

            {task.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{task.description}</p>
            )}

            <div className="flex justify-between items-center mt-2">
                {/* Placeholder cho Priority hoặc Status label */}
                <div className="text-xs text-gray-400">
                    ID: {task.id}
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit?.(task)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Edit task"
                    >
                        <Icon name="edit" size="sm" />
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete?.(task.id)}
                        className="p-1 hover:bg-red-100 text-red-500 rounded"
                        title="Delete task"
                    >
                        <Icon name="trash" size="sm" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};