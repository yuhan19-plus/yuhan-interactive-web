/**
 * 파일생성 오자현
 */

import React, { useState } from 'react';
import YuhanBoardInsert from './YuhanBoardInsert';
import BoardList from './BoardList';
import YuhanBoardPage from './YuhanBoardPage';
import YuhanBoardUpdatePage from './YuhanBoardUpdatePage';

const SideBoard = () => {
    const [currentView, setCurrentView] = useState('list');
    const [selectedBoardId, setSelectedBoardId] = useState(null); // 선택된 게시글 ID를 저장하는 상태

    const handleCreatePost = () => {
        setCurrentView('insert');
    };

    const handleSelectItem = (boardId) => {
        setSelectedBoardId(boardId); // 선택된 게시글 ID를 상태로 저장
        console.log(boardId)
        setCurrentView('page'); // 페이지 보기로 전환
    }; 
    
    const handleSelectUpdateItem = (boardId) => {
        setSelectedBoardId(boardId); // 선택된 게시글 ID를 상태로 저장
        console.log(boardId)
        setCurrentView('update'); // 업데이트 페이지 보기로 전환
    };

    const handleBackToList = () => {
        setCurrentView('list');
    };

    return (
        <>
            {currentView === 'insert' ? (
                <YuhanBoardInsert onCancel={handleBackToList} />
            ) : currentView === 'page' ? (
                <YuhanBoardPage boardId={selectedBoardId} onBack={handleBackToList} onCancel={handleBackToList} onSelectUpdateItem={handleSelectUpdateItem} />
            ) : currentView === 'update' ? (
                <YuhanBoardUpdatePage boardId={selectedBoardId} onBack={handleBackToList} onCancel={handleBackToList} />
            ) : (
                // <BoardList mode="side" onCreatePost={handleCreatePost} onSelectItem={handleSelectItem} onSelectUpdateItem={handleSelectUpdateItem} />
                <BoardList mode="side" onCreatePost={handleCreatePost} onSelectItem={handleSelectItem} />
            )}
        </>
    );
};

export default SideBoard;