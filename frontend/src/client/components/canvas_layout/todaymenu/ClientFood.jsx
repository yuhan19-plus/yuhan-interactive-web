/**
 * 파일생성자 - 이정민
 * 기능 구현- 이정민
 * 클라이언트(학생) 이 보는 오늘의메뉴 게시판
 * 
 */
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'; // react-cookie 사용

const ClientFood = () => {
    const [selectedFood, setSelectedFood] = useState(null); // 선택된 음식
    const [foodItems, setFoodItems] = useState([]); // 음식 목록
    const [cookies] = useCookies(['user']); // user 쿠키 가져오기
    const [userRating, setUserRating] = useState(0); // 사용자가 선택한 평점
    const [isRatingLocked, setIsRatingLocked] = useState(true); // 평점이 잠겨있는지 여부

    // 데이터 불러오는 부분
    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await fetch('/api/food'); // 음식 API 엔드포인트
                if (!response.ok) {
                    throw new Error('음식 목록을 불러오는 데 실패했습니다.');
                }
                const data = await response.json();
                setFoodItems(data);
            } catch (error) {
                console.error('음식 데이터를 불러오는 중 오류:', error);
            }
        };

        fetchFoods();
    }, []);

    // 음식 클릭 시 선택된 음식 상태 업데이트 및 평점 잠금 초기화
    const handleMenuClick = (food) => {
        setSelectedFood(food);
        setUserRating(food.foodRating || 0); // 기존 평점 불러오기
        setIsRatingLocked(true); // 평점 수정 잠금 상태로 초기화
    };

    // 별점 표시 및 클릭 핸들러 추가
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    style={{
                        fontSize: '2rem',
                        color: i <= userRating ? 'gold' : 'gray',
                        cursor: isRatingLocked ? 'default' : 'pointer', // 평점 잠긴 경우 클릭 불가
                    }}
                    onClick={() => !isRatingLocked && setUserRating(i)} // 잠기지 않았을 때만 평점 선택 가능
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    // 평점 저장 처리 함수 (로그인한 경우에만 호출)
    const handleSaveRating = async () => {
        if (!cookies.user) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            // 평점 저장 API 호출 (가상의 API로 가정)
            const response = await fetch(`/api/food/rate/${selectedFood.foodID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating: userRating }),
            });
            if (!response.ok) {
                throw new Error('평점 저장에 실패했습니다.');
            }

            alert('평점이 저장되었습니다.');
            setIsRatingLocked(true); // 저장 후 평점 수정 잠금
        } catch (error) {
            console.error('평점 저장 중 오류:', error);
        }
    };

    return (
        <div style={{ height: '100%', overflowY: 'auto', padding: 1 }}>
            <table border="2" style={{ width: '100%', height: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>오늘의 메뉴</th>
                        <th>상세 정보</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ width: '35%', verticalAlign: 'top' }}>
                            <table border="2" style={{ width: '100%', height: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '25%' }}>종 류</th>
                                        <th style={{ width: '75%' }}>이 름</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {['양식', '한식', '일품1', '일품2'].map((type) => (
                                        <tr key={type}>
                                            <td>{type}</td>
                                            <td>
                                                {foodItems
                                                    .filter((item) => item.foodType === type)
                                                    .map((item) => (
                                                        <span key={item.foodID} onClick={() => handleMenuClick(item)}>
                                                            {item.foodName}
                                                        </span>
                                                    )) || '없음'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                        <td style={{ width: '65%', verticalAlign: 'top' }}>
                            <table border="2" style={{ width: '100%', height: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ height: '65%' }}>
                                            <img 
                                                src={selectedFood ? selectedFood.foodImg : '/assets/images/yuhan.png'} 
                                                alt="" 
                                                style={{ 
                                                    width: '200px', 
                                                    height: 'auto', 
                                                    opacity: selectedFood ? 1 : 0.2 
                                                }} 
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ height: '5%' }}>
                                            {selectedFood ? `${selectedFood.foodPrice} 원` : '가격 정보 없음'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ height: '10%' }}>
                                            {renderStars()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ height: '10%' }}>
                                            평점: {userRating || '없음'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ height: '10%' }}>
                                            {/* user 쿠키가 존재하고 평점이 잠겨있지 않다면 저장 버튼 보이기 */}
                                            {cookies.user && !isRatingLocked && (
                                                <button onClick={handleSaveRating}>저장</button>
                                            )}
                                            {/* 평가하기 버튼 - 평점이 잠긴 경우에만 보이기 */}
                                            {cookies.user && isRatingLocked && (
                                                <button onClick={() => setIsRatingLocked(false)}>평가하기</button>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ClientFood;

