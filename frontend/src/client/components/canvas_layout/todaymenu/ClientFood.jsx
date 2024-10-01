/**
 * 파일생성자 - 이정민
 * 기능 구현- 이정민
 * 클라이언트(학생) 이 보는 오늘의메뉴 게시판
 * 
 */
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const ClientFood = () => {
    const [selectedDay, setSelectedDay] = useState(0);
    const [menuData, setMenuData] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [ratings, setRating] = useState(0);
    const [isRating, setIsRating] = useState(false);
    const [cookies] = useCookies(['student']); 
    const defaultImage = "/public/assets/images/yuhan.png";
    const days = ['월', '화', '수', '목', '금'];

    const fetchMenuData = async () => {
        try {
            const response = await fetch('/api/food');
            const data = await response.json();
            setMenuData(data);
        } catch (error) {
            console.error('Error fetching menu data:', error);
        }
    };

    useEffect(() => {
        fetchMenuData();
    }, []);

    const getMenuForDay = (dayIndex) => {
        const day = days[dayIndex];
        const filteredMenu = menuData.filter(menu => 
            menu.day === day || menu.day === '매일'  // 선택된 요일과 매일에 해당하는 음식 필터링
        );
        return filteredMenu;
    };

    const getMenuForSpecialDishes = (type) => {
        return menuData.filter(menu => 
            (menu.foodType === type) && 
            (menu.day === days[selectedDay] || menu.day === '매일') // 매일도 포함
        );
    };

    const filteredMenu = getMenuForDay(selectedDay);

    const getFoodDetails = (foodID) => {
        return menuData.find(menu => menu.foodID === foodID);
    };

    const handleRating = (newRating) => {
        setRating(newRating);
    };

    const submitRating = () => {
        const foodDetails = getFoodDetails(selectedFood);
        const foodID = foodDetails.foodID; // foodID 가져오기
        const user_id = cookies.user;
        
        // 1. 평점 제출
        fetch(`/api/food/ratings/${foodID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ foodID, user_id, ratings }),
        })
        .then((response) => {
            if (!response.ok) {
                Swal.fire({
                    icon: "warning",
                    title: "에러",
                    text:"평점을 저장 할 수 없습니다."
                })
            }
            return response.text();
        })
        .then((result) => {
            Swal.fire({
                icon:"success",
                title:"성공!",
                text:"저장에 성공했습니다!"
            }) // 성공 메시지 출력
    
            // 평점 제출 후 상태 초기화
            setRating(0);
            setIsRating(false);
        })
        .catch((error) => {
            console.error('Error submitting rating:', error);
        });
    };
    
    const renderStars = (rating) => {
        return (
            <>
                {[...Array(5)].map((_, index) => (
                    <span key={index} style={{ color: index < rating ? 'gold' : 'gray' }}>★</span>
                ))}
            </>
        );
    };

    return (
        <BoardLayout>
            <BoardMainLayout>
                <Box>
                    <Grid 
                        width={"46.6vw"}
                        height={"6vh"}
                        container 
                        sx={{
                            justifyContent: "space-between",
                            background: '#0F275C',
                            borderRadius: 2, 
                            boxShadow: 2,
                            marginTop:2.5
                        }}
                    >
                        <Button 
                            sx={{color:"white", fontSize:"22px"}}
                            onClick={() => setSelectedDay(prev => (prev === 0 ? days.length - 1 : prev - 1))}
                        >
                            ◀
                        </Button>
                        <Typography 
                            variant="h5" 
                            color={"white"}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 1
                            }}
                        >
                            {days[selectedDay]}
                        </Typography>
                        <Button 
                            sx={{color:"white", fontSize:"22px"}}
                            onClick={() => setSelectedDay(prev => (prev === days.length - 1 ? 0 : prev + 1))}
                        >
                            ▶
                        </Button>
                    </Grid>

                    <BoardSubLayout>
                        <Grid sx={{ background: "white", borderRadius: 2, margin: 1, padding: 1, width: "22vw" }}>
                            <TitleLayout>
                                <Typography color={"white"}>양식</Typography>
                            </TitleLayout>

                            {filteredMenu.filter(menu => menu.foodType === "양식").length > 0 ? (
                                filteredMenu.filter(menu => menu.foodType === "양식").map((menu) => (
                                    <Button style={{ height: "9vh", fontSize:"20px" ,color:"black"}} key={menu.foodID} onClick={() => setSelectedFood(menu.foodID)}>{menu.foodName}</Button>
                                ))
                            ) : (
                                <Typography style={{ height: "9vh", textAlign: "center"}}>메뉴 없음</Typography>
                            )}

                            <Grid sx={{ background: "#0F275C", justifyContent: 'center', borderRadius: 2, boxShadow: 2, marginBottom: 1, width: "21.25vw", height:"2.5vh", textAlign: "center", color:"white"}}>
                                <Typography>한식</Typography>
                            </Grid>
                            {filteredMenu.filter(menu => menu.foodType === "한식").length > 0 ? (
                                filteredMenu.filter(menu => menu.foodType === "한식").map((menu) => (
                                    <Button style={{height:"9vh",fontSize:"20px" ,color:"black"}} key={menu.foodID} onClick={() => setSelectedFood(menu.foodID)}>{menu.foodName}</Button>
                                ))
                            ) : (
                                <Typography style={{ height: "9vh", textAlign: "center",marginTop:1 }}>메뉴 없음</Typography>
                            )}

                            <Grid sx={{ background: "#0F275C", justifyContent: 'center', borderRadius: 2, boxShadow: 2, marginBottom: 1, width: "21.25vw", height:"2.5vh", textAlign: "center", color:"white" }}>
                                <Typography>일품1</Typography>
                            </Grid>
                            {getMenuForSpecialDishes("일품1").length > 0 ? (
                                getMenuForSpecialDishes("일품1").map((menu) => (
                                    <Button style={{height:"9vh",fontSize:"20px" ,color:"black"}} key={menu.foodID} onClick={() => setSelectedFood(menu.foodID)}>{menu.foodName}</Button>
                                ))
                            ) : (
                                <Typography style={{ height: "9vh", textAlign: "center" }}>메뉴 없음</Typography>
                            )}

                            <Grid sx={{ background: "#0F275C", justifyContent: 'center', borderRadius: 2, boxShadow: 2, marginBottom: 1, width: "21.25vw", height:"5%", textAlign: "center", color:"white" }}>
                                <Typography>일품2</Typography>
                            </Grid>
                            {getMenuForSpecialDishes("일품2").length > 0 ? (
                                getMenuForSpecialDishes("일품2").map((menu) => (
                                    <Button style={{height:"9vh",fontSize:"20px" ,color:"black"}} key={menu.foodID} onClick={() => setSelectedFood(menu.foodID)}>{menu.foodName}</Button>
                                ))
                            ) : (
                                <Typography style={{ height: "9vh", textAlign: "center" }}>메뉴 없음</Typography>
                            )}
                        </Grid>

                        <Grid sx={{ background: "white", borderRadius: 2, margin: 1, padding: 1,width: "22.5vw",height:"51.5vh"}}>
                            <Grid sx={{ background: "#0F275C", borderRadius: 2, boxShadow: 2, marginBottom: 1, width: "21.75vw", height:"2.5vh", textAlign: "center" , color:"white"}}>
                                <Typography>이미지</Typography>
                            </Grid>
                            <Grid sx={{ background: "white", borderRadius: 2, boxShadow: 2, marginBottom: 1, width: "21.75vw", height:"28vh", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {selectedFood ? (
                                    <img src={`${getFoodDetails(selectedFood)?.foodImg}`} alt="Food" style={{ width: '10vw', height: 'auto' }} />
                                ) : (
                                    <img src={defaultImage} alt="Default" style={{opacity:"0.3", width: '10vw', height: 'auto' }} />
                                )}
                            </Grid>
                            <Grid sx={{ background: "#0F275C", borderRadius: 2, boxShadow: 2, marginBottom: 1, width: "21.75vw", height:"2.5vh", textAlign: "center",color:"white"}}>
                                {selectedFood ? <Typography>{getFoodDetails(selectedFood)?.foodPrice}원</Typography> : <Typography>가격</Typography>}
                            </Grid>
                            <Grid sx={{ background: "#0F275C", borderRadius: 2, boxShadow: 2, marginBottom: 0.5, width: "21.75vw", height:"14vh", textAlign: "center", color:"white"}}>
                                {selectedFood ? (
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                        <Typography>별점: {renderStars(getFoodDetails(selectedFood)?.foodRating)} {getFoodDetails(selectedFood)?.foodRating?.toFixed(1) || '없음'}/5</Typography>
                                        {/* 평가하기 버튼 클릭 시 별점 선택 UI 나타나기 */}
                                        <Button onClick={() => setIsRating(true)}>평가하기</Button>
                                        {isRating && (
                                            <div>
                                                {/* 별점을 클릭하여 선택하는 UI */}
                                                {[...Array(5)].map((_, index) => (
                                                    <span 
                                                    key={index} 
                                                    onClick={() => handleRating(index + 1)} 
                                                    style={{ cursor: 'pointer', color: index < ratings ? 'gold' : 'gray' }}
                                                >
                                                    ★
                                                </span>
                                                ))}
                                                {cookies.user ? ( // 로그인 여부에 따라 저장 버튼 표시
                                                <div>
                                                    <Button onClick={submitRating}>저장</Button>
                                                    <Button onClick={() => setIsRating(false)} style={{ marginLeft: '10px' }}>취소</Button>
                                                </div>
                                                    
                                                ) : (
                                                    <Typography style={{ color: 'red' }}>로그인 후 평가할 수 있습니다.</Typography>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Typography>별점</Typography>
                                )}
                            </Grid>
                        </Grid>
                    </BoardSubLayout>
                </Box>
            </BoardMainLayout>
        </BoardLayout>
    );
};

export default ClientFood;

const BoardLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 48vw;
  height: 50vh;
`;

const BoardMainLayout = styled.div`
  width: 46.5vw;
  height: 50vh;
`;

const BoardSubLayout = styled.div`
  background: white; 
  display: flex;
  border-Radius: 12px;
  box-Shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-Top: 10px;
  width: 46.5vw;
  margin-Left:0.1;
  height: 53vh;
  text-Align: center;
`;

const TitleLayout = styled.div`
  background: #0F275C; 
  border-radius: 8px;
  box-shadow: 2px; 
  margin-bottom: 1; 
  width: 21.25vw; 
  height: 2.5vh; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  text-align: center;
`;
