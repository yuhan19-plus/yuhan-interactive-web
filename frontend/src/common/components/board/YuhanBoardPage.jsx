import React, { useState } from "react";
import { Grid, Button, Typography, Box } from "@mui/material";
import { Visibility as VisibilityIcon, ThumbUp as ThumbUpIcon, FavoriteBorder as FavoriteBorderIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import { useCookies } from "react-cookie";
import { useBoardData } from "./hooks/useBoardData";
import styled from "styled-components";

// 코드가 너무 길어져서 훅과 ui로 분리
const YuhanBoardPage = ({ boardId, onCancel, onSelectUpdateItem }) => {
    const [cookies] = useCookies(["user"]);
    const { boardData, attachments, loading, error, liked, handleDeleteItem, handleLikeToggle } = useBoardData(boardId);
    
    // 로딩 또는 에러 상태 처리
    if (loading) return <Typography>로딩 중...</Typography>;
    if (error) return <Typography>오류 발생: {error}</Typography>;

    return (
        <BoardLayout>
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

                    {/* 수정 및 삭제 버튼 */}
                    {(cookies.user === "admin" || (cookies.user === boardData.board_writer)) && (
                        <Grid item>
                            <Button
                                variant="outlined"
                                size="medium"
                                sx={{
                                    marginRight: "1vw",
                                    color: "#3498db",
                                    borderColor: "#3498db",
                                    '&:hover': {
                                        backgroundColor: "#3498db",
                                        color: "#ffffff"
                                    }
                                }}
                                onClick={() => onSelectUpdateItem(boardData.board_id)}
                            >
                                수정
                            </Button>
                            <Button
                                variant="outlined"
                                size="medium"
                                color="error"
                                sx={{
                                    marginRight: "1vw",
                                    borderColor: "#e74c3c",
                                    '&:hover': {
                                        backgroundColor: "#e74c3c",
                                        color: "#ffffff"
                                    }
                                }}
                                onClick={handleDeleteItem}
                            >
                                삭제
                            </Button>
                        </Grid>
                    )}
                </Grid>


                <Grid container sx={{ marginTop: "10px", border: "1px solid #ccc", borderRadius: "8px", padding: "20px" }}>
                    {/* 제목과 작성자 영역 */}
                    <Grid item xs={9}>
                        <Typography variant="h5" sx={{ color: "#34495E", fontWeight: "bold", fontSize: "2rem" }}>
                            {boardData.board_title}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: "right" }}>
                        <Typography variant="h6" sx={{ color: "#7F8C8D" }}>
                            작성자ID {boardData.board_writer}
                        </Typography>
                    </Grid>

                    {/* 추가 정보 영역 */}
                    <Grid item xs={4}>
                        <Typography>
                            <VisibilityIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                            : {boardData.board_view}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            <ThumbUpIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                            : {boardData.board_like}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            작성일: {new Intl.DateTimeFormat('ko-KR', {
                                year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
                            }).format(new Date(boardData.board_date))}
                        </Typography>
                    </Grid>

                </Grid>

                {/* 첨부파일 영역 */}
                <Grid item xs={12} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}>
                    <Grid container spacing={2}>
                        {attachments.length > 0 ? (
                            <>
                                <Grid item xs={12}>
                                    <Typography variant="body1" sx={{ fontWeight: "bold", color: "#2C3E50" }}>
                                        첨부파일
                                    </Typography>
                                </Grid>
                                {attachments.map((attachment, index) => {
                                    const displayName = attachment.file_name.length > 15
                                        ? attachment.file_name.slice(0, 15) + "..."
                                        : attachment.file_name;

                                    return (
                                        <Grid item xs={2} key={index}>
                                            <Typography
                                                variant="body1"
                                                sx={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}
                                            >
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
                                                    style={{ textDecoration: "underline", color: "#2980B9" }}
                                                >
                                                    {displayName}
                                                </a>
                                            </Typography>
                                        </Grid>
                                    );
                                })}
                            </>
                        ) : (
                            <Grid item xs={12}>
                                <Typography variant="body1" sx={{ color: "#E74C3C" }}>
                                    첨부파일이 없습니다.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                {/* 내용 영역 */}
                <Grid
                    item xs={12}
                    sx={{
                        marginBottom: "2vh",
                        padding: "1vh 1vw",
                        borderRadius: "0.5vh",
                        boxShadow: "0 0.4vh 0.8vh rgba(0, 0, 0, 0.1)",
                        minHeight: "15vh",
                        maxHeight: "40vh",
                        overflowY: "auto"
                    }}
                >
                    <Typography
                        variant="body1"
                        gutterBottom
                        sx={{
                            lineHeight: "1.8",
                            color: "#2C3E50",
                            wordWrap: "break-word",
                            whiteSpace: "pre-line"
                        }}
                    >
                        {boardData.board_content}
                    </Typography>
                </Grid>

                {/* 좋아요 버튼영역 */}
                <Grid>
                    <Button
                        onClick={handleLikeToggle}
                        sx={{
                            color: liked ? '#e74c3c' : '#7f8c8d', // 좋아요 상태에 따른 색상 변경
                        }}
                        startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />} // 아이콘 조건부 렌더링
                    >
                        {liked ? '좋아요 취소' : '좋아요'}
                    </Button>
                </Grid>
            </Box>
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
