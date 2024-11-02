/**
 * 파일생성자 - 오자현 
 * 관리자에서 신고목록을 확인하는 컴포넌트
 * 
 * 기능 구현- 오자현
 * - 데이터 패치, 데이터 정렬, 페이지게이션 기능
 */
import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, Typography, Pagination, FormControl, Select, MenuItem, Grid } from '@mui/material';
import styled from "styled-components";

const AdminBoardReportList = ({ onReportManagement }) => {
    const [dataList, setDataList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [sortCriteria, setSortCriteria] = useState('report_status'); // 기본 정렬 기준
    const [currentPage, setCurrentPage] = useState(1);

    const pageNum = 10;

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const fetchData = async () => {
        try {
            const response = await fetch("/api/boardReport/fetch");
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
        const sortedData = [...dataList].sort((a, b) => {
            let compareA = a[sortCriteria];
            let compareB = b[sortCriteria];

            // 상태 순 정렬일 경우 우선순위 부여 (오름차순으로 처리)
            if (sortCriteria === 'report_status') {
                const statusPriority = (status) => {
                    if (status === 'Waiting') return 1;
                    if (status === 'delete') return 2;
                    if (status === 'ignore') return 3;
                    return 4; // 그 외 상태의 기본 우선순위
                };

                compareA = statusPriority(a.report_status);
                compareB = statusPriority(b.report_status);

                if (compareA < compareB) return -1; // 오름차순
                if (compareA > compareB) return 1;
                return 0;
            }
            if (sortCriteria === 'report_type') {
                return a.report_type.localeCompare(b.report_type);
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

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>

            <Grid container alignItems="center" justifyContent="flex-end" sx={{ position: 'relative' }} >
                <FormControl sx={{ minWidth: 80 }}>
                    <Select
                        labelId="sort-label"
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                        sx={{ height: '4vh', padding: '0px 8px', }}>
                        <MenuItem value="report_date">날짜순</MenuItem>
                        <MenuItem value="report_status">상태순</MenuItem>
                        <MenuItem value="report_type">종류순</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <List>
                {/* 테이블 헤더 */}
                <TableHeader>
                    <Box sx={{ width: '5%', textAlign: 'center' }}>번호</Box>
                    <Box sx={{ width: '10%', textAlign: 'center' }}>종류</Box>
                    <Box sx={{ width: '60%', textAlign: 'center' }}>신고내용</Box>
                    <Box sx={{ width: '15%', textAlign: 'center' }}>신고자</Box>
                    <Box sx={{ width: '10%', textAlign: 'center' }}>상태</Box>
                </TableHeader>

                {/* 신고 데이터 목록 */}
                {getCurrentPageData().map((item, index) => (
                    <ListItem key={item.report_id} divider sx={{ textAlign: "center" }}
                        onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                        onClick={() => onReportManagement(item.report_id)}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>

                            {/* 번호 */}
                            <Box sx={{ width: '5%', textAlign: 'center' }}>
                                <Typography>{(currentPage - 1) * pageNum + (index + 1)}</Typography>
                            </Box>

                            {/* 신고 종류 */}
                            <Box sx={{ width: '10%', textAlign: 'center' }}>
                                <Typography>
                                    {item.report_type === 'spam' ? '스팸' : item.report_type === 'abuse' ? '욕설' : '기타'}
                                </Typography>
                            </Box>

                            {/* 신고 내용 25자만 출력 */}
                            <Box sx={{ width: '60%', textAlign: 'left' }}>
                                <ListItemText
                                    primary={!item.report_content ? '신고 내용이 없습니다.' : (item.report_content.substring(0, 25))}
                                />
                            </Box>

                            {/* 신고자 */}
                            <Box sx={{ width: '15%', textAlign: 'center' }}>
                                <ListItemText
                                    primary={item.report_writer}
                                />
                            </Box>

                            {/* 상태 */}
                            <Box sx={{ width: '10%', textAlign: 'center' }}>
                                <Typography sx={{ color: item.report_status === 'Waiting' ? 'red' : 'inherit', fontWeight: item.report_status === 'Waiting' ? 'bold' : 'normal' }}>
                                    {item.report_status === 'Waiting' ? '대기중' : item.report_status === 'ignore' ? '무시됨' : '삭제됨'}
                                </Typography>
                            </Box>

                        </Box>
                    </ListItem>
                ))}
            </List>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color='primary'
                />
            </Box>
        </>
    );
};

export default AdminBoardReportList;

const TableHeader = styled.div`
  background: #0F275C;
  color: white;
  display: flex;
  font-weight: bold;
  padding: 0.75rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
`;