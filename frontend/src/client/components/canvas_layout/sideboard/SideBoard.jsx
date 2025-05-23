/**
 * 파일생성자 - 오자현 
 * 사이드메뉴의 게시판 관리 컴포넌트
 * 
 * 기능 구현 - 오자현
 * - 하위 컴포넌트 제어 기능
 */

import React, { useState } from 'react';
import SideBoardList from './SideBoardList';
import YuhanBoardInsert from '../../../../common/components/board/YuhanBoardInsert';
import SideBoardPage from './SideBoardPage';
import SideBoardReport from './SideBoardReport';
import YuhanBoardUpdate from '../../../../common/components/board/YuhanBoardUpdate';

const SideBoard = () => {
    const [currentView, setCurrentView] = useState('list');
    const [selectedBoardId, setSelectedBoardId] = useState(null); // 선택된 게시글 ID를 저장하는 상태
    const [selectedBoardTitle, setSelectedBoardTitle] = useState(null)

    // 게시물 작성핸들러
    const handleCreateBoard = () => {
        setCurrentView('insert');
    };

    // 게시글 선택핸들러
    const handleSelectItem = (boardId) => {
        setSelectedBoardId(boardId); // 선택된 게시글 ID를 상태로 저장
        // console.log(boardId)
        setCurrentView('page'); // 페이지 보기로 전환
    };

    // 선택한 게시글 수정 핸들러
    const handleSelectUpdateItem = (boardId) => {
        setSelectedBoardId(boardId); // 선택된 게시글 ID를 상태로 저장
        // console.log(boardId)
        setCurrentView('update'); // 업데이트 페이지 보기로 전환
    };

    // 리스트로 복귀 핸들러
    const handleBackToList = () => {
        setCurrentView('list');
    };

    // 신고 핸들러
    const handleReport = (boardID, boardTitle) => {
        setSelectedBoardId(boardID); // 선택된 게시글 ID를 상태로 저장
        setSelectedBoardTitle(boardTitle);
        setCurrentView('Report');
    };

    return (
        <>
            {currentView === 'insert' ? (
                <YuhanBoardInsert onCancel={handleBackToList} />
            ) : currentView === 'page' ? (
                <SideBoardPage boardId={selectedBoardId} onCancel={handleBackToList} onSelectUpdateItem={handleSelectUpdateItem} handleReportItem={handleReport} />
            ) : currentView === 'update' ? (
                <YuhanBoardUpdate boardId={selectedBoardId} onCancel={handleBackToList} />
            ) : currentView === 'Report' ? (
                <SideBoardReport boardId={selectedBoardId} boardTitle={selectedBoardTitle} onCancel={handleBackToList} />
            ) : (
                <SideBoardList onCreatePost={handleCreateBoard} onSelectItem={handleSelectItem} />
            )}
        </>
    );
};

export default SideBoard;