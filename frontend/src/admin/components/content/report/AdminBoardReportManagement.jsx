/**
 * 파일생성자 - 오자현 
 * 기능 구현- 오자현
 * 관리자에서 신고글을 처리하는 컴포넌트
 * 
 */
import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, TextField } from '@mui/material';
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import styled from "styled-components";

// 신고 처리 순서
// 1. 신고내역 진입 후 관리의 처리 버튼 클릭으로 처리 페이지 진입
// 2. 처리 내역 작성 후 처리 완료

const AdminBoardReportManagement = ({ reportID, onCancel }) => {
    const [cookies] = useCookies(["user"]);
    const [totalData, setTotalData] = useState({
        board_content: "",       // 게시판 글 내용
        board_date: "",          // 게시글 작성 날짜
        board_id: "",            // 게시글 ID (고유 식별자)
        board_last_modified: "", // 게시글 마지막 수정 날짜
        board_like: "",          // 게시글의 좋아요 수
        board_status: "",        // 게시글의 상태 (예: 공개/비공개 등)
        board_title: "",         // 게시글 제목
        board_view: "",          // 게시글 조회수
        board_writer: "",        // 게시글 작성자

        report_content: "",      // 신고 내용 (신고자가 작성한 내용)
        report_date: "",         // 신고 날짜
        report_id: "",           // 신고 ID (고유 식별자)
        report_resolution: "",   // 신고 처리 사유 (관리자가 입력하는 처리 사유)
        report_status: "",       // 신고 상태 (예: 처리됨, 처리 중, 무시 등)
        report_type: "",         // 신고 유형 (예: 스팸, 부적절한 내용 등)
        report_writer: "",       // 신고자 (신고한 사용자)
        resolved_at: ""          // 신고가 처리된 날짜 (처리 완료 시점)
    });


    // 신고글을 불러오는 함수
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/report/fetch/${reportID}`);
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

    // 입력창에서 value가 변경되면 totalData에 저장하는 함수
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTotalData({ ...totalData, [name]: value });
    };

    // 게시글 삭제 함수
    const handleDelete = async () => {
        // 처리 사유가 없으면 동작하지 않도록 유효성 검사
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
            const response = await fetch(`/api/report/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...totalData,  // totalData에 포함된 처리 사유와 기타 정보 전송
                    action: 'delete'  // 삭제를 명시하는 플래그를 보낼 수 있음
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

    // 신고 무시 함수
    const handleIgnore = async () => {
        // 처리 사유가 없으면 동작하지 않도록 유효성 검사
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
            const response = await fetch(`/api/report/ignore`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...totalData,  // totalData에 포함된 처리 사유와 기타 정보 전송
                    action: 'ignore'  // 무시를 명시하는 플래그를 보낼 수 있음
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