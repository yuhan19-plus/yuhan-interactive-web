/**
 * 파일생성자 - 오자현 
 * 관리자 메인페이지
 * 각 항목을 미리 약간씩 보는 형태 기능은 없이 보여주기만
 */
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody, ListItem, ListItemText, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AdminMenuPreview = () => {
    const [professors, setProfessors] = useState([]);
    const [menuData, setMenuData] = useState([]);
    const [boardData, setBoardData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [rankings, setRankings] = useState([]);

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
        try {
            const response = await fetch("/api/report/fetch");
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            const data = await response.json();

            setReportData(data);
        } catch (error) {
            console.error("데이터 불러오는 중 에러 발생:", error);
        }
    };

    // testadmin이 작성한 글을 우선으로 최대 5개의 게시글을 가져오는 함수
    const getAdminAndRecentPosts = () => {
        const adminPosts = boardData.filter(item => item.board_writer === 'testadmin');
        const nonAdminPosts = boardData.filter(item => item.board_writer !== 'testadmin');

        // testadmin이 작성한 글이 5개 미만이면 최신 글을 추가
        const combinedPosts = adminPosts.concat(nonAdminPosts).slice(0, 5);
        return combinedPosts;
    };
    // 신고에서 Waiting인 것 중 최신 5개만 보여줌 (만약 부족하면 최신 신고내역으로 채움)
    const getAdminReportData = () => {
        const WaitingReports = reportData.filter(item => item.report_status === 'Waiting');
        const nonWaitingReports = reportData.filter(item => item.report_status !== 'Waiting');

        // testadmin이 작성한 글이 5개 미만이면 최신 글을 추가
        const combinedReports = WaitingReports.concat(nonWaitingReports).slice(0, 5);

        return combinedReports; // 이 부분 추가

    };


    return (
        <>
            <Part>
                <PartTitle>교수 목록</PartTitle>
                <TableHeader>
                    <Box sx={{ width: '33%' }}>아이디</Box>
                    <Box sx={{ width: '33%' }}>전공</Box>
                    <Box sx={{ width: '33%' }}>직책</Box>
                </TableHeader>
                <PartContent>
                    {professors.slice(0, 5).map((professor) => (
                        <ListItem key={professor.user_id} sx={{ textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                {/* 아이디 */}
                                <Box sx={{ width: '33%' }}>
                                    <ListItemText primary={professor.user_id} />
                                </Box>
                                {/* 전공 */}
                                <Box sx={{ width: '33%' }}>
                                    <ListItemText primary={professor.user_major} />
                                </Box>
                                {/* 직책 */}
                                <Box sx={{ width: '33%' }}>
                                    <ListItemText primary={professor.professor_position} />
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </PartContent>
            </Part>


            <Part>
                <PartTitle>오늘의 메뉴</PartTitle>
                <TableHeader>
                    <Box sx={{ width: '50%' }}>제목</Box>
                    <Box sx={{ width: '50%' }}>내용</Box>
                </TableHeader>
                <PartContent>
                    {/* 메뉴 3~5개 보여주는 로직 */}
                </PartContent>
            </Part>

            <Part>
                <PartTitle>게시판</PartTitle>
                <TableHeader>
                    <Box sx={{ width: '55%' }}>제목</Box>
                    <Box sx={{ width: '15%' }}>작성자</Box>
                    <Box sx={{ width: '15%' }}>View</Box>
                    <Box sx={{ width: '15%' }}>Like</Box>
                </TableHeader>
                <PartContent>
                    {getAdminAndRecentPosts().map((item) => (
                        <ListItem key={item.board_id} sx={{ textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                {/* 제목 */}
                                <Box sx={{ width: '55%' }}>
                                    <ListItemText
                                        primary={item.board_title.substring(0, 25)}
                                    />
                                </Box>
                                {/* 작성자 */}
                                <Box sx={{ width: '15%' }}>
                                    <ListItemText
                                        primary={item.board_writer}
                                    />
                                </Box>
                                {/* 조회수 */}
                                <Box sx={{ width: '15%' }}>
                                    <ListItemText primary={`${item.board_view}`} />
                                </Box>
                                {/* 좋아요 */}
                                <Box sx={{ width: '15%' }}>
                                    <ListItemText primary={`${item.board_like}`} />
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </PartContent>
            </Part>

            <Part>
                <PartTitle>학과 점수 및 순위</PartTitle>
                <TableHeader>
                    <Box sx={{ width: '33%' }}>학과</Box>
                    <Box sx={{ width: '33%' }}>점수</Box>
                    <Box sx={{ width: '33%' }}>순위</Box>
                </TableHeader>
                <PartContent>
                    {rankings.map((row) => (
                        <ListItem key={row.dept_name} sx={{ textAlign: 'center' }} >
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                {/* 학과 */}
                                <Box sx={{ width: '33%' }}>
                                    <ListItemText primary={row.dept_name} />
                                </Box>
                                {/* 점수 */}
                                <Box sx={{ width: '33%' }}>
                                    <ListItemText primary={row.score} />
                                </Box>
                                {/* 순위 */}
                                <Box sx={{ width: '33%' }}>
                                    <ListItemText primary={row.rank} />
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </PartContent>
            </Part>

            <Part>
                <PartTitle>신고내역</PartTitle>
                <TableHeader>
                    <Box sx={{ width: '15%' }}>종류</Box>
                    <Box sx={{ width: '60%' }}>신고내용</Box>
                    <Box sx={{ width: '15%' }}>신고자</Box>
                    <Box sx={{ width: '10%' }}>상태</Box>
                </TableHeader>
                <PartContent>
                    {/* 신고 데이터 목록 */}
                    {getAdminReportData().map((item) => (
                        <ListItem key={item.report_id} sx={{ textAlign: 'center' }} >
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                {/* 신고 종류 */}
                                <Box sx={{ width: '15%' }}>
                                    <Typography>
                                        {item.report_type === 'spam' ? '스팸' : item.report_type === 'abuse' ? '욕설' : '기타'}
                                    </Typography>
                                </Box>

                                {/* 신고 내용 리스트에선 25자만 보여지고 들어가면 전부 보여짐 */}
                                <Box sx={{ width: '60%' }}>
                                    <ListItemText primary={item.report_content.substring(0, 25)} />
                                </Box>

                                {/* 신고자 */}
                                <Box sx={{ width: '15%' }}>
                                    <ListItemText primary={item.report_writer} />
                                </Box>

                                {/* 상태 */}
                                <Box sx={{ width: '10%' }}>
                                    <Typography sx={{ color: item.report_status === 'Waiting' ? 'red' : 'inherit', fontWeight: item.report_status === 'Waiting' ? 'bold' : 'normal' }}>
                                        {item.report_status === 'Waiting' ? '대기중' : item.report_status === 'ignore' ? '무시' : '삭제'}
                                    </Typography>
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
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
const TableHeader = styled.div`
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