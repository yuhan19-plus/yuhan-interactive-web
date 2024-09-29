/**
 * 파일생성자 - 오자현 
 * 기능 구현- 오자현
 * 사이드에서 보이는 게시판 목록 컴포넌트
 */

import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Button, Typography, Pagination, InputAdornment, InputBase, FormControl, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

const SideBoardList = ({ onCreatePost, onSelectItem }) => {
    // console.log("사이드게시판리스트 진입")
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 변수 추가
    const [sortCriteria, setSortCriteria] = useState('board_date'); // 기본 정렬 기준
    const pageNum = 8;
    // 전체화면이 화면크기에 따라 제목의 내용 글자수 제한 -> 못생김방지
    const fullScreenWinth = window.screen.width;
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > fullScreenWinth / 2);



    const handleSearch = async () => {
        // console.log("검색단어", searchQuery) // 검색단어 진입체크
        if (searchQuery === '') {
            fetchData();
        } else {
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
        } finally {
            setLoading(false); // 데이터를 다 불러오면 로딩 상태를 false로 변경
        }
    };

    // 현재 페이지 데이터를 가져옴 (정렬 기준에 따라)
    const getCurrentPageData = () => {
        const targetWriter = 'admin'; 
        const activeData = dataList.filter(item => item.board_status === 'active'); // 'active'인 데이터만 필터링
        const sortedData = [...activeData].sort((a, b) => {
            let compareA = a[sortCriteria];
            let compareB = b[sortCriteria];

            // 관리자가 작성한 글 우선순위 부여
            if (a.writer_type === targetWriter && b.writer_type !== targetWriter) {
                return -1; // a를 더 앞에 배치
            }
            if (a.writer_type !== targetWriter && b.writer_type === targetWriter) {
                return 1;  // b를 더 앞에 배치
            }

            // 날짜일 경우 Date 객체로 변환하여 비교
            if (sortCriteria === 'board_date') {
                compareA = new Date(a[sortCriteria]);
                compareB = new Date(b[sortCriteria]);
            }

            // 기본 내림차순 정렬
            if (compareA > compareB) return -1;
            if (compareA < compareB) return 1;
            return 0;
        });

        const startIndex = (currentPage - 1) * pageNum;
        const endIndex = startIndex + pageNum;
        // console.log(`startIndex: ${startIndex}, endIndex: ${endIndex}`);
        // console.log('Current page data:', sortedData.slice(startIndex, endIndex));

        return sortedData.slice(startIndex, endIndex);
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
            {loading ? (
                <p>데이터를 불러오는 중입니다...</p> // 로딩 중일 때 표시할 내용
            ) : (
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
                        <Button variant="contained" color='info' onClick={handleSearch}>검색</Button>

                        {/* 정렬 기준 선택 드롭다운 */}
                        <FormControl sx={{ marginLeft: '1vw', minWidth: 80 }}>
                            <Select
                                labelId="sort-label"
                                value={sortCriteria}
                                onChange={(e) => setSortCriteria(e.target.value)}
                                sx={{
                                    height: '4vh', // 높이 조정
                                    padding: '0px 8px', // 내부 패딩 줄이기
                                }}
                            >
                                <MenuItem value="board_date">기본순</MenuItem>
                                <MenuItem value="board_like">좋아요순</MenuItem>
                                <MenuItem value="board_view">조회순</MenuItem>
                            </Select>
                        </FormControl>

                    </div>

                    <List sx={{ textAlign: 'center' }}>
                        {/* 헤더 부분 */}
                        <Box sx={{ background: "#0F275C", color: "white", display: 'flex', fontWeight: 'bold', p: 1.25, boxShadow: 2, borderRadius: 1 }}>
                            <Box sx={{ width: '5%', borderRight: '1px solid ' }}>번호</Box>
                            <Box sx={{ width: '60%', borderRight: '1px solid ' }}>제목</Box>
                            <Box sx={{ width: '15%', borderRight: '1px solid' }}>작성자</Box>
                            <Box sx={{ width: '10%', borderRight: '1px solid ' }}>좋아요</Box>
                            <Box sx={{ width: '10%', textAlign: 'center' }}>조회수</Box>
                        </Box>

                        {/* 리스트 아이템 부분 */}
                        {getCurrentPageData().map((item, index) => (
                            (item.board_status === 'active') && (
                                <ListItem key={item.board_id} divider>
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        {/* 번호 */}
                                        <Box sx={{ width: '5%', textAlign: 'left', pl:1 }}>
                                            <Typography>{(currentPage - 1) * pageNum + (index + 1)}</Typography> {/* 현재 페이지에 맞는 번호 */}
                                        </Box>
                                        {/* 제목 */}
                                        <Box sx={{ width: '60%' }}>
                                            <ListItemText
                                                primary={isWideScreen ? item.board_title.substring(0, 18) : item.board_title.substring(0, 8)}
                                                onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                                onClick={() => handleSelectItem(item.board_id)}
                                            />
                                        </Box>
                                        {/* 작성자 */}
                                        <Box sx={{ width: '15%', textAlign: 'center' }}>
                                            <ListItemText
                                                primary={isWideScreen ? item.board_writer : item.board_writer.substring(0, 10)}
                                                onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                                onClick={() => handleSelectItem(item.board_id)}
                                            />
                                        </Box>
                                        {/* 좋아요 */}
                                        <Box sx={{ width: '10%', textAlign: 'center' }}>
                                            <ListItemText primary={`${item.board_like}`} />
                                        </Box>
                                        {/* 조회수 */}
                                        <Box sx={{ width: '10%', textAlign: 'center' }}>
                                            <ListItemText primary={`${item.board_view}`} />
                                        </Box>
                                    </Box>
                                </ListItem>
                            )
                        ))}
                    </List>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color='primary'
                        />


                        {cookies.user &&
                            <Box sx={{ position: 'absolute', right: 5 }}>
                                <Button variant="contained" color="info" onClick={onCreatePost}>
                                    글작성
                                </Button>
                            </Box>
                        }
                    </Box>
                </Box>
            )}
        </BoardLayout>
    );
};

export default SideBoardList;

const BoardLayout = styled.div`
    overflow-x: hidden;
    width: 100%;
    box-sizing: border-box;
`;
