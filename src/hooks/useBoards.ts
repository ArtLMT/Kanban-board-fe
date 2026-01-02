import { useState, useEffect, useCallback } from "react";
import { boardApi } from "../api/boardApi";
import type { UIBoard } from "../types/kanban";

export const useBoards = () => {
    const [boards, setBoards] = useState<UIBoard[]>([]);
    const [currentBoardId, setCurrentBoardId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [isCreatingBoard, setIsCreatingBoard] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");

    const currentBoard = boards.find(b => b.id === currentBoardId);

    // const fetchBoards = useCallback(async () => {
    //     setIsLoading(true);
    //     setError(null);
    //     try {
    //         const data = await boardApi.getMyBoards();
    //
    //         const initialUIBoards: UIBoard[] = data.map((b: any) => ({
    //             id: b.id || b.boardId,
    //             boardName: b.boardName || b.title || "Untitled",
    //             statuses: []
    //         }));
    //
    //         setBoards(initialUIBoards);
    //
    //         if (initialUIBoards.length > 0 && !currentBoardId) {
    //             setCurrentBoardId(initialUIBoards[0].id);
    //         }
    //     } catch (err: any) {
    //         console.error("Failed to fetch boards", err);
    //         setError(err.response?.data?.message || "Failed to fetch boards");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }, [currentBoardId]);

    const fetchBoards = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await boardApi.getMyBoards();

            const initialUIBoards: UIBoard[] = data.map((b: any) => ({
                id: b.id || b.boardId,
                boardName: b.boardName || b.title || "Untitled",
                statuses: []
            }));

            setBoards(initialUIBoards);

        } catch (err: any) {
            setError("Failed to fetch boards");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBoards();
    }, [fetchBoards]);

    useEffect(() => {
        if (boards.length > 0 && currentBoardId === null) {
            setCurrentBoardId(boards[0].id);
        }
    }, [boards, currentBoardId]);



    const handleCreateBoard = async () => {
        if (!newBoardName.trim()) return;
        setError(null);
        try {
            const newBoardData = await boardApi.createBoard({ boardName: newBoardName });

            const newUIBoard: UIBoard = {
                id: newBoardData.id || (newBoardData as any).boardId,
                boardName: newBoardData.boardName || (newBoardData as any).title,
                statuses: []
            };

            setBoards(prev => [...prev, newUIBoard]);
            setCurrentBoardId(newUIBoard.id);

            setNewBoardName("");
            setIsCreatingBoard(false);
        } catch (err: any) {
            console.error("Create board failed", err);
            setError(err.response?.data?.message || "Create board failed");
        }
    };

    const handleDeleteBoard = async (id: number) => {
        //TODO: Mốt cái này đổi thành Modal hoặc gì đó để xịn hơn
        if (!window.confirm("Are you sure you want to delete this board?")) return;
        setError(null);
        try {
            await boardApi.deleteBoard(id);

            const newBoards = boards.filter(b => b.id !== id);
            setBoards(newBoards);

            if (currentBoardId === id) {
                setCurrentBoardId(newBoards.length > 0 ? newBoards[0].id : null);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Delete board failed");
        }
    };

    const handleSelectBoard = (id: number) => {
        setCurrentBoardId(id);
        setError(null);
    };

    return {
        boards,
        currentBoard,
        currentBoardId,
        isLoading,
        error,

        isCreatingBoard,
        setIsCreatingBoard,
        newBoardName,
        setNewBoardName,

        handleCreateBoard,
        handleDeleteBoard,
        handleSelectBoard,

        refreshBoards: fetchBoards
    };
};