/** 파일생성자 : 임성준
 * 게시판관리 루트 컴포넌트 - 임성준
 * 기능구현 - 오자현
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import YuhanBoardUpdatePage from '../../../../common/components/board/YuhanBoardUpdatePage';
import YuhanBoardInsert from '../../../../common/components/board/YuhanBoardInsert';
import AdminBoardList from './AdminBoardList';
import AdminBoardReportList from '../report/AdminBoardReportList';
import AdminReportManagement from '../report/AdminBoardReportManagement';
import AdminBoardPage from './AdminBoardPage';

const AdminBoard = () => {
    const [currentView, setCurrentView] = useState('list');
    const [selectedBoardId, setSelectedBoardId] = useState(null); // 선택된 게시글 ID를 저장하는 상태
    const [selectReportID, setselectReportID] = useState(null);

    const handleCreatePost = () => {
        setCurrentView('insert');
    };

    const handleSelectItem = (boardId) => {
        setSelectedBoardId(boardId); // 선택된 게시글 ID를 상태로 저장
        // console.log(boardId)
        setCurrentView('page'); // 페이지 보기로 전환
    };

    const handleSelectUpdateItem = (boardId) => {
        setSelectedBoardId(boardId); // 선택된 게시글 ID를 상태로 저장
        // console.log(boardId)
        setCurrentView('update'); // 업데이트 페이지 보기로 전환
    };

     // 목록으로 진입
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
                <YuhanBoardUpdatePage boardId={selectedBoardId} onCancel={handleBackToList} />
            ) : (
                <AdminBoardList onCreatePost={handleCreatePost} onSelectItem={handleSelectItem}/>
            )}
        </>
    );
}

export default AdminBoard