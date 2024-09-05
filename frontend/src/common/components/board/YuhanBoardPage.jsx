import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Box } from "@mui/material";
import styled from "styled-components";


// 돌아가기 버튼 또는 게시판 이거 둘중하나로 통일

const YuhanBoardPage = ({ boardId, onCancel, onSelectUpdateItem }) => {
    const board_id = boardId;

    // 읽어온 데이터 관리
    const [boardData, setBoardData] = useState({
        board_id: "",
        board_title: "",
        board_content: "",
        board_writer: "",
        board_date: "",
        board_last_modified: "",
        board_status: "",
        board_view: 0,
        board_like: 0,
        board_comments_count: 0,
        files: [],
    });

    // 삭제는 리스트에서 관리자라면 가능하게 하는 식으로 처리하면 될듯
    const hendleDeleteItem = async (boardId) => {
        // console.log("삭제요청헨들러 진입, board_id", boardId);
        // 삭제하는 것으로 동작하게 백엔드와 연결하기 
        try {
            const response = await fetch(`/api/board/delete/${boardId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("데이터를 삭제하는 것에 실패했습니다.");
            }
        } catch (error) {
            console.error("데이터 삭제하는 중 에러 발생:", error);
        }
        // 삭제 후 리스트로 귀환
        onCancel();
    }

    // attachment 테이블의 데이터를 관리하기 위한 상태
    const [attachments, setAttachments] = useState([]);

    // 데이터 가져오기 함수
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/board/${board_id}`); // 서버에서 ID에 맞는 데이터를 가져옴
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            const data = await response.json();

            // board 데이터 설정
            setBoardData({
                ...data["board"],
                files: data["attachments"] || []  // 첨부파일이 있으면 추가, 없으면 빈 배열
            });
            // attachments 배열 업데이트
            if (data["attachments"]) {
                // console.log("파일 길이는", data["attachments"].length);
                setAttachments(data["attachments"]);  // 첨부파일 데이터를 저장
                // console.log("첨부파일", attachments);
            }

        } catch (error) {
            console.error("데이터 불러오는 중 에러 발생", error);
        }
    };

    const hendleUpdateItem = (boardId) => {
        onSelectUpdateItem(boardId)
    }
    // 첨부파일다운로드 
    const handleDownload = (fileName, fileData, fileType) => {
        try {
            // Buffer의 data 배열을 Uint8Array로 변환하여 Blob 생성
            const arrayBufferView = new Uint8Array(fileData.data);
            const blob = new Blob([arrayBufferView], { type: fileType });
            // console.log("Blob 생성:", blob);

            // Blob을 다운로드 가능한 URL로 변환
            const url = URL.createObjectURL(blob);

            // a 태그를 생성하고 클릭하여 파일 다운로드
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // URL 해제
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("파일 다운로드 중 에러 발생:", error);
        }
    };

    useEffect(() => {
        fetchData();
        // console.log("들어온게시판 id", board_id);

    }, [board_id]);

    return (
        <BoardLayout>
            <BoardMainLayout>
                <Box sx={{ p: 3 }}>
                    <Grid container alignItems="center">
                        {/* 게시판 제목 */}
                        <Grid item xs={8}>
                            <Typography
                                variant="h4"
                                gutterBottom
                                onClick={onCancel}
                                onPointerOver={(e) => (e.target.style.cursor = "pointer")}
                            >
                                게시판
                            </Typography>
                        </Grid>

                        {/* 수정, 삭제 버튼 */}
                        <Grid item xs={4} style={{ textAlign: "right" }}>
                            {boardData.board_writer && (
                                <>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ marginLeft: "5px" }}
                                        onClick={() => hendleUpdateItem(boardData.board_id)}
                                    >
                                        수정
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        sx={{ marginLeft: "5px" }}
                                        onClick={() => hendleDeleteItem(boardData.board_id)}
                                    >
                                        삭제
                                    </Button>
                                </>
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        {/* 제목과 작성자 영역 */}
                        <Grid item xs={9}>
                            <Typography variant="h6" gutterBottom>
                                제목: {boardData.board_title}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom>
                                작성자: {boardData.board_writer}
                            </Typography>
                        </Grid>
                        {/* 회원이 볼 수 있는 속성들 */}
                        <Grid item xs={4}>
                            <Typography>
                                조회수 : {boardData.board_view}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                좋아요 : {boardData.board_like}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                {boardData.board_date ? boardData.board_date.replace('T', ' ').slice(0, 16) : ""}
                            </Typography>
                        </Grid>
                        {/* 첨부파일 영역 */}
                        <Grid item xs={8}>
                            {attachments.length > 0 ? (
                                attachments.map((attachment, index) => (
                                    <Typography key={index} variant="body1">
                                        첨부파일:
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDownload(
                                                    attachment.file_name,
                                                    attachment.file_data,
                                                    attachment.file_type
                                                );
                                            }}
                                            style={{ textDecoration: "none", color: "blue" }}
                                        >
                                            {attachment.file_name}
                                        </a>
                                    </Typography>
                                ))
                            ) : (
                                <Typography variant="body1">첨부파일이 없습니다.</Typography>
                            )}
                        </Grid>

                        {/* 내용 영역 */}
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                                내용: {boardData.board_content}
                            </Typography>
                        </Grid>

                        {/* 돌아가기 버튼 */}
                        <Grid item xs={12} textAlign="right">
                            <Button variant="contained" color="primary" onClick={onCancel}>
                                돌아가기
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </BoardMainLayout>
        </BoardLayout>
    );

};

export default YuhanBoardPage;

const BoardLayout = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    
    .header {
    color: white;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
`;
const BoardMainLayout = styled.div`
`;
