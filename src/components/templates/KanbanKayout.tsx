import type { ReactNode } from "react";

type KanbanLayoutProps = {
    sidebar: ReactNode;
    header: ReactNode;
    columnManager: ReactNode;
    board: ReactNode;
};

export const KanbanLayout = ({
                                 sidebar,
                                 header,
                                 columnManager,
                                 board,
                             }: KanbanLayoutProps) => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* VÙNG 1: SIDEBAR */}
            {/* Sidebar tự quản lý width bên trong nó, Layout chỉ tạo chỗ chứa */}
            {sidebar}

            {/* VÙNG 2: CONTENT CHÍNH */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header nằm trên cùng */}
                <header className="bg-white border-b border-gray-200 shadow-sm">
                    {header}
                </header>

                {/* Column Manager nằm ngay dưới Header */}
                <div className="bg-white border-b border-gray-200">
                    {columnManager}
                </div>

                {/* Board (Danh sách cột và task) nằm ở phần còn lại */}
                <main className="flex-1 overflow-auto bg-gray-50">
                    {board}
                </main>
            </div>
        </div>
    );
};