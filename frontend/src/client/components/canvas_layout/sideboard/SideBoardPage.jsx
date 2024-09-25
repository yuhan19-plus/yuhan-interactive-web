/**
 * 파일생성자 - 오자현 
 * 기능 구현- 오자현
 * 게시판상세페이지 ui
 * 좋아요, 수정, 삭제, 신고 기능
 */
import React from "react";
import { Grid, Button, Typography, Box, Accordion, AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import {
    Visibility as VisibilityIcon, ThumbUp as ThumbUpIcon, FavoriteBorder as FavoriteBorderIcon, Favorite as FavoriteIcon,
    CalendarToday as CalendarTodayIcon, ExpandMore as ExpandMoreIcon,
    NoteAlt
} from '@mui/icons-material';
import { useCookies } from "react-cookie";
import { useBoardData } from "./hooks/useBoardData";
import styled from "styled-components";
import { YuhanBoardComment } from "../../../../common/components/board/YuhanBoardCommnet";

// 코드가 너무 길어져서 훅과 ui로 분리
const SideBoardPage = ({ boardId, onCancel, onSelectUpdateItem, handleReportItem }) => {
    const [cookies] = useCookies(["user"]);
    const { boardData, attachments, loading, error, liked, comment, handleDeleteItem, handleLikeToggle, handleDownload } = useBoardData(boardId);


    // 로딩 또는 에러 상태 처리
    if (loading) return <Typography>로딩 중...</Typography>;
    if (error) return <Typography>오류 발생: {error}</Typography>;

    return (
        <BoardLayout>
            {/* background 맨뒤 cc는 투명도 */}
            <Box sx={{ p: 3, background: "#ffffffcc", }}>
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
                    <Grid item>
                        {/* 작성자는 수정 및 삭제에 모두 접근 가능 */}
                        {(cookies.user === boardData.board_writer) && (
                            <>
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
                                    onClick={async () => {
                                        const isDeleted = await handleDeleteItem();  // 삭제 작업 수행
                                        if (isDeleted) {
                                            onCancel();  // 삭제 성공 시 onCancel 호출
                                        }
                                    }}
                                >
                                    삭제
                                </Button>
                            </>
                        )}

                        {/* 관리자는 삭제에만 접근 가능 */}
                        {(cookies.user === 'testadmin') && cookies.user !== boardData.board_writer && (
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
                                onClick={async () => {
                                    const isDeleted = await handleDeleteItem();  // 삭제 작업 수행
                                    if (isDeleted) {
                                        onCancel();  // 삭제 성공 시 onCancel 호출
                                    }
                                }}
                            >
                                삭제
                            </Button>
                        )}
                    </Grid>

                    {/* 신고버튼 관리자는 신고할 필요없이 그냥 삭제 */}
                    {(cookies.user !== 'testadmin') && (cookies.user) && (cookies.user !== boardData.board_writer) && (
                        <Grid item>
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
                                onClick={() => handleReportItem(boardData.board_id, boardData.board_title)}
                            >
                                신고
                            </Button>
                        </Grid>
                    )}
                </Grid>

                {/* 제목영역 */}
                <Grid container sx={{ marginTop: "0.5vh", padding: "0.5vw" }}>
                    <Typography variant="h2" sx={{ color: "#34495E", fontWeight: "bold", fontSize: "2.5rem" }}>
                        {boardData.board_title}
                    </Typography>
                </Grid>

                {/* 추가 정보 영역 */}
                <Grid container sx={{ padding: "0.25vw" }}>
                    {/* 작성자 이름 */}
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                        <NoteAlt sx={{ color: '#0F275C', marginRight: '0.5rem' }} />
                        <Typography variant="h6" sx={{ color: "#7F8C8D", fontSize: "1.25rem" }}>
                            {boardData.board_writer}
                        </Typography>
                    </Grid>

                    {/* 작성일과 조회수 */}
                    <Grid item xs={12}>
                        <Typography sx={{ color: "#7F8C8D", fontSize: "0.9rem", display: 'inline-block', marginRight: '10px' }}>
                            {new Intl.DateTimeFormat('ko-KR', {
                                year: 'numeric', month: '2-digit', day: '2-digit',
                                hour: '2-digit', minute: '2-digit', hour12: false
                            }).format(new Date(boardData.board_date))}
                        </Typography>
                        <Typography sx={{ color: "#7F8C8D", fontSize: "0.9rem", display: 'inline-block' }}>
                            조회 {boardData.board_view}
                        </Typography>
                    </Grid>

                </Grid>
                <Divider />
                {/* 첨부파일 영역 */}
                <div style={{ padding: "1vw", display: "flex", justifyContent: "flex-end" }}>
                    {attachments.length > 0 ? (
                        <Accordion sx={{ border: 'none', boxShadow: 'none', outline: 'none' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ fontSize: '1.2rem' }}
                            >
                                첨부파일
                            </AccordionSummary>
                            <AccordionDetails style={{
                                background:"#ffffff", display: "flex", flexWrap: "wrap", flexDirection: "column", gap: "5px", position: "absolute", zIndex: 10
                            }}>
                                {attachments.map((attachment, index) => {
                                    const displayName = attachment.file_name.length > 15
                                        ? attachment.file_name.slice(0, 10) + "..."
                                        : attachment.file_name;

                                    return (
                                        <div key={index} style={{ width: "auto", textAlign: "center" }}>
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
                                                style={{ color: "#2980B9" }}
                                            >
                                                {displayName}
                                            </a>
                                        </div>
                                    );
                                })}
                            </AccordionDetails>
                        </Accordion>
                    ) : (
                        // 없으면 비어있게 처리
                        <></>
                    )}
                </div>

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
                        overflowY: "auto",
                        whiteSpace: "pre-line",
                        color: "#2C3E50",
                        wordWrap: "break-word",
                    }}
                >
                    {boardData.board_content}
                </Grid>

                {/* 좋아요 버튼영역 */}
                <Grid>
                    <Button
                        onClick={handleLikeToggle}
                        sx={{
                            color: liked ? '#e74c3c' : '#e74c3c', // 좋아요 상태에 따른 색상 변경
                        }}
                        startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />} // 아이콘 조건부 렌더링
                    >
                        {liked ? '좋아요' : '좋아요'}  {boardData.board_like}
                    </Button>
                </Grid>
                <Divider />
                {/* 댓글 컴포넌츠로 추출 */}
                <YuhanBoardComment boardData={boardData} />
            </Box>
        </BoardLayout >
    );
};

export default SideBoardPage;

const BoardLayout = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: white;
    
    .header {
        color: white;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
`;
