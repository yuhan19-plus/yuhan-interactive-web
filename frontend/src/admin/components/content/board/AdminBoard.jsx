/** 
 * 파일생성자 : 임성준
 * 게시판관리 루트 컴포넌트 - 임성준
 * 
 * 기능 구현 - 오자현
 * - 하위 컴포넌트 제어 기능
 */

import React, { useState } from 'react'
import YuhanBoardInsert from '../../../../common/components/board/YuhanBoardInsert';
import AdminBoardList from './AdminBoardList';
import AdminBoardPage from './AdminBoardPage';
import YuhanBoardUpdate from '../../../../common/components/board/YuhanBoardUpdate';

const AdminBoard = () => {
    const [currentView, setCurrentView] = useState('list');
    const [selectedBoardId, setSelectedBoardId] = useState(null); // 선택된 게시글 ID를 저장하는 상태

    // 글작성
    const handleCreateBoard = () => {
        setCurrentView('insert');
    };

    // 게시글진입
    const handleSelectItem = (boardId) => {
        // console.log(boardId)
        setSelectedBoardId(boardId); // 선택된 게시글 ID를 상태로 저장
        setCurrentView('page'); // 페이지 보기로 전환
    };

    // 게시글수정
    const handleSelectUpdateItem = (boardId) => {
        // console.log(boardId)
        setSelectedBoardId(boardId); // 선택된 게시글 ID를 상태로 저장
        setCurrentView('update'); // 업데이트 페이지 보기로 전환
    };

    // 게시판목록
    const handleBackToList = () => {
        setCurrentView('list');
    };

    return (
        <>
            {currentView === 'insert' ? (
                <YuhanBoardInsert onCancel={handleBackToList} />
            ) : currentView === 'page' ? (
                <AdminBoardPage boardId={selectedBoardId} onCancel={handleBackToList} onSelectUpdateItem={handleSelectUpdateItem} />
            ) : currentView === 'update' ? (
                <YuhanBoardUpdate boardId={selectedBoardId} onCancel={handleBackToList} />
            ) : (
                <AdminBoardList onCreatePost={handleCreateBoard} onSelectItem={handleSelectItem} />
            )}
        </>
    );
}

export default AdminBoard