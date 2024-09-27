/**
 * 파일생성자 - 오자현 
 * 관리자 메인페이지
 * 각 항목을 미리 약간씩 보는 형태 기능은 없이 보여주기만
 */
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody, ListItem, ListItemText, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AdminMenuPreview = () => {
    const [professors, setProfessors] = useState([]);
    const [menuData, setMenuData] = useState([]);
    const [boardData, setBoardData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [rankings, setRankings] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('board_date'); // 기본 정렬 기준

    useEffect(() => {
        // 백엔드에서 각 데이터 가져오기
        fetchProfessorData();
        fetchMenuData();
        fetchBoardData();
        fetchRankings();
        fetchReportData();
    }, []);

    const fetchProfessorData = async () => {
        // 교수 정보 가져오기
        fetch('/api/memberAdmin/fetchprofessor')
            .then(response => response.json())
            .then(data => setProfessors(data))
            .catch(error => console.error('교수 정보 불러오기 중 에러:', error));
    };

    const fetchMenuData = async () => {
        const response = await fetch("/api/adminmain/todayMenu");
        const data = await response.json();
        setMenuData(data);
    };

    const fetchBoardData = async () => {
        try {
            const response = await fetch("/api/board");
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            const data = await response.json();
            setBoardData(data);
        } catch (error) {
            console.error("데이터 불러오는 중 에러 발생:", error);
        }
    };

    const fetchRankings = async () => {
        try {
            const response = await fetch('/api/deptrecadmin/rankings');
            const data = await response.json();
            setRankings(data);
        } catch (error) {
            console.error('학과 점수를 불러오는 중 에러 발생:', error);
        }
    };

    const fetchReportData = async () => {
        const response = await fetch("/api/adminmain/report");
        const data = await response.json();
        setReportData(data);
    };

    // testadmin이 작성한 글을 우선으로 최대 5개의 게시글을 가져오는 함수
    const getAdminAndRecentPosts = () => {
        const adminPosts = boardData.filter(item => item.board_writer === 'testadmin');
        const nonAdminPosts = boardData.filter(item => item.board_writer !== 'testadmin');

        // testadmin이 작성한 글이 5개 미만이면 최신 글을 추가
        const combinedPosts = adminPosts.concat(nonAdminPosts).slice(0, 5);
        return combinedPosts;
    };

    return (
        <>
            <Part>
                <PartTitle>교수 목록</PartTitle>
                <PartContent>
                    {/* 최대 5명의 교수만 보여주기 */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>아이디</TableCell>
                                    <TableCell>전공</TableCell>
                                    <TableCell>직책</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {professors.slice(0, 5).map((professor) => (  // 최대 5명만 보여줌
                                    <TableRow key={professor.user_id}>
                                        <TableCell>{professor.user_id}</TableCell>
                                        <TableCell>{professor.user_major}</TableCell>
                                        <TableCell>{professor.professor_position}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PartContent>
            </Part>

            <Part>
                <PartTitle>오늘의 메뉴</PartTitle>
                <PartContent>
                    {/* 메뉴 3~5개 보여주는 로직 */}
                </PartContent>
            </Part>

            <Part>
                <PartTitle>게시판</PartTitle>
                <BoardTitle>
                    <Box sx={{ width: '55%' }}>제목</Box>
                    <Box sx={{ width: '15%' }}>작성자</Box>
                    <Box sx={{ width: '15%' }}>View</Box>
                    <Box sx={{ width: '15%' }}>Like</Box>
                </BoardTitle>
                <PartContent>
                    {getAdminAndRecentPosts().map((item) => (
                        <ListItem key={item.board_id}>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                {/* 제목 */}
                                <Box sx={{ width: '55%' }}>
                                    <ListItemText
                                        primary={item.board_title.substring(0, 25)}
                                    />
                                </Box>
                                {/* 작성자 */}
                                <Box sx={{ width: '15%', textAlign: 'center' }}>
                                    <ListItemText
                                        primary={item.board_writer}
                                    />
                                </Box>
                                {/* 조회수 */}
                                <Box sx={{ width: '15%', textAlign: 'center' }}>
                                    <ListItemText primary={`${item.board_view}`} />
                                </Box>
                                {/* 좋아요 */}
                                <Box sx={{ width: '15%', textAlign: 'center' }}>
                                    <ListItemText primary={`${item.board_like}`} />
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </PartContent>
            </Part>

            <Part>
                <PartTitle>학과 점수 및 순위</PartTitle>
                <PartContent>
                    <TableContainer component={Paper} sx={{ width: '50%', margin: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>학과</TableCell>
                                    <TableCell>점수</TableCell>
                                    <TableCell>순위</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rankings.map((row) => (
                                    <TableRow key={row.dept_name}>
                                        <TableCell>{row.dept_name}</TableCell>
                                        <TableCell>{row.score}</TableCell>
                                        <TableCell>{row.rank}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PartContent>
            </Part>

            <Part>
                <PartTitle>신고내역</PartTitle>
                <PartContent>
                    {/* 대기 중인 신고글 3~5개 */}
                </PartContent>
            </Part>
        </>
    );
};

export default AdminMenuPreview;

const Part = styled.div`
    margin: 20px 0;
`;

const PartTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
`;

const PartContent = styled.div`
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
`;
const BoardTitle = styled.div`
    text-align: center;
    align-items: center;
    height: 1vh;
    background: #0F275C;
    color: white;
    display: flex;
    font-weight: bold;
    padding: 1.25rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* boxShadow 2에 해당하는 스타일 */
    border-radius: 8px; /* borderRadius 1에 해당하는 스타일 */
`;