/**
 * 파일생성자 - 오자현 
 * 게시판 상세페이지 ui
 */
import React from "react";
import { Grid, Button, Typography, Box, Accordion, AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import { Visibility as VisibilityIcon, ThumbUp as ThumbUpIcon, FavoriteBorder as FavoriteBorderIcon, Favorite as FavoriteIcon, CalendarToday as CalendarTodayIcon, ExpandMore as ExpandMoreIcon, NoteAlt } from '@mui/icons-material';
import { useCookies } from "react-cookie";
import { useSideBoardData } from "./hooks/useSideBoardData";
import styled from "styled-components";
import { YuhanBoardComment } from "../../../../common/components/board/YuhanBoardCommnet";
import { AttachmemtAccordion, AttachmemtAccordionDetails, AttachmemtAccordionSummary, AttachmentLink, AttachmentsContainer, BackButton, ButtonContainer, DeleteButton, ButtonRightContainer, UpdateButton } from "../../../../common/components/board/YuhanBoardCommonStyles";

const SideBoardPage = ({ boardId, onCancel, onSelectUpdateItem, handleReportItem }) => {
    const [cookies] = useCookies(["user"]);
    const { boardData, attachments, loading, error, liked, comment, handleDeleteItem, handleLikeToggle, handleDownload } = useSideBoardData(boardId);

    // 로딩 또는 에러 상태 처리
    if (loading) return <Typography>로딩 중...</Typography>;
    if (error) return <Typography>오류 발생: {error}</Typography>;

    return (
        <BoardLayout>

            {/* 버튼구역 */}
            <ButtonContainer>
                <BackButton onClick={onCancel}>돌아가기</BackButton>
                <ButtonRightContainer>
                    {(cookies.user === boardData.board_writer) && (
                        <>
                            <UpdateButton onClick={() => onSelectUpdateItem(boardData.board_id)}>수정</UpdateButton>
                            <DeleteButton
                                onClick={async () => {
                                    const isDeleted = await handleDeleteItem();
                                    if (isDeleted) {
                                        onCancel();
                                    }
                                }}
                            >
                                삭제
                            </DeleteButton>
                        </>
                    )}

                    {(cookies.userType === 'admin') && cookies.user !== boardData.board_writer && (
                        <DeleteButton
                            onClick={async () => {
                                const isDeleted = await handleDeleteItem();
                                if (isDeleted) {
                                    onCancel();
                                }
                            }}
                        >
                            삭제
                        </DeleteButton>
                    )}

                    {(cookies.userType !== 'admin') && (cookies.user) && (cookies.user !== boardData.board_writer) && (
                        <DeleteButton onClick={() => handleReportItem(boardData.board_id, boardData.board_title)}>
                            신고
                        </DeleteButton>
                    )}
                </ButtonRightContainer>
            </ButtonContainer>

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
                <Grid item xs={12} container alignItems="center">
                    <SubProfileInfo>
                        작성일 : {' '}
                        {new Intl.DateTimeFormat('ko-KR', {
                            year: 'numeric', month: '2-digit', day: '2-digit',
                            hour: '2-digit', minute: '2-digit', hour12: false
                        }).format(new Date(boardData.board_date))}
                    </SubProfileInfo>
                    <SubProfileInfo>
                        조회 {boardData.board_view}
                    </SubProfileInfo>
                    <SubProfileInfo style={{ marginLeft: 'auto' }}>
                        수정일 : {' '}
                        {new Intl.DateTimeFormat('ko-KR', {
                            year: 'numeric', month: '2-digit', day: '2-digit',
                            hour: '2-digit', minute: '2-digit', hour12: false
                        }).format(new Date(boardData.board_last_modified))}
                    </SubProfileInfo>
                </Grid>

            </Grid>
            <Divider />
            {/* 첨부파일 영역 */}
            <AttachmentsContainer>
                {attachments.length > 0 ? (
                    <AttachmemtAccordion>
                        <AttachmemtAccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            첨부파일
                        </AttachmemtAccordionSummary>
                        <AttachmemtAccordionDetails>
                            {attachments.map((attachment, index) => {
                                const displayName = attachment.file_name.length > 15
                                    ? attachment.file_name.slice(0, 10) + "..."
                                    : attachment.file_name;

                                return (
                                    <AttachmentLink
                                        key={index}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleDownload(
                                                attachment.file_name,
                                                attachment.file_data,
                                                attachment.file_type
                                            );
                                        }}
                                    >
                                        {displayName}
                                    </AttachmentLink>
                                );
                            })}
                        </AttachmemtAccordionDetails>
                    </AttachmemtAccordion>
                ) : (
                    <></>
                )}
            </AttachmentsContainer>

            {/* 내용 영역 */}
            <ReportedBoardContent>
                {boardData.board_content}
            </ReportedBoardContent>

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
            {/* 댓글 */}
            <YuhanBoardComment boardData={boardData} />
        </BoardLayout >
    );
};

export default SideBoardPage;

const BoardLayout = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 2vh;
    
    .header {
        color: white;
    }

    .container {
        margin: 0 auto;
    }
`;

const ReportedBoardContent = styled(Grid)`
  margin-bottom: 2vh;
  padding: 1vh 1vw;
  border-radius: 0.5vh;
  box-shadow: 0 0.4vh 0.8vh rgba(0, 0, 0, 0.1);
  min-height: 15vh;
  max-height: 40vh;
  overflow-y: auto;
  white-space: pre-line;
  color: #2C3E50;
  word-wrap: break-word;
`;

const SubProfileInfo = styled(Typography)`
    color: #7F8C8D;
    font-size: 0.9rem !important;
    display: inline-block;
    margin-right: 10px !important;
`;