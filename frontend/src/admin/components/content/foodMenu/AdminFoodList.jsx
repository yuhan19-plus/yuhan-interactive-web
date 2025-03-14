/**
 * 파일생성자 - 이정민
 * 기능 구현- 이정민
 * 관리자가 보는 오늘의메뉴 게시판
 * 
 */
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, FormControl, InputAdornment, InputBase, List, ListItem, ListItemText, MenuItem, Pagination, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const AdminFoodList = ({ onCreatePost, onSelectUpdateItem }) => {
    const [cookies] = useCookies(['user']);
    const [foodList, setFoodList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriteria, setSortCriteria] = useState('foodName'); // 기본 정렬 기준
    const pageNum = 8;
    const fullScreenWidth = window.screen.width;
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > fullScreenWidth / 2);

    

    // 서버에서 음식 목록을 가져오는 함수
    const fetchFoods = async () => {
        try {
            const response = await fetch('/api/food'); // 음식 API 엔드포인트로 수정
            if (!response.ok) {
                Swal.fire({
                    icon: "warning",
                    title: "에러",
                    text: "음식을 가져 올 수 없습니다."
                })
            }
            const data = await response.json();
            setFoodList(data);
            setTotalPages(Math.ceil(data.length / pageNum)); // 페이지 수 계산
        } catch (error) {
            Swal.fire({
                icon: "warning",
                title: "에러",
                text: "음식을 가져 올 수 없습니다."
            })
        }
    };

    // 검색 기능 구현
    const handleSearch = async () => {
        if (!searchQuery.trim()) { // 검색어가 비어 있을 때
            Swal.fire({
                icon: "warning",
                title: "입력 오류",
                text: "한 글자 이상 입력해주세요."
            });
            return;
        }
    
        try {
            const response = await fetch(`/api/food/search/${searchQuery}`);
            const data = await response.json();
    
            if (data.length === 0) { // 검색 결과가 없을 때
                Swal.fire({
                    icon: "info",
                    title: "검색 결과 없음",
                    text: "검색된 항목이 없습니다."
                });
            } else {
                setFoodList(data);
                setTotalPages(Math.ceil(data.length / pageNum));
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "에러",
                text: "검색에 실패 했습니다."
            });
        }
    };

    const handleResetList = async () => {
        setSearchQuery(''); // 검색어 초기화
        await fetchFoods(); // 전체 목록 다시 불러오기
    };

    // 현재 페이지 데이터를 정렬하여 가져오는 함수
    const getCurrentPageData = () => {
        if (!Array.isArray(foodList)) {
            return []; // foodList가 배열이 아닐 경우 빈 배열을 반환
        }
    
        const sortedData = [...foodList].sort((a, b) => {
            let compareA = a[sortCriteria];
            let compareB = b[sortCriteria];
    
            // 기본 내림차순 정렬
            if (compareA > compareB) return -1;
            if (compareA < compareB) return 1;
            return 0;
        });
    
        const startIndex = (currentPage - 1) * pageNum;
        const endIndex = startIndex + pageNum;
        return sortedData.slice(startIndex, endIndex);
    };
    // 페이지 변경 처리
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // 컴포넌트가 마운트될 때 음식 목록을 가져옴
    useEffect(() => {
        fetchFoods();
        const handleResize = () => {
            setIsWideScreen(window.innerWidth < fullScreenWidth / 2);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 수정 버튼 클릭 시 호출되는 함수
    const handleUpdateClick = (food) => {
        onSelectUpdateItem(food); // 수정할 음식 항목을 상위 컴포넌트로 전달
    };

    // 삭제 핸들러
    const handleDeleteClick = (foodID) => {
    Swal.fire({
        title: '삭제 확인',
        text: '이 음식을 정말 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/food/delete/${foodID}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    Swal.fire({
                        icon: "warning",
                        title: "에러",
                        text: "음식 삭제에 실패했습니다."
                    });
                } else {
                    Swal.fire(
                        '삭제 완료!',
                        '음식이 성공적으로 삭제되었습니다.',
                        'success'
                    );
                    fetchFoods(); // 삭제 후 음식 목록 새로고침
                }
            } catch (error) {
                Swal.fire({
                    icon: "warning",
                    title: "에러",
                    text: "음식 삭제에 실패했습니다."
                });
            }
        }
    });
};

    return (
        <BoardLayout>
            <Box sx={{ p: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', alignItems: 'center' }}>
                    <InputBase
                        placeholder="검색할 음식명을 입력하세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            width: '50%',
                            marginRight: '10px',
                            padding: '6px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '1rem',
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                    <Button variant="contained" color="primary" onClick={handleSearch}>검색</Button>
                    <Button variant="contained" color="primary" onClick={handleResetList} sx={{ ml: 1 }} >
                    <img src="/assets/images/Reset.png" style={{width:'1vw',height:'2.5vh'}} ></img>
                    </Button>

                    <FormControl sx={{ marginLeft: '1vw', minWidth: 100 }}>
                        <Select
                            value={sortCriteria}
                            onChange={(e) => setSortCriteria(e.target.value)}
                            sx={{ height: '4vh', padding: '0px 8px' }}
                        >
                            <MenuItem value="foodName">이름순</MenuItem>
                            <MenuItem value="foodPrice">가격순</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <List>
                    <Box sx={{background:"#0F275C",
                        color:"white", 
                        display: 'flex',
                        fontSize:"16px", 
                        fontWeight: 'bold', 
                        mb: 2, 
                        p: 2, 
                        boxShadow: 2, 
                        borderRadius: 2, 
                        textAlign: 'center' }}>
                        <Box sx={{ width: '5%' }}>번호</Box>
                        <Box sx={{ width: '20%' }}>이름</Box>
                        <Box sx={{ width: '10%' }}>타입</Box>
                        <Box sx={{ width: '10%' }}>가격</Box>
                        <Box sx={{ width: '15%' }}>평점</Box>
                        <Box sx={{ width: '10%' }}>요일</Box>
                        <Box sx={{ width: '30%' }}>관리</Box>
                    </Box>

                    {getCurrentPageData().map((food, index) => (
                        <ListItem key={food.foodID} divider>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Box sx={{ width: '5%', textAlign: 'center' }}>
                                    <Typography>{(currentPage - 1) * pageNum + (index + 1)}</Typography>
                                </Box>
                                <Box sx={{ width: '20%' ,textAlign:"center"}}>
                                    <ListItemText
                                        primary={isWideScreen ? food.foodName.substring(0, 25) : food.foodName.substring(0, 15)}
                                        onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                        onClick={() => handleUpdateClick(food)} // 수정 버튼 클릭 시 음식 데이터 전달
                                    />
                                </Box>
                                <Box sx={{ width: '10%', textAlign: 'center' }}>
                                    <ListItemText primary={food.foodType} />
                                </Box>
                                <Box sx={{ width: '10%', textAlign: 'center' }}>
                                    <ListItemText primary={food.foodPrice} />
                                </Box>
                                <Box sx={{ width: '15%', textAlign: 'center' }}>
                                    <ListItemText primary={food.foodRating?.toFixed(1) || '없음'} />
                                </Box>
                                <Box sx={{ width: '10%', textAlign: 'center' }}>
                                    <ListItemText primary={food.day} />
                                </Box>
                                <Box sx={{ width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        sx={{marginRight:"5px" }}
                                        onClick={() => handleUpdateClick(food)} // 수정 버튼 클릭 시 음식 데이터 전달
                                    >
                                        수정
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="error"
                                        sx={{ marginRight: '45px'}}
                                        onClick={() => handleDeleteClick(food.foodID)}
                                    >
                                        삭제
                                    </Button>
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, position: 'relative' }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                    {cookies.user &&
                        <Box sx={{ position: 'absolute', right: 5 }}>
                            <Button variant="contained" color="primary" onClick={onCreatePost}>
                                음식 등록
                            </Button>
                        </Box>
                    }
                </Box>
            </Box>
        </BoardLayout>
    );
};

export default AdminFoodList;

const BoardLayout = styled.div`
    overflow-x: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
