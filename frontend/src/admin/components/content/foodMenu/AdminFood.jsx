/** 파일생성자 : 임성준
 * 오늘의 메뉴관리 루트 컴포넌트 - 임성준
 * 기능 작성 - 이정민
 */
import React, { useState } from 'react';
import AdminFoodInsert from '../../../../common/components/TodayMenu/AdminFoodInsert'; // 음식 등록
import AdminFoodUpdate from '../../../../common/components/TodayMenu/AdminFoodUpdate';
import AdminFoodList from './AdminFoodList'; // 음식 목록 보기

const AdminFood = () => {
    const [currentView, setCurrentView] = useState('list');
    const [selectedFood, setSelectedFood] = useState(null);

    const handleCreatePost = () => {
        setCurrentView('insert');
    };

    const handleBackToList = () => {
        setCurrentView('list');
        setSelectedFood(null);
    };

    const handleSelectUpdateItem = (foodID) => {
        setSelectedFood(foodID);
        // console.log(foodID)
        setCurrentView('update');
    };

    return (
        <>
            {currentView === 'insert' ? (
                <AdminFoodInsert onCancel={handleBackToList} />
            ) : currentView === 'update' ? (
                <AdminFoodUpdate foodID={selectedFood} onCancel={handleBackToList} />
            ) : (
                <AdminFoodList onCreatePost={handleCreatePost} onSelectUpdateItem={handleSelectUpdateItem} />
            )}
        </>
    );
};

export default AdminFood;
