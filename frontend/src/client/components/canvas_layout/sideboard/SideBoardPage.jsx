/**
 * 파일생성자 - 오자현 
 * 기능 구현- 오자현
 * 게시판상세페이지 ui
 * 좋아요, 수정, 삭제, 신고 기능
 */
import React from "react";
import { Grid, Button, Typography, Box, Accordion, AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import { Visibility as VisibilityIcon, ThumbUp as ThumbUpIcon, FavoriteBorder as FavoriteBorderIcon, Favorite as FavoriteIcon, CalendarToday as CalendarTodayIcon, ExpandMore as ExpandMoreIcon, NoteAlt } from '@mui/icons-material';
import { useCookies } from "react-cookie";
import { useBoardData } from "./hooks/useBoardData";
import styled from "styled-components";
import { YuhanBoardComment } from "../../../../common/components/board/YuhanBoardCommnet";

const SideBoardPage = ({ boardId, onCancel, onSelectUpdateItem, handleReportItem }) => {
    const [cookies] = useCookies(["user"]);
    const { boardData, attachments, loading, error, liked, comment, handleDeleteItem, handleLikeToggle, handleDownload } = useBoardData(boardId);

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
                        <StyledBackButton
                            variant="contained"
                            size="medium"
                            color="primary"
                            onClick={onCancel}
                        >
                            돌아가기
                        </StyledBackButton>
                    </Grid>

                    {/* 수정 및 삭제 버튼 */}
                    <Grid item>
                        {/* 작성자는 수정 및 삭제에 모두 접근 가능 */}
                        {(cookies.user === boardData.board_writer) && (
                            <>
                                <StyledUpdateButton
                                    variant="outlined"
                                    size="medium"
                                    onClick={() => onSelectUpdateItem(boardData.board_id)}
                                >
                                    수정
                                </StyledUpdateButton>
                                <StyledDeleteButton
                                    variant="outlined"
                                    size="medium"
                                    color="error"
                                    onClick={async () => {
                                        const isDeleted = await handleDeleteItem();  // 삭제 작업 수행
                                        if (isDeleted) {
                                            onCancel();  // 삭제 성공 시 onCancel 호출
                                        }
                                    }}
                                >
                                    삭제
                                </StyledDeleteButton>
                            </>
                        )}

                        {/* 관리자는 삭제에만 접근 가능 */}
                        {(cookies.userType === 'admin') && cookies.user !== boardData.board_writer && (
                            <StyledDeleteButton
                                variant="outlined"
                                size="medium"
                                color="error"
                                onClick={async () => {
                                    const isDeleted = await handleDeleteItem();  // 삭제 작업 수행
                                    if (isDeleted) {
                                        onCancel();  // 삭제 성공 시 onCancel 호출
                                    }
                                }}
                            >
                                삭제
                            </StyledDeleteButton>
                        )}
                    </Grid>

                    {/* 신고버튼 관리자는 신고할 필요없이 그냥 삭제 */}
                    {(cookies.userType !== 'admin') && (cookies.user) && (cookies.user !== boardData.board_writer) && (
                        <Grid item>
                            <StyledDeleteButton
                                variant="outlined"
                                size="medium"
                                color="error"
                                onClick={() => handleReportItem(boardData.board_id, boardData.board_title)}
                            >
                                신고
                            </StyledDeleteButton>
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
                        <StyledAccordion>
                            <StyledAccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                첨부파일
                            </StyledAccordionSummary>
                            <StyledAccordionDetails>
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
                            </StyledAccordionDetails>
                        </StyledAccordion>
                    ) : (
                        <></>
                    )}
                </AttachmentsContainer>

                {/* 내용 영역 */}
                <StyledGridItem>
                    {boardData.board_content}
                </StyledGridItem>

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
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 2vh;
    
    .header {
        color: white;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
`;

const StyledUpdateButton = styled(Button)`
  margin-right: 1vw !important;
  color: #3498db;
  border-color: #3498db;
  
  &:hover {
    background-color: #3498db !important;
    color: #ffffff;
  }
`;

const StyledDeleteButton = styled(Button)`
  margin-right: 1vw !important;
  border-color: #e74c3c;
  
  &:hover {
    background-color: #e74c3c !important;
    color: #ffffff;
  }
`;


const AttachmentsContainer = styled.div`
  padding: 1vw;
  display: flex;
  justify-content: flex-end;
`;

const StyledAccordion = styled(Accordion)`
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  font-size: 1.1rem;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  background: #ffffff;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0.25vh;
  position: absolute;
  z-index: 10;
`;

const AttachmentLink = styled.a`
  color: #2980B9;
  text-align: center;
  display: block;
  width: auto;
`;

const StyledGridItem = styled(Grid)`
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
const StyledBackButton = styled(Button)`
  background-color: #2ecc71 !important;
  padding: 0.5vh 2vw !important;
  
  &:hover {
    background-color: #27ae60 !important;
  }
`;

const SubProfileInfo = styled(Typography)`
    color: #7F8C8D;
    font-size: 0.9rem !important;
    display: inline-block;
    margin-right: 10px !important;
`;