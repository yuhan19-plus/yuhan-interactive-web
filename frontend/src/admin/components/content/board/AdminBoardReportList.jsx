/**
 * 파일생성자 - 오자현 
 * 기능 구현- 오자현
 * 관리자에서 신고목록을 확인하는 컴포넌트
 * 
 */
import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, Button, Typography, Pagination, InputAdornment, InputBase, FormControl, Select, MenuItem, Grid } from '@mui/material';
import { useCookies } from "react-cookie";

// 신고 처리 순서
// 1.신고내역을 클릭으로 처리페이지 진입
// 2.처리내역 작성 후 처리완료
const AdminBoardReportList = ({ onCancel, onReportManagement }) => {
    const [cookies] = useCookies(["user"]);
    const [dataList, setDataList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [sortCriteria, setSortCriteria] = useState('report_status'); // 기본 정렬 기준
    const [currentPage, setCurrentPage] = useState(1);
    const pageNum = 8;

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

    const fetchData = async () => {
        try {
            const response = await fetch("/api/report/fetch");
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            const data = await response.json();

            setDataList(data);
        } catch (error) {
            console.error("데이터 불러오는 중 에러 발생:", error);
        }
    };


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <Box sx={{ p: 3 }}>
                {/* 버튼구역 */}
                <Grid container alignItems="center" justifyContent="space-between">
                    {/* 돌아가기 버튼 */}
                    <Grid item>
                        <Button
                            variant="contained"
                            size="medium"
                            color="primary"
                            sx={{
                                backgroundColor: "#2ecc71",
                                '&:hover': {
                                    backgroundColor: "#27ae60"
                                },
                                padding: "0.5vh 2vw"
                            }}
                            onClick={onCancel}
                        >
                            돌아가기
                        </Button>
                    </Grid>
                </Grid>

                <Grid container alignItems="center" justifyContent="center" sx={{ position: 'relative' }} >
                    <Grid item>
                        <Typography variant="h2"
                            sx={{ textAlign: "center", color: "#ee2e2e", fontWeight: "bold", fontSize: "2.5rem" }}
                        >
                            신고내역
                        </Typography>
                    </Grid>
                    <FormControl sx={{ position: 'absolute', right: '2vw', minWidth: 80 }}>
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
                    <Box sx={{ background: "#0F275C", color: "white", display: 'flex', fontWeight: 'bold', p: 1.25, boxShadow: 2, borderRadius: 1 }}>
                        <Box sx={{ width: '5%', textAlign: 'center' }}>번호</Box>
                        <Box sx={{ width: '10%', textAlign: 'center' }}>종류</Box>
                        <Box sx={{ width: '60%', textAlign: 'center' }}>신고내용</Box>
                        <Box sx={{ width: '15%', textAlign: 'center' }}>신고자</Box>
                        <Box sx={{ width: '10%', textAlign: 'center' }}>상태</Box>
                    </Box>

                    {/* 신고 데이터 목록 */}
                    {getCurrentPageData().map((item, index) => (
                        <ListItem key={item.report_id} divider sx={{ textAlign: "center" }}>
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

                                {/* 신고 내용 리스트에선 25자만 보여지고 들어가면 전부 보여짐*/}
                                <Box sx={{ width: '60%', textAlign: 'left' }}>
                                    <ListItemText
                                        primary={item.report_content.substring(0, 25)}
                                        onPointerOver={(e) => e.target.style.cursor = 'pointer'}
                                        onClick={() => onReportManagement(item.report_id)}
                                    />
                                </Box>

                                {/* 신고자 */}
                                <Box sx={{ width: '15%', textAlign: 'center' }}>
                                    <ListItemText
                                        primary={item.report_writer}
                                        onPointerOver={(e) => e.target.style.cursor = 'pointer'}
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
                        sx={{
                            "& .Mui-selected": {
                                background: 'linear-gradient( #56bbb6 30%, #33677f 90%)', // PANTONE 570C와 더 조화로운 중간 파란색
                                color: '#fff', // 선택된 페이지 텍스트 색상
                            },
                            "& .MuiPaginationItem-root": {
                                backgroundColor: '#56bbb6', // 페이지 넘버 배경 색상 (PANTONE 570C)
                                color: '#fff', // 페이지 넘버 텍스트 색상
                            },
                            "& .MuiPaginationItem-root:hover": {
                                backgroundColor: '#33677f', // 마우스 오버 시 부드러운 파란색
                                color: '#fff', // 마우스 오버 시 텍스트 색상 유지
                            }
                        }}
                    />
                </Box>

            </Box>
        </>
    );
};

export default AdminBoardReportList;
