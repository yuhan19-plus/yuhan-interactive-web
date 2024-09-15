/**
 * 파일생성자 - 오자현 
 * 기능 구현- 오자현
 * 신고컴포넌트 
 * 사용자가 신고정보를 입력하고 신고를 하는 컴포넌트
 */
import React, { useState } from "react";
import { Grid, Typography, Select, MenuItem, TextField, Box, Button } from '@mui/material';
import { useCookies } from "react-cookie";

// 신고글을 작성하는 컴포넌트 
// 신고는 수정불가
// 신고처리는 관리자게시판list에 신고처리 버튼을 두고 거기서 해결하게 하기
// 신고하기 누르면 진짜 신고하냐고 한번 물어보고 거기서도 확인을 눌러야 요청을 보내자

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

    // 신고하기 백으로 잘 보내는 것까지 확인
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
            }
            onCancel();
            console.log("신고 성공");
        } catch (error) {
            console.error("신고 중 에러 발생", error);
        }
    }

    // 게시글 작성내용을 저장하는 함수 저장이 완료되면 다시 리스트로 돌아가도록 onCancle를 호출하기
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
                <Grid container sx={{ marginTop: "0.5vh", padding: "0.5vw" }}>
                    <Typography variant="h2" sx={{ color: "#ee2e2e", fontWeight: "bold", fontSize: "2.5rem" }}>
                        신고게시물 제목: {boardTitle}
                    </Typography>
                </Grid>
                <Grid container sx={{ marginTop: "0.5vh", padding: "0.5vw" }}>
                    <Typography variant="h2" sx={{ color: "#ee2e2e", fontWeight: "bold", fontSize: "2rem" }}>
                        신고자 : {cookies.user}
                    </Typography>
                </Grid>

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
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            background: 'linear-gradient(45deg, #e74c3c 30%, #f1c40f 90%)', // 빨간색(#e74c3c)과 노란색(#f1c40f)의 그라데이션
                            '&:hover': {
                                backgroundColor: "#c0392b",  // 호버 시 어두운 빨간색
                            }
                        }}
                        onClick={() => { handleReport(); }}
                    >
                        신고하기
                    </Button>

                </Grid>
            </Box>
        </>
    );
};

export default YuhanBoardReport;
