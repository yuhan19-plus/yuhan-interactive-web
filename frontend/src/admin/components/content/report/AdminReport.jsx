/** 파일생성자 : 오자현
 * 신고관리 컴포넌트
 * 
 * 기능구현 - 오자현
 * - 하위컴포넌트 관리 기능
 */

import React, { useState } from 'react'
import AdminBoardReportList from './AdminBoardReportList';
import AdminReportManagement from './AdminBoardReportManagement';

const AdminReport = () => {
    const [currentView, setCurrentView] = useState('list');
    const [selectReportID, setselectReportID] = useState(null);

    // 신고목록으로 진입
    const handleBackToList = () => {
        setCurrentView('list');
    };

    // 신고처리로 진입
    const handleReportManagement = (reportID) => {
        setselectReportID(reportID);
        setCurrentView('reportManagement');
    };

    return (
        <>
            {currentView === 'list' ? (
                <AdminBoardReportList onReportManagement={handleReportManagement} />
            ) : currentView === 'reportManagement' ? (
                <AdminReportManagement reportID={selectReportID} onCancel={handleBackToList} />
            ) : null}
        </>
    );
}

export default AdminReport