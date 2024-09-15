/** 파일생성자 : 임성준
 * 게시판관리 루트 컴포넌트 - 임성준
 * 기능구현 - 오자현
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import YuhanBoardUpdatePage from '../../../../common/components/board/YuhanBoardUpdatePage';
import YuhanBoardPage from '../../../../common/components/board/YuhanBoardPage';
import YuhanBoardInsert from '../../../../common/components/board/YuhanBoardInsert';
import AdminBoardList from './AdminBoardList';
import AdminBoardReportList from './AdminBoardReportList';
import AdminReportManagement from './AdminBoardReportManagement';

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

    // 신고목록으로 진입
    const handleReport = () => {
        setCurrentView('reportlist');
    };
    // 신고처리로 진입
    const handleReportManagement = (reportID) => {
        setselectReportID(reportID);
        // console.log(reportID);
        setCurrentView('reportManagement');
    };

    return (
        <>
            {currentView === 'insert' ? (
                <YuhanBoardInsert onCancel={handleBackToList} />
            ) : currentView === 'page' ? (
                <YuhanBoardPage boardId={selectedBoardId} onCancel={handleBackToList} onSelectUpdateItem={handleSelectUpdateItem} />
            ) : currentView === 'update' ? (
                <YuhanBoardUpdatePage boardId={selectedBoardId} onCancel={handleBackToList} />
            ) : currentView === 'reportlist' ? (
                <AdminBoardReportList onSelectItem={handleSelectItem} onCancel={handleBackToList} onReportManagement={handleReportManagement} />
            ) : currentView === 'reportManagement' ? (
                <AdminReportManagement reportID={selectReportID} onReport={handleReport} />
            ) : (
                <AdminBoardList onCreatePost={handleCreatePost} onSelectItem={handleSelectItem} onReport={handleReport} />
            )}
        </>
    );
}

export default AdminBoard