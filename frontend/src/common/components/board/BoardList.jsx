import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Button, Typography, Pagination, InputAdornment, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { ArrowBack } from '@mui/icons-material';

// sidebar에서인지, 관리자인지, 글쓰기에 진입, 글확인에 진입
// 이거 2개로 쪼개야함 일단 test니까 두고있지만 sideboardlist, adminboardlist로 나누기
// 목록정렬 항목필요

const BoardList = ({ mode, onCreatePost, onSelectItem }) => {
    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();
    const pageNum = 8;
    // 전체화면이 화면크기에 따라 제목의 내용 글자수 제한 -> 못생김방지
    const fullScreenWinth = window.screen.width;
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > fullScreenWinth / 2);

    // 일단 지금 개발중이라 번잡스러운것을 축약 
    const isAdmin = mode === 'admin';
    const isSideMode = mode === 'side';

    // 세션이 있다고 가정하고 임시test임  실제로는 세션에서 회원의 정보를 불러와야함
    const [sessionUser, setSessionUser] = useState(null); // useState를 사용하여 sessionUser와 setSessionUser 정의


    // 세션에서 사용자 정보를 불러오는 부분 세션으로 사용자 정보를 활용할 때 사용예정
    useEffect(() => {
        try {
            // 이부분은 세션쿠키에서 user_id를 받아오는 것으로 수정
            // 세션 스토리지에 임시 값 설정
            const testUser = { username: 'testmain' };
            sessionStorage.setItem('user', JSON.stringify(testUser));
            // console.log("세션 스토리지에 저장된 값:", testUser); // 세션에 저장된 값 출력
            const storedUser = sessionStorage.getItem('user');

            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                // console.log("세션에서 불러온 값:", parsedUser); // 세션에서 불러온 값 출력
                setSessionUser(parsedUser);
            } else {
                console.log("세션에서 값을 불러오지 못했습니다.");
            }
        } catch (error) {
            console.error("오류 발생:", error); // 에러 발생 시 출력
        }
    }, []);

    // 삭제는 리스트에서 관리자라면 가능하게 하는 식으로 처리하면 될듯
    const hendleDeleteItem = async (boardId) => {
        // console.log("삭제요청헨들러 진입, board_id", boardId);
        // 삭제하는 것으로 동작하게 백엔드와 연결하기 
        try {
            const response = await fetch(`/api/board/delete/${boardId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("데이터를 삭제하는 것에 실패했습니다.");
            }
        } catch (error) {
            console.error("데이터 삭제하는 중 에러 발생:", error);
        }
        // 삭제 후 리스트로 귀환
        onCancel();
    }


    const handleSearch = async () => {
        // console.log("검색단어", searchQuery) // 검색단어 진입체크
        try {
            const response = await fetch(`/api/board/search/${searchQuery}`);
            const data = await response.json();

            // console.log("데이터여부", data);
            if (data.board) {
                const activeData = data.board.filter(item => item.board_status === 'active');
                // 게시판목록에 데이터 저장
                setDataList(data.board);
                // 활성화된 게시물만 모아서 저장
                setFilteredData(activeData);
                // 페이지의 총 수를 계산하여 저장
                setTotalPages(Math.ceil(activeData.length / pageNum));
            }
        } catch (error) {
            console.error("단어를 검색하는 중 에러 발생:", error);
        }

    };

    const fetchData = async () => {
        try {
            const response = await fetch("/api/board");
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            const data = await response.json();
            const activeData = data.filter(item => item.board_status === 'active');
            setDataList(data);
            setFilteredData(activeData);
            setTotalPages(Math.ceil(activeData.length / pageNum));
        } catch (error) {
            console.error("데이터 불러오는 중 에러 발생:", error);
        }
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageNum;
        const endIndex = startIndex + pageNum;
        return filteredData.slice(startIndex, endIndex);
    };


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSelectItem = (boardId) => {
        onSelectItem(boardId); // 선택된 게시글 ID를 상위 컴포넌트로 전달
    };

    useEffect(() => {
        fetchData();
        const handleResize = () => {
            setIsWideScreen(window.innerWidth < fullScreenWinth / 2);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <BoardLayout>
            <Box sx={{ p: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', alignItems: 'center' }}>
                    <InputBase
                        placeholder="검색할 제목이나 작성자를 입력하세요"
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
                </div>

                <List>
                    <Box sx={{ display: 'flex', fontWeight: 'bold', mb: 2 }}>
                        <Box sx={{ width: isSideMode ? '40%' : '18%' }}>제목</Box>
                        <Box sx={{ width: isSideMode ? '30%' : '15%' }}>작성자</Box>
                        <Box sx={{ width: isSideMode ? '30%' : '17%' }}>작성일</Box>

                        {isAdmin && (
                            <>
                                <Box sx={{ width: '10%' }}>View</Box>
                                <Box sx={{ width: '10%' }}>Like</Box>
                                <Box sx={{ width: '12%' }}>State</Box>
                                <Box sx={{ width: '8%' }}>관리</Box>
                            </>
                        )}
                    </Box>

                    {getCurrentPageData().map((item) => (
                        (isAdmin || item.board_status === 'active') && (
                            <ListItem key={item.board_id} divider>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <Box sx={{ width: isSideMode ? '40%' : '18%' }}>
                                        <ListItemText
                                            primary={isWideScreen ? item.board_title.substring(0, 18) : item.board_title.substring(0, 8)}
                                            onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                            onClick={() => handleSelectItem(item.board_id)}
                                        />
                                    </Box>
                                    <Box sx={{ width: isSideMode ? '30%' : '15%' }}>
                                        <ListItemText
                                            primary={isWideScreen ? item.board_writer : item.board_writer.substring(0, 10)}
                                            onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                            onClick={() => handleSelectItem(item.board_id)}
                                        />
                                    </Box>
                                    <Box sx={{ width: isSideMode ? '30%' : '17%' }}>
                                        <ListItemText
                                            primary={isAdmin
                                                ? isWideScreen
                                                    ? `${new Date(item.board_date).toLocaleDateString()} ${new Date(item.board_date).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}`
                                                    : `${new Date(item.board_date).toLocaleDateString()}`
                                                : new Date(item.board_date).toLocaleDateString()}
                                            onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                            onClick={() => handleSelectItem(item.board_id)}
                                        />
                                    </Box>

                                    {isAdmin && (
                                        <>
                                            <Box sx={{ width: '10%' }}>
                                                <ListItemText primary={`${item.board_view}`} />
                                            </Box>
                                            <Box sx={{ width: '10%' }}>
                                                <ListItemText primary={`${item.board_like}`} />
                                            </Box>
                                            <Box sx={{ width: '12%' }}>
                                                <ListItemText primary={`${item.board_status}`} />
                                            </Box>
                                        </>
                                    )}

                                    {(isAdmin) && (
                                        <Box sx={{ width: '10%', display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="error"
                                                sx={{ marginLeft: '5px' }}
                                                onClick={() => { hendleDeleteItem(item.board_id) }}
                                            >
                                                삭제
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            </ListItem>
                        )
                    ))}
                </List>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, position: 'relative' }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    /><Box sx={{ position: 'absolute', right: 5 }}>
                        <Button variant="contained" color="primary" onClick={onCreatePost}>
                            글작성
                        </Button>
                    </Box>
                </Box>
            </Box>
        </BoardLayout>
    );
};

export default BoardList;

const BoardLayout = styled.div`
    overflow-x: hidden;
    width: 100%;
    box-sizing: border-box;
`;
