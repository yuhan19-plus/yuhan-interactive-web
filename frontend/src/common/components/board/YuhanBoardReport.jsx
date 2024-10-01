/**
 * 파일생성자 - 오자현 
 * 기능 구현- 오자현
 * 신고컴포넌트 
 * 사용자가 신고정보를 입력하고 신고를 하는 컴포넌트
 */
import React, { useState } from "react";
import { Grid, Typography, Select, MenuItem, TextField, Box, Button } from '@mui/material';
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import styled from "styled-components";

// 신고글을 작성하는 컴포넌트 
const YuhanBoardReport = ({ boardId, boardTitle, onCancel }) => {
    const [cookies] = useCookies(["user"]);
    const [reportData, setReportData] = useState({
        board_id: boardId,
        report_writer: cookies.user,
        report_content: "",
        report_type: "etc", // 기본값을 기타로 설정 

    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReportData({ ...reportData, [name]: value });
    };

    // 신고 함수
    const handleReport = async () => {
        // console.log("수정버튼눌림")
        try {
            const response = await fetch(`/api/report/save/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // JSON 형식으로 데이터 전송
                },
                body: JSON.stringify(reportData), // 수정된 boardData를 서버로 보냄
            });

            if (!response.ok) {
                throw new Error("신고하는 데 실패했습니다.");
            } // 신고 성공 시 SweetAlert2로 성공 메시지 표시
            Swal.fire({
                icon: 'success',
                title: '신고 완료',
                text: '신고가 성공적으로 접수되었습니다.',
                confirmButtonColor: '#3085d6',
            }).then(() => {
                // 성공 후 페이지 이동 or 리스트로 돌아가기
                onCancel();
            });
            // console.log("신고 성공");
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '신고 실패',
                text: '신고 처리 중 문제가 발생했습니다.',
                confirmButtonColor: '#d33',
            });
            console.error("신고 중 에러 발생", error);
        }
    }

    // 게시글 작성내용을 저장하는 함수 저장이 완료되면 다시 리스트로 돌아가도록 onCancle를 호출하기
    return (
        <>
            <Box sx={{
                p: 3,
                height: '100%',
                background: 'white'
            }}>
                {/* 버튼구역 */}
                <Grid container alignItems="center" justifyContent="space-between">
                    {/* 돌아가기 버튼 */}
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
                <StyledGrid container>
                    <StyledTitleTypography variant="h4">
                        신고게시글: {boardTitle}
                    </StyledTitleTypography>
                </StyledGrid>
                <StyledGrid container>
                    <StyledReporterTypography variant="h5">
                        신고자 : {cookies.user}
                    </StyledReporterTypography>
                </StyledGrid>

                {/* 게시글 신고 태그 선택 드롭박스 */}
                <Grid item xs={12} sx={{ marginBottom: "2vh" }}>
                    <Typography variant="subtitle1">신고 유형</Typography>
                    <Select
                        name="report_type"
                        label="신고 유형"
                        defaultValue="etc"
                        fullWidth
                        onChange={handleInputChange}
                    >
                        <MenuItem value="spam">스팸</MenuItem>
                        <MenuItem value="abuse">욕설</MenuItem>
                        <MenuItem value="etc">기타</MenuItem>
                    </Select>
                </Grid>

                {/* 게시글 신고 내용 */}
                <Grid item xs={12}>
                    <Typography variant="subtitle1">신고 내용</Typography>
                    <TextField
                        name="report_content"
                        label="신고 내용을 입력하세요"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} textAlign="right">
                    <StyledDeleteButton
                        variant="contained"
                        onClick={() => { handleReport(); }}
                    >
                        신고하기
                    </StyledDeleteButton>

                </Grid>
            </Box >
        </>
    );
};

export default YuhanBoardReport;

const StyledDeleteButton = styled(Button)`
  margin-right: 1vw !important;
  margin-top: 1vh !important;
  background: linear-gradient(45deg, #e74c3c 30%, #f1c40f 90%);
  border-color: #e74c3c;
  color: #ffffff;

  &:hover {
    background-color: #c0392b !important;
    color: #ffffff;
  }
`;

const StyledGrid = styled(Grid)`
  margin-top: 0.5vh;
  padding: 0.5vw;
`;

const StyledTitleTypography = styled(Typography)`
  color: #ee2e2e;
  font-weight: bold !important;
  font-size: 2.5rem !important; 
`;

const StyledReporterTypography = styled(Typography)`
  color: #ee2e2e;
  font-weight: bold !important;
  font-size: 2rem !important;
`;

const StyledBackButton = styled(Button)`
  background-color: #2ecc71 !important;
  padding: 0.5vh 2vw !important;
  
  &:hover {
    background-color: #27ae60 !important;
  }
`;