/**
 * 파일생성자 - 오자현 
 * 댓글 컴포넌트 
 * 댓글 삭제는 작성자와 관리자가 가능함
 * 
 * 기능 구현 - 오자현
 * - 댓글 저장, 삭제, 조회, 댓글정렬, 페이지게이션 기능
 */
import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, ListItemButton, Button, TextField, Pagination, Box, Divider } from "@mui/material";
import { useCookies } from "react-cookie";
import { CalendarToday, NoteAlt } from '@mui/icons-material';
import Swal from 'sweetalert2';
import styled from 'styled-components';

export const YuhanBoardComment = ({ boardData }) => {
    const [cookies] = useCookies(["user"]);  // 쿠키에서 user 정보 가져오기

    const boardID = boardData.board_id;

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState({
        comment_id: "",
        board_id: boardID, // 진입시 들어온 boardData로 게시판id 연결
        comment_writer: cookies.user, // 쿠키로 로그인중인 사용자 id 잡음
        comment_content: "",
    });

    const sortCriteria = 'comment_date';
    const pageNum = 8; // 한 페이지에서 볼 댓글의 수

    // 입력값변경핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setComment({ ...comment, [name]: value });
    };

    // 댓글 저장핸들러
    const handleSaveComment = async () => {
        // console.log("댓글데이터체크", comment.comment_content)
        if (!comment.comment_content.trim()) {
            Swal.fire({
                icon: 'warning',
                title: '입력 오류',
                text: '댓글 내용을 입력해주세요.',
                confirmButtonColor: '#3085d6',
            });
            return;
        }
        try {
            const response = await fetch("/api/boardComment/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: cookies.user,
                    boardID: boardID,
                    comment_content: comment.comment_content,
                }),
            });
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            comment.comment_content = "";
            // console.log(comment.comment_content)
            fetchComment();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '댓글 저장 실패',
                text: '댓글을 저장하는 중 문제가 발생했습니다.',
                confirmButtonColor: '#d33',
            });
            console.error(error.message);
        }
    };

    // 댓글 삭제 핸들러
    const handleDeleteComment = async (comment_id) => {
        const commentId = comment_id;
        try {
            const response = await fetch(`/api/boardComment/delete?commentId=${commentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            fetchComment();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '댓글 삭제 실패',
                text: '댓글을 삭제하는 중 문제가 발생했습니다.',
                confirmButtonColor: '#d33',
            });
            console.error(error.message);
        }
    };

    // 페이지변경핸들러
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // 댓글 날짜순 정렬 함수
    const getCurrentPageData = () => {
        const sortedData = [...commentList].sort((a, b) => {
            let compareA = a[sortCriteria];
            let compareB = b[sortCriteria];

            // 날짜비교 Date 객체로 변환하여 비교
            if (sortCriteria === 'comment_date') {
                compareA = new Date(a[sortCriteria]);
                compareB = new Date(b[sortCriteria]);
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

    // 목록 불러오기
    const fetchComment = async () => {
        try {
            const response = await fetch(`/api/boardComment/List/${boardID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            const data = await response.json();
            // console.log("들어온 데이터", data);
            setCommentList(data);
        } catch (error) {
            console.error("댓글 목록을 불러오는 중 에러 발생:", error);
        }
    };

    useEffect(() => {
        fetchComment(boardID);
    }, [boardID]);

    useEffect(() => {
        setTotalPages(Math.ceil(commentList.length / pageNum));
    }, [commentList]);

    return (
        <>
            {/* 댓글영역 */}
            <CommentListWrapper>
                <CountCommentText>
                    댓글 {commentList.length}
                </CountCommentText>
                <CommentListContainer>
                    {commentList.length !== 0 ? (
                        getCurrentPageData().map((item, index) => (
                            <List key={item.comment_id}>
                                <CommentListItem>
                                    <CommentInfoContainer>
                                        <CommentIconTextContainer>
                                            <NoteAlt />
                                            <CommentWriter>
                                                {item.comment_writer}
                                            </CommentWriter>
                                        </CommentIconTextContainer>

                                        {cookies.user &&
                                            (cookies.user === item.comment_writer || cookies.userType === "admin") && (
                                                <DeleteButtonWrapper>
                                                    <Button onClick={() => handleDeleteComment(item.comment_id)}>
                                                        삭제
                                                    </Button>
                                                </DeleteButtonWrapper>
                                            )
                                        }
                                    </CommentInfoContainer>

                                    <CommentArea>
                                        {item.comment_content}
                                    </CommentArea>

                                    <DateArea>
                                        <CommentIconTextContainer>
                                            <CalendarToday />
                                            {new Date(item.comment_date).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })}
                                        </CommentIconTextContainer>
                                    </DateArea>
                                </CommentListItem>
                                <Divider />
                            </List>
                        ))

                    ) : (
                        <></>
                    )}
                </CommentListContainer>
            </CommentListWrapper>

            {/* 페이지게이션 */}
            {commentList.length !== 0 ? (
                <PaginationContainer>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </PaginationContainer>
            ) : (
                <></>
            )}
            {/* 댓글작성영역 */}
            {(cookies.user && boardData.board_status !== 'delete') && (
                <InputCommentContainer>
                    <InputComment
                        name="comment_content"
                        value={comment.comment_content}
                        onChange={handleInputChange}
                    />

                    <SubmitButton onClick={() => handleSaveComment(boardData.board_id)}                            >
                        작성하기
                    </SubmitButton>
                </InputCommentContainer>
            )}
        </>
    );
};

const CommentListWrapper = styled.div`
    margin-top: 2vh;
`;

const CountCommentText = styled(Typography)`
    font-variant:h5;
    font-weight:bold;
`
const CommentListContainer = styled.div`
    width: 100%;
    flex-direction: column;
`;

const CommentListItem = styled(ListItem)`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 0;

    svg {
        color: var(--main-color);
    }
`
const CommentInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`
const CommentArea = styled.div`
    width: 100%;
    border-radius: 0.5vh;
    background-color: var(--main-color);
    color: var(--sub-color);
    padding: 2vh;
`
const CommentWriter = styled.div`
    
`
const CommentIconTextContainer = styled.div`
    display: flex;
    align-items: center;
`;
const DeleteButtonWrapper = styled.div`
    margin-left: auto;
`;
const DateArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start; // 왼쪽 정렬
    width: 100%;
    margin-top: 0.2vh;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3;
    position: relative;
`
const InputCommentContainer = styled.div`
    display: flex;
    margin-top: 1.5vh;
    align-items:center;
`
const InputComment = styled(TextField).attrs({
    multiline: true,
    fullWidth: true,
    minRows: 2,
    maxRows: 4,
    placeholder: "원하시는 댓글을 작성하세요",
})`
    background-color: var(--main-color);
    border-radius: 0.5vh;
    height: 10vh;
    width:100%;
  
    & .MuiInputBase-input::placeholder {
      color: var(--sub-color);
    }
  
    & .MuiInputBase-input {
      color: var(--sub-color);
    }
  `;
const SubmitButton = styled(Button)`
    margin-left: 0.5vw !important;
    width: 7.5vw ;
    height: 10vh;
    font-size: 1rem !important;
    background-color: var(--main-color) !important;
    color: var(--sub-color) !important;
  &:hover {
    background-color: #325db8 !important;
  }
`;  