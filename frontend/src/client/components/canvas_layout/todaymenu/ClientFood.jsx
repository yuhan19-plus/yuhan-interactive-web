/**
 * 파일생성자 - 이정민
 * 기능 구현- 이정민
 * 클라이언트(학생) 이 보는 오늘의메뉴 게시판
 * 
 */
import { Button, Grid, Typography } from "@mui/material";
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
    const defaultImage = "/assets/images/yuhan.png";
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
            menu.day === day || menu.day === '매일' 
        );
        return filteredMenu;
    };

    const getMenuForSpecialDishes = (type) => {
        return menuData.filter(menu =>
            (menu.foodType === type) &&
            (menu.day === days[selectedDay] || menu.day === '매일') 
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
        const foodID = foodDetails.foodID; 
        const user_id = cookies.user;
    
        // 평점 제출
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
                        text: "평점을 저장할 수 없습니다."
                    });
                }
                return response.text();
            })
            .then((result) => {
                Swal.fire({
                    icon: "success",
                    title: "성공!",
                    text: "저장에 성공했습니다!"
                });
    
                setRating(0);
                setIsRating(false);
    
                // 평점이 반영된 최신 데이터를 다시 가져옴
                fetchMenuData();
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

                <Grid
                    width={"46.6vw"}
                    height={"6vh"}
                    container
                    sx={{
                        justifyContent: "space-between",
                        background: '#0F275C',
                        borderRadius: 2,
                        boxShadow: 2,
                        marginTop: 2.5
                    }}
                >
                    <Button
                        sx={{ color: "white", fontSize: "22px" }}
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
                        sx={{ color: "white", fontSize: "22px" }}
                        onClick={() => setSelectedDay(prev => (prev === days.length - 1 ? 0 : prev + 1))}
                    >
                        ▶
                    </Button>
                </Grid>

                <BoardSubLayout>
                    <Grid sx={{ background: "white", borderRadius: 2, margin: 1, padding: 1, width: "22vw" }}>

                        <TitleLayout>
                            <Typography>양식</Typography>
                        </TitleLayout>
                        <MenuListLayout>
                            {filteredMenu.filter(menu => menu.foodType === "양식").length > 0 ? (
                                filteredMenu.filter(menu => menu.foodType === "양식").map((menu) => (
                                    <MenuListButton key={menu.foodID} onClick={() => setSelectedFood(menu.foodID)}>
                                        {menu.foodName}
                                    </MenuListButton>
                                ))
                            ) : (
                                <MenuListButton>
                                    <Typography>메뉴 없음</Typography>
                                </MenuListButton>
                            )}
                        </MenuListLayout>
                        <TitleLayout>
                            <Typography>한식</Typography>
                        </TitleLayout>

                        <MenuListLayout>
                            {filteredMenu.filter(menu => menu.foodType === "한식").length > 0 ? (
                                filteredMenu.filter(menu => menu.foodType === "한식").map((menu) => (
                                    <MenuListButton key={menu.foodID} onClick={() => setSelectedFood(menu.foodID)}>
                                        {menu.foodName}
                                    </MenuListButton>

                                ))
                            ) : (
                                <MenuListButton>
                                    <Typography>메뉴 없음</Typography>
                                </MenuListButton>
                            )}
                        </MenuListLayout>

                        <TitleLayout>
                            <Typography>일품1</Typography>
                        </TitleLayout>

                        <MenuListLayout>
                            {getMenuForSpecialDishes("일품1").length > 0 ? (
                                getMenuForSpecialDishes("일품1").map((menu) => (
                                    <MenuListButton key={menu.foodID} onClick={() => setSelectedFood(menu.foodID)}>
                                        {menu.foodName}
                                    </MenuListButton>
                                ))
                            ) : (
                                <MenuListButton>
                                    <Typography>메뉴 없음</Typography>
                                </MenuListButton>
                            )}
                        </MenuListLayout>

                        <TitleLayout>
                            <Typography>일품2</Typography>
                        </TitleLayout>

                        <MenuListLayout>
                            {getMenuForSpecialDishes("일품2").length > 0 ? (
                                getMenuForSpecialDishes("일품2").map((menu) => (
                                    <MenuListButton key={menu.foodID} onClick={() => setSelectedFood(menu.foodID)}>
                                        {menu.foodName}
                                    </MenuListButton>
                                ))
                            ) : (
                                <MenuListButton>
                                    <Typography>메뉴 없음</Typography>
                                </MenuListButton>
                            )}
                        </MenuListLayout>

                    </Grid>

                    <Grid sx={{ background: "white", borderRadius: 2, margin: 1, padding: 1, width: "22.5vw" }}>

                        <TitleLayout>
                            <Typography>이미지</Typography>
                        </TitleLayout>

                        <Grid sx={{ background: "white", borderRadius: 2, boxShadow: 2, marginBottom: 1, marginTop: 1, width: "21.25vw", height: "28vh", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {selectedFood ? (
                                <img
                                    src={`${getFoodDetails(selectedFood)?.foodImg}`}
                                    alt="Food"
                                    style={{
                                        height: getFoodDetails(selectedFood)?.foodImgHeight > getFoodDetails(selectedFood)?.foodImgWidth ? '10vh' : 'auto',
                                        width: getFoodDetails(selectedFood)?.foodImgHeight <= getFoodDetails(selectedFood)?.foodImgWidth ? '10vw' : 'auto',
                                        objectFit: 'contain' // 비율 유지
                                    }}
                                />
                            ) : (
                                <img src={defaultImage} alt="Default" style={{ opacity: "0.3", width: '10vw', height: 'auto' }} />
                            )}
                        </Grid>

                        <TitleLayout>
                            {selectedFood ? <Typography>{getFoodDetails(selectedFood)?.foodPrice}원</Typography> : <Typography>가격</Typography>}
                        </TitleLayout>

                        <Grid sx={{
                            background: "#0F275C",
                            borderRadius: 2,
                            boxShadow: 2,
                            marginTop: 0.5,
                            width: "21.25vw",
                            height: "14vh",
                            textAlign: "center",
                            color: "white"
                        }}>

                            {selectedFood ? (
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                }}>
                                    <Typography>별점: {renderStars(getFoodDetails(selectedFood)?.foodRating)} {getFoodDetails(selectedFood)?.foodRating?.toFixed(1) || '없음'}/5</Typography>
                                    <Button onClick={() => setIsRating(true)}>평가하기</Button>
                                    {isRating && (
                                        <div>
                                            {[...Array(5)].map((_, index) => (
                                                <span
                                                    key={index}
                                                    onClick={() => handleRating(index + 1)}
                                                    style={{ cursor: 'pointer', color: index < ratings ? 'gold' : 'gray' }}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                            {cookies.user ? (
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 10; 
  width: 21.25vw; 
  height: 2.5vh; 
  display: flex; 
  color: white;
  justify-content: center; 
  align-items: center; 
  text-align: center;
`;

const MenuListLayout = styled.div`
  display: flex;
  justify-content: center;
  height: 9vh;
  width: 21.25vw;
  align-items: center; 
`;

const MenuListButton = styled.button`
  background-color: white;
  height: 4vh;
  font-Size: 18px;
  color: black; 
  text-Align: center;
  border: hidden;
`;


