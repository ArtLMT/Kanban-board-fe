import { TaskCard } from "./index.ts";
// BỎ: import { AddTaskForm } from "./AddTaskForm.tsx"; // Không dùng form inline nữa
import { Button, Icon } from "../atoms";
import type { Task } from "../../types/task";

type StatusProps = {
    id: number;
    title: string;
    color?: string;
    tasks: Task[];
    // SỬA: Hàm này giờ chỉ cần nhận ID cột để biết mở modal cho cột nào
    // (Mình dùng any cho taskData tạm thời để đỡ sửa nhiều file, hoặc bạn xóa taskData đi cũng được)
    onAddTask?: (statusId: number) => void;
    onDeleteTask?: (statusId: number, taskId: number) => void;
    onEditTask?: (task: Task) => void;
};

export const Status = ({
                           id,
                           title,
                           color,
                           tasks,
                           onAddTask,
                           onDeleteTask,
                           onEditTask
                       }: StatusProps) => {
    // BỎ: State quản lý form nội bộ
    // const [isAddingTask, setIsAddingTask] = useState(false);

    // BỎ: Hàm xử lý submit nội bộ
    // const handleAddTaskSubmit = ...

    return (
        <div className="flex-shrink-0 w-80 h-fit bg-gray-100 rounded-lg p-4 border border-gray-200"
             style={{
                 borderColor: '#e5e7eb',
                 borderTopColor: color || '#64748b',
                 borderTopWidth: '10px'
             }}
        >
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="font-bold text-lg text-gray-800">{title}</h2>
                    <p className="text-sm text-gray-500">{tasks?.length || 0} tasks</p>
                </div>

                {/* SỬA NÚT ADD: Bấm cái là gọi onAddTask ngay */}
                <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() => {
                    //     // Gọi hàm này để báo cho BoardContent -> KanbanPage biết là cần mở Modal
                    //     if (onAddTask) {
                    //         onAddTask(id);
                    //     }
                    // }}
                    onClick={() => {
                        onAddTask?.(id)}
                    }
                    className="p-2"
                    title="Add task"
                >
                    <Icon name="plus" size="md" />
                </Button>
            </div>

            {/* BỎ: Khu vực render AddTaskForm */}
            {/* {isAddingTask && (...)} */}

            <div className="space-y-2 min-h-[100px] max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {(!tasks || tasks.length === 0) ? (
                    <div className="flex items-center justify-center h-32 text-gray-400">
                        <p className="text-sm text-center">No tasks yet</p>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={(taskId) => onDeleteTask?.(id, taskId)}
                            onEdit={(updatedTask) => onEditTask?.(updatedTask)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};