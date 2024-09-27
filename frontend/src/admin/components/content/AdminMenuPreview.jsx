/**
 * 파일생성자 - 오자현 
 * 관리자 메인페이지
 * 각 항목을 미리 약간씩 보는 형태 기능은 없이 보여주기만
 */
import { Table, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TableBody } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AdminMenuPreview = () => {
    // 내용형태
    // 회원관리
    // 교수목록 3~5명 보여주기
    // 오늘의 메뉴
    // 메뉴 3~5개 보여줌
    // 유한게시판
    // 관리자가 작성한 글+ 최신글 포함3~5개
    // 전공추천
    // 전공추천 순위 보여주기
    // 신고내역
    // 대기중인 신고글 3~5개만 보여주기
    const [memberData, setMemberData] = useState([]);
    const [menuData, setMenuData] = useState([]);
    const [boardData, setBoardData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        // 백엔드에서 각 데이터 가져오기
        fetchMemberData();
        fetchMenuData();
        fetchBoardData();
        fetchRankings();
        fetchReportData();
    }, []);

    const fetchMemberData = async () => {
        const response = await fetch("/api/adminmain/member");
        const data = await response.json();
        setMemberData(data);
    };

    const fetchMenuData = async () => {
        const response = await fetch("/api/adminmain/todayMenu");
        const data = await response.json();
        setMenuData(data);
    };

    const fetchBoardData = async () => {
        const response = await fetch("/api/adminmain/board");
        const data = await response.json();
        setBoardData(data);
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

    return (
        <>
            <Part>
                <PartTitle>회원정보</PartTitle>
                <PartContent>
                    {/* 회원정보 3~5개 보여주는 로직 */}
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
                <PartContent>
                    {/* 관리자가 작성한 글 및 최신 글 3~5개 */}
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
