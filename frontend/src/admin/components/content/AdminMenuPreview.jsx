/**
 * 파일생성자 - 오자현 
 * 관리자 메인페이지
 * 각 항목을 미리 약간씩 보는 형태 기능은 없이 보여주기만
 */
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody, ListItem, ListItemText, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AdminMenuPreview = () => {
    const [menuData, setMenuData] = useState([]);
    const [boardData, setBoardData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        // 백엔드에서 각 데이터 가져오기
        fetchMenuData();
        fetchBoardData();
        fetchRankings();
        fetchReportData();
    }, []);

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

        // testadmin이 작성한 글이 5개 미만으로 보이도록
        const combinedPosts = adminPosts.slice(0, 5);
        return combinedPosts;
    };
    // 신고에서 Waiting인 것 중 최신 5개만 보여줌 (만약 부족하면 최신 신고내역으로 채움)
    const getAdminReportData = () => {
        const WaitingReports = reportData.filter(item => item.report_status === 'Waiting');
        const nonWaitingReports = reportData.filter(item => item.report_status !== 'Waiting');

        // testadmin이 작성한 글이 5개 미만이면 최신 글을 추가
        const combinedReports = WaitingReports.concat(nonWaitingReports).slice(0, 5);

        return combinedReports;
    };

    return (
        <>
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

            <PHalfPart>
                <HalfPart>
                    <PartTitle>공지사항</PartTitle>
                    <TableHeader>
                        <Box sx={{ width: '75%' }}>제목</Box>
                        <Box sx={{ width: '25%' }}>작성자</Box>
                    </TableHeader>
                    <PartContent>
                        {getAdminAndRecentPosts().map((item) => (
                            <ListItem key={item.board_id} sx={{ textAlign: 'center' }}>
                                <Box sx={{ display: 'flex', width: '100%' }}>
                                    {/* 제목 */}
                                    <Box sx={{ width: '75%' }}>
                                        <ListItemText
                                            primary={item.board_title.substring(0, 20)}
                                        />
                                    </Box>
                                    {/* 작성자 */}
                                    <Box sx={{ width: '25%' }}>
                                        <ListItemText
                                            primary={item.board_writer}
                                        />
                                    </Box>
                                </Box>
                            </ListItem>
                        ))}
                    </PartContent>
                </HalfPart>

                <HalfPart>
                    <PartTitle>오늘의 메뉴</PartTitle>
                    <TableHeader>
                        <Box sx={{ width: '50%' }}>제목</Box>
                        <Box sx={{ width: '50%' }}>내용</Box>
                    </TableHeader>
                    <PartContent>
                        {/* 메뉴 3~5개 보여주는 로직 */}
                    </PartContent>
                </HalfPart>
            </PHalfPart>

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

        </>
    );
};

export default AdminMenuPreview;

const Part = styled.div`
    margin: 20px 0;
`;

const PHalfPart = styled.div`    
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
`;

const HalfPart = styled.div`
    margin: 0.25%;
    width: 50%;
`;

const PartTitle = styled.div`
    border-left: 5px solid #0F275C;
    padding: 5px;
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