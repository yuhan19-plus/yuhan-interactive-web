import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Button, Typography, Pagination, InputAdornment, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

// 목록정렬 항목필요
const SideBoardList = ({ onCreatePost, onSelectItem }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    // console.log("사이드게시판리스트 진입")
    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const pageNum = 8;
    // 전체화면이 화면크기에 따라 제목의 내용 글자수 제한 -> 못생김방지
    const fullScreenWinth = window.screen.width;
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > fullScreenWinth / 2);

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
                        <Box sx={{ width: '40%' }}>제목</Box>
                        <Box sx={{ width: '30%' }}>작성자</Box>
                        <Box sx={{ width: '30%' }}>작성일</Box>
                    </Box>

                    {getCurrentPageData().map((item) => (
                        (item.board_status === 'active') && (
                            <ListItem key={item.board_id} divider>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <Box sx={{ width: '40%' }}>
                                        <ListItemText
                                            primary={isWideScreen ? item.board_title.substring(0, 18) : item.board_title.substring(0, 8)}
                                            onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                            onClick={() => handleSelectItem(item.board_id)}
                                        />
                                    </Box>
                                    <Box sx={{ width: '30%' }}>
                                        <ListItemText
                                            primary={isWideScreen ? item.board_writer : item.board_writer.substring(0, 10)}
                                            onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                            onClick={() => handleSelectItem(item.board_id)}
                                        />
                                    </Box>
                                    <Box sx={{ width: '30%' }}>
                                        <ListItemText
                                            primary={isWideScreen
                                                ? `${new Date(item.board_date).toLocaleDateString()} ${new Date(item.board_date).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}`
                                                : `${new Date(item.board_date).toLocaleDateString()}`}
                                            onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                            onClick={() => handleSelectItem(item.board_id)}
                                        />
                                    </Box>

                                    {
                                        // <>
                                        //     <Box sx={{ width: '10%' }}>
                                        //         <ListItemText primary={`${item.board_view}`} />
                                        //     </Box>
                                        //     <Box sx={{ width: '10%' }}>
                                        //         <ListItemText primary={`${item.board_like}`} />
                                        //     </Box>
                                        //     <Box sx={{ width: '12%' }}>
                                        //         <ListItemText primary={`${item.board_status}`} />
                                        //     </Box>
                                        // </>
                                    }


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
                    />
                    {cookies.user &&
                        <Box sx={{ position: 'absolute', right: 5 }}>
                            <Button variant="contained" color="primary" onClick={onCreatePost}>
                                글작성
                            </Button>
                        </Box>
                    }
                </Box>
            </Box>
        </BoardLayout>
    );
};

export default SideBoardList;

const BoardLayout = styled.div`
    overflow-x: hidden;
    width: 100%;
    box-sizing: border-box;
`;
