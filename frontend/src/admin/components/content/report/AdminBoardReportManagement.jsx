/**
 * 파일생성자 - 오자현 
 * 관리자에서 신고글을 처리하는 컴포넌트
 * 
 * 기능 구현- 오자현
 * - 신고글 패치, 삭제처리, 무시처리 기능
 */
import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, TextField } from '@mui/material';
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import styled from "styled-components";

const AdminBoardReportManagement = ({ reportID, onCancel }) => {
    const [cookies] = useCookies(["user"]);

    const [totalData, setTotalData] = useState({
        board_content: "",
        board_date: "",
        board_id: "",
        board_last_modified: "",
        board_like: "",
        board_status: "",
        board_title: "",
        board_view: "",
        board_writer: "",

        report_content: "",
        report_date: "",
        report_id: "",
        report_resolution: "",
        report_status: "",
        report_type: "",
        report_writer: "",
        resolved_at: ""
    });

    // 입력값 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTotalData({ ...totalData, [name]: value });
    };

    // 게시글 삭제핸들러
    const handleDelete = async () => {
        // 처리사유 유효성 검사
        if (!totalData.report_resolution) {
            Swal.fire({
                icon: 'warning',
                title: '입력 오류',
                text: '처리 사유를 입력하세요.',
                confirmButtonColor: '#3085d6',
            });
            return;
        }
        try {
            const response = await fetch(`/api/boardReport/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...totalData,
                    action: 'delete'
                })
            });
            if (!response.ok) {
                throw new Error("게시글 삭제에 실패했습니다.");
            }
            Swal.fire({
                icon: 'success',
                title: '삭제 완료',
                text: '게시글이 성공적으로 삭제되었습니다.',
                confirmButtonColor: '#3085d6',
            }).then(() => {
                window.dispatchEvent(new Event('updateBadge')); // 수동으로 이벤트 발생
                onCancel();
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '삭제 실패',
                text: '게시글 삭제 중 문제가 발생했습니다.',
                confirmButtonColor: '#d33',
            });
            console.error("삭제하는 중 에러 발생:", error);
        }
    }

    // 신고 무시핸들러
    const handleIgnore = async () => {
        // 처리사유 유효성 검사
        if (!totalData.report_resolution) {
            Swal.fire({
                icon: 'warning',
                title: '입력 오류',
                text: '처리 사유를 입력하세요.',
                confirmButtonColor: '#3085d6',
            });
            return;
        }
        try {
            const response = await fetch(`/api/boardReport/ignore`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...totalData,
                    action: 'ignore'
                })
            });
            if (!response.ok) {
                throw new Error("신고를 무시하는 데 실패했습니다.");
            }
            Swal.fire({
                icon: 'success',
                title: '무시 완료',
                text: '신고가 성공적으로 무시되었습니다.',
                confirmButtonColor: '#3085d6',
            }).then(() => {
                window.dispatchEvent(new Event('updateBadge')); // 수동으로 이벤트 발생
                onCancel();
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '무시 실패',
                text: '신고 무시 중 문제가 발생했습니다.',
                confirmButtonColor: '#d33',
            });
            console.error("무시하는 중 에러 발생:", error);
        }
    }

    // 패치핸들러
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/boardReport/fetch/${reportID}`);
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            const data = await response.json();
            setTotalData(data.reportData);
            if (data.reportData.board_status === "delete") {
                Swal.fire({
                    icon: 'info',
                    title: '이미 삭제된 게시글',
                    text: '글쓴이가 삭제했거나 관리자가 삭제한 글입니다.'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '데이터 불러오기 실패',
                text: '데이터를 불러오는 중 문제가 발생했습니다.',
                confirmButtonColor: '#d33',
            });
            console.error("데이터 불러오는 중 에러 발생:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Box sx={{ p: 3, backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 3 }}>
                {/* 돌아가기 버튼 */}
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <StyledBackButton
                            variant="contained"
                            size="medium"
                            color="primary"
                            onClick={onCancel}
                        >
                            돌아가기
                        </StyledBackButton>
                    </Grid>
                </Grid>

                {/* 신고 정보 영역 */}
                <Box sx={{ mt: 3, backgroundColor: '#fff', padding: 3, borderRadius: 2, boxShadow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        신고 정보
                    </Typography>
                    <Typography variant="body1">
                        <strong>신고자: </strong>{totalData.report_writer}
                    </Typography>
                    <Typography variant="body1">
                        <strong>신고 유형: </strong>{totalData.report_type}
                    </Typography>
                    <Typography variant="body1">
                        <strong>신고 날짜: </strong>
                        {new Date(totalData.report_date).toLocaleString('ko-KR', {
                            year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
                        })}
                    </Typography>
                    <Typography variant="body1">
                        <strong>신고 내용: </strong>{totalData.report_content}
                    </Typography>
                </Box>

                {/* 신고된 게시판 내용 영역 */}
                <Box sx={{ mt: 3, backgroundColor: '#fff', padding: 3, borderRadius: 2, boxShadow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        신고된 게시판 정보
                    </Typography>
                    <Typography variant="body1">
                        <strong>제목: </strong>{totalData.board_title}
                    </Typography>
                    <Typography variant="body1">
                        <strong>내용: </strong>{totalData.board_content}
                    </Typography>
                    <Typography variant="body1">
                        <strong>작성자: </strong>{totalData.board_writer}
                    </Typography>
                </Box>

                {/* 처리 사유 입력 영역 */}
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        처리 사유
                    </Typography>
                    {totalData.report_status === 'Waiting' ? (
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="처리 사유를 입력하세요"
                            name="report_resolution"
                            value={totalData.report_resolution || ""}
                            onChange={handleInputChange}
                            sx={{ backgroundColor: '#fff', borderRadius: 1, boxShadow: 1 }}
                        />
                    ) : (
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f0f0f0' }}>
                            {totalData.report_resolution || '처리 사유가 없습니다.'}
                        </Typography>
                    )}
                </Box>

                {/* 삭제 및 무시 버튼 */}
                {totalData.report_status === 'Waiting' && (
                    <Grid container justifyContent="center" sx={{ mt: 4 }}>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ marginRight: 2, boxShadow: 2 }}
                            onClick={handleDelete}
                        >
                            삭제
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            sx={{ boxShadow: 2 }}
                            onClick={handleIgnore}
                        >
                            무시
                        </Button>
                    </Grid>
                )}

            </Box>
        </>
    );

};

export default AdminBoardReportManagement;
const StyledBackButton = styled(Button)`
  background-color: #2ecc71 !important;
  padding: 0.5vh 2vw !important;
  
  &:hover {
    background-color: #27ae60 !important;
  }
`;