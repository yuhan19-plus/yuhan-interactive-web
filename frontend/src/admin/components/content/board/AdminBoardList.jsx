/**
 * 파일생성자 - 오자현 
 * 기능 구현- 오자현
 * 관리자에서 보는 게시판 목록 컴포넌트
 * 
 */

import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, FormControl, InputAdornment, InputBase, List, ListItem, ListItemText, MenuItem, Pagination, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Swal from "sweetalert2";

const AdminBoardList = ({ onCreatePost, onSelectItem }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriteria, setSortCriteria] = useState('board_date'); // 기본 정렬 기준
    const pageNum = 8;
    // 전체화면이 화면크기에 따라 제목의 내용 글자수 제한 -> 못생김방지
    const fullScreenWinth = window.screen.width;
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > fullScreenWinth / 2);

    // 삭제는 리스트에서 관리자라면 가능하게 하는 식으로 처리하면 될듯
    const handleDeleteItem = async (boardId) => {
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
            console.error("게시판 삭제하는 중 에러 발생:", error);
        }
        // 삭제 후 새로고침
        fetchData();
    }

    const handleSearch = async () => {
        // console.log("검색단어", searchQuery) // 검색단어 진입체크
        if (searchQuery === '') {
            fetchData();
        } else {
            try {
                const response = await fetch(`/api/board/search/${searchQuery}`);
                const data = await response.json();
                // 데이터가 존재하는지 확인
                if (data.board && data.board.length > 0) {
                    setDataList(data.board);
                    // 페이지의 총 수를 계산하여 저장
                    setTotalPages(Math.ceil(data.board.length / pageNum));
                } else {
                    // 검색 결과가 없을 때 SweetAlert로 경고 메시지 표시
                    Swal.fire({
                        icon: 'warning',
                        title: '검색 결과 없음',
                        text: '해당 단어로 검색된 결과가 없습니다.',
                        confirmButtonColor: '#3085d6',
                    });
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
            setDataList(data);
            setTotalPages(Math.ceil(data.length / pageNum));
        } catch (error) {
            console.error("데이터 불러오는 중 에러 발생:", error);
        }
    };

    // 현재 페이지 데이터를 가져옴 (정렬 기준에 따라)
    const getCurrentPageData = () => {
        const targetWriter = 'admin'; // 관리자 우선순위
        const sortedData = [...dataList].sort((a, b) => {
            let compareA = a[sortCriteria];
            let compareB = b[sortCriteria];

            // 관리자가 작성한 글 우선순위 부여
            if (a.writer_type === targetWriter && b.writer_type !== targetWriter) {
                return -1; // a를 더 앞에 배치
            }
            if (a.writer_type !== targetWriter && b.writer_type === targetWriter) {
                return 1;  // b를 더 앞에 배치
            }

            // 상태 순 정렬일 경우 우선순위 부여 (오름차순으로 처리)
            if (sortCriteria === 'board_status') {
                const statusPriority = (status) => {
                    if (status === 'active') return 1;
                    if (status === 'delete') return 2;
                    return 3; // 그 외 상태의 기본 우선순위
                };

                compareA = statusPriority(a.board_status);
                compareB = statusPriority(b.board_status);

                if (compareA < compareB) return -1; // 오름차순
                if (compareA > compareB) return 1;
                return 0;
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
            <Box sx={{ p: 3 }}>
                <CenteredContainer>
                    <SearchInput
                        placeholder="검색할 제목이나 작성자를 입력하세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                    <Button variant="contained" onClick={handleSearch} color='info' >검색</Button>

                    <FormControl sx={{ marginLeft: '1vw', minWidth: 100 }}>
                        <Select
                            labelId="sort-label"
                            value={sortCriteria}
                            onChange={(e) => setSortCriteria(e.target.value)}
                            sx={{ height: '4vh', padding: '0px 8px' }}
                        >
                            <MenuItem value="board_date">날짜순</MenuItem>
                            <MenuItem value="board_like">좋아요순</MenuItem>
                            <MenuItem value="board_view">조회수순</MenuItem>
                            <MenuItem value="board_status">상태순</MenuItem>
                        </Select>
                    </FormControl>
                </CenteredContainer>

                <List sx={{ textAlign: 'center' }}>
                    <TableHeader>
                        <Box sx={{ width: '10%' }}>번호</Box>
                        <Box sx={{ width: '45%' }}>제목</Box>
                        <Box sx={{ width: '15%' }}>작성자</Box>
                        <Box sx={{ width: '10%' }}>View</Box>
                        <Box sx={{ width: '10%' }}>Like</Box>
                        <Box sx={{ width: '10%' }}>관리</Box>
                    </TableHeader>

                    {getCurrentPageData().map((item, index) => (
                        <>
                            {(item.writer_type === 'admin') ? (
                                <ListItem key={item.board_id}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        {/* 번호 */}
                                        <Box sx={{ width: '10%', textAlign: 'center', pr: 1 }}>
                                            <Admincontent sx={{}} >{(currentPage - 1) * pageNum + (index + 1)}</Admincontent> {/* 현재 페이지에 맞는 번호 */}
                                        </Box>
                                        {/* 제목 */}
                                        <Box sx={{ width: '45%' }}>
                                            <Admincontent
                                                onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                                onClick={() => handleSelectItem(item.board_id)}
                                            >{isWideScreen ? item.board_title.substring(0, 25) : item.board_title.substring(0, 15)}
                                            </Admincontent>
                                        </Box>
                                        {/* 작성자 */}
                                        <Box sx={{ width: '15%', textAlign: 'center' }}>
                                            <Admincontent
                                                onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                                onClick={() => handleSelectItem(item.board_id)}
                                            >
                                                {item.board_writer}
                                            </Admincontent>
                                        </Box>
                                        {/* 조회수 */}
                                        <Box sx={{ width: '10%', textAlign: 'center' }}>
                                            <Admincontent>
                                                {item.board_view}
                                            </Admincontent>
                                        </Box>
                                        {/* 좋아요 */}
                                        <Box sx={{ width: '10%', textAlign: 'center' }}>
                                            <Admincontent>
                                                {item.board_like}
                                            </Admincontent>
                                        </Box>
                                        {/* 관리 */}
                                        <Box sx={{ width: '10%', display: 'flex', justifyContent: 'flex-end' }}>
                                            {item.board_status === 'active' &&
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="error"
                                                    sx={{ marginLeft: '5px' }}
                                                    onClick={() => handleDeleteItem(item.board_id)}
                                                >
                                                    삭제
                                                </Button>
                                            }
                                        </Box>
                                    </Box>
                                </ListItem>
                            ) : (
                                <ListItem key={item.board_id}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        {/* 번호 */}
                                        <Box sx={{ width: '10%', textAlign: 'center', pr: 1 }}>
                                            <Typography sx={{}} >{(currentPage - 1) * pageNum + (index + 1)}</Typography> {/* 현재 페이지에 맞는 번호 */}
                                        </Box>
                                        {/* 제목 */}
                                        <Box sx={{ width: '45%' }}>
                                            <Typography
                                                onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                                onClick={() => handleSelectItem(item.board_id)}
                                            >{isWideScreen ? item.board_title.substring(0, 25) : item.board_title.substring(0, 15)}
                                            </Typography>
                                        </Box>
                                        {/* 작성자 */}
                                        <Box sx={{ width: '15%', textAlign: 'center' }}>
                                            <Typography
                                                onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                                onClick={() => handleSelectItem(item.board_id)}
                                            >
                                                {item.board_writer}
                                            </Typography>
                                        </Box>
                                        {/* 조회수 */}
                                        <Box sx={{ width: '10%', textAlign: 'center' }}>
                                            <Typography>
                                                {item.board_view}
                                            </Typography>
                                        </Box>
                                        {/* 좋아요 */}
                                        <Box sx={{ width: '10%', textAlign: 'center' }}>
                                            <Typography>
                                                {item.board_like}
                                            </Typography>
                                        </Box>
                                        {/* 관리 */}
                                        <Box sx={{ width: '10%', display: 'flex', justifyContent: 'flex-end' }}>
                                            {item.board_status === 'active' &&
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="error"
                                                    sx={{ marginLeft: '5px' }}
                                                    onClick={() => handleDeleteItem(item.board_id)}
                                                >
                                                    삭제
                                                </Button>
                                            }
                                        </Box>
                                    </Box>
                                </ListItem>
                            )}
                        </>
                    ))}
                </List>


                <FooterContainer >
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color='primary'
                    />
                    {cookies.user &&
                        <Box sx={{ position: 'absolute', right: 5 }}>
                            <Button variant="contained" color="primary" onClick={onCreatePost}
                            >
                                글작성
                            </Button>
                        </Box>
                    }
                </FooterContainer>
            </Box>
        </BoardLayout>
    );
};

export default AdminBoardList;

const BoardLayout = styled.div`
    overflow-x: hidden;
    width: 100%;
    box-sizing: border-box;
`;

const Admincontent = styled.div`
    font-weight: 900;
    font-style: italic;
    color: #0F275C;
`

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;
`

const TableHeader = styled.div`
  background: #0F275C;
  color: white;
  display: flex;
  font-weight: bold;
  padding: 0.75rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  position: relative;
`;
const SearchInput = styled(InputBase)`
  width: 50%;
  margin-right: 10px;
  padding: 6px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
`;