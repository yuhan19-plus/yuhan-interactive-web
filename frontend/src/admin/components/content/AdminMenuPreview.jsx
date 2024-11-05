/**
 * 파일생성자 - 오자현 
 * 관리자 메인페이지
 * 
 * 기능 구현 - 이석재, 이정민, 오자현
 * 이석재
 * - 학과랭킹 패치
 * 이정민
 * - 오늘의 메뉴 패치
 * 오자현
 * - 게시판정보, 신고데이터 패치, 우선순위에 따른 데이터 5개 미리보기 기능
 */
import { ListItem, ListItemText, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AdminMenuPreview = () => {
    const [menuData, setMenuData] = useState([]);
    const [boardData, setBoardData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [rankings, setRankings] = useState([]);

    // 오늘의 메뉴 패치
    const fetchMenuData = async () => {
        const response = await fetch("/api/food");
        const data = await response.json();
        setMenuData(data);
    };

    // 게시판 정보 패치
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

    // 학과랭킹 패치
    const fetchRankings = async () => {
        try {
            const response = await fetch('/api/deptrecadmin/rankings');
            const data = await response.json();
            setRankings(data);
        } catch (error) {
            console.error('학과 점수를 불러오는 중 에러 발생:', error);
        }
    };

    // 신고데이터 패치
    const fetchReportData = async () => {
        try {
            const response = await fetch("/api/boardReport/fetch");
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            const data = await response.json();

            setReportData(data);
        } catch (error) {
            console.error("데이터 불러오는 중 에러 발생:", error);
        }
    };

    // 게시글 5개 로드 함수
    const getAdminAndRecentPosts = () => {
        const adminPosts = boardData.filter(item => item.writer_type === 'admin');

        // 관리자 글이 5개 미만으로 보이도록
        const combinedPosts = adminPosts.slice(0, 5);
        return combinedPosts;
    };

    // 신고 5개 로드 함수 
    const getAdminReportData = () => {
        // Waiting인 것 중 최신 5개 (만약 부족하면 최신순서로 채움)
        const WaitingReports = reportData.filter(item => item.report_status === 'Waiting');
        const nonWaitingReports = reportData.filter(item => item.report_status !== 'Waiting')
            .sort((a, b) => new Date(b.report_date) - new Date(a.report_date));

        // 대기중인 신고가 5개 미만이면 최신 글을 추가
        const combinedReports = WaitingReports.concat(nonWaitingReports).slice(0, 5);

        return combinedReports;
    };

    // 관리자 음식정보 5개 로드 함수
    const getAdminFoodData = () => {
        const finalFoodData = menuData.slice(0, 5);
        return finalFoodData;
    }

    useEffect(() => {
        // 백엔드에서 각 데이터 가져오기
        fetchMenuData();
        fetchBoardData();
        fetchRankings();
        fetchReportData();
    }, []);
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
                                    <ListItemText
                                        primary={!item.report_content ? '신고 내용이 없습니다.' : (item.report_content.substring(0, 25))}
                                    />
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
                        <Box sx={{ width: '50%' }}>이름</Box>
                        <Box sx={{ width: '50%' }}>가격</Box>
                    </TableHeader>
                    <PartContent>
                        {getAdminFoodData().map((item) => (
                            <ListItem key={item.foodID} sx={{ textAlign: 'center' }}>
                                <Box sx={{ display: 'flex', width: '100%' }}>
                                    {/* 음식명 */}
                                    <Box sx={{ width: '50%' }}>
                                        <ListItemText
                                            primary={item.foodName.substring(0, 20)}
                                        />
                                    </Box>
                                    {/* 가격 */}
                                    <Box sx={{ width: '50%' }}>
                                        <ListItemText
                                            primary={item.foodPrice}
                                        />
                                    </Box>
                                </Box>
                            </ListItem>
                        ))}
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
    border-left: 5px solid var(--main-color);
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
    background: var(--main-color);
    color: white;
    display: flex;
    font-weight: bold;
    padding: 1.25rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* boxShadow 2에 해당하는 스타일 */
    border-radius: 8px; /* borderRadius 1에 해당하는 스타일 */
`;