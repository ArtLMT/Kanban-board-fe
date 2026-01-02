import { useState } from "react";

import {useBoards} from "./useBoards";
import {useBoardData} from "./useBoardData.ts";

export const useKanban = () => {
    const boardManager = useBoards();
    const boardDataHook = useBoardData(boardManager.currentBoardId);

    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return {
        ...boardManager,

        ...boardDataHook,

        isSidebarOpen,
        setSidebarOpen,

        isLoading: boardManager.isLoading || boardDataHook.isLoading,
        error: boardManager.error || boardDataHook.error
    };
};