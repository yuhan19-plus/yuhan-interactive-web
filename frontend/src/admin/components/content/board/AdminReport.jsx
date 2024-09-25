/** 파일생성자 : 임성준
 * 게시판관리 루트 컴포넌트 - 임성준
 * 기능구현 - 오자현
 */

import React, { useState } from 'react'
import AdminBoardReportList from './AdminBoardReportList';
import AdminReportManagement from './AdminBoardReportManagement';

const AdminReport = () => {
    const [currentView, setCurrentView] = useState('list');
    const [selectedBoardId, setSelectedBoardId] = useState(null); // 선택된 게시글 ID를 저장하는 상태
    const [selectReportID, setselectReportID] = useState(null);

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

    // 신고목록으로 진입
    const handleBackToList = () => {
        setCurrentView('list');
    };

    // 신고처리로 진입
    const handleReportManagement = (reportID) => {
        setselectReportID(reportID);
        // console.log(reportID);
        setCurrentView('reportManagement');
    };

    return (
        <>
            {currentView === 'list' ? (
                <AdminBoardReportList onSelectItem={handleSelectItem}  onReportManagement={handleReportManagement} />
            ) : currentView === 'reportManagement' ? (
                <AdminReportManagement reportID={selectReportID} onCancel={handleBackToList} onReport={handleReport} />
            ) : currentView === 'page'  (
                <AdminBoardPage boardId={selectedBoardId} onCancel={handleBackToList} onSelectUpdateItem={handleSelectUpdateItem} />
            )}
        </>
    );
}

export default AdminReport