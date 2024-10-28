/**
 * 파일생성자 - 오자현 
 * 기능 구현- 오자현
 * 댓글 컴포넌트 
 * 댓글 저장, 삭제기능
 */
import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, ListItemButton, Button, TextField, Pagination, Box, Divider } from "@mui/material";
import { useCookies } from "react-cookie";
import { CalendarToday, NoteAlt } from '@mui/icons-material';
import Swal from 'sweetalert2';
import styled from 'styled-components';

export const YuhanBoardComment = ({ boardData }) => {
    // console.log(boardID)
    const [cookies] = useCookies(["user"]);  // 쿠키에서 user 정보 가져오기
    const boardID = boardData.board_id;
    const [sortCriteria, setSortCriteria] = useState('comment_date'); // 기본 정렬 기준
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageNum = 8; // 한 페이지에서 볼 댓글의 수
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState({
        comment_id: "",
        board_id: boardID, // 진입시들어온 boardData로 게시판id 연결
        comment_writer: cookies.user, // 쿠키로 로그인중인 사용자 id 잡음
        comment_content: "",
    });

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
            const response = await fetch("/api/comment/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: cookies.user,   // 현재 사용자 ID
                    boardID: boardID,       // 현재 게시물 ID
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
            const response = await fetch(`/api/comment/delete?commentId=${commentId}`, {
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

    // 댓글 정렬 함수
    const getCurrentPageData = () => {
        const targetWriter = 'admin'; // 관리자 또는 특정 유저 우선순위
        const sortedData = [...commentList].sort((a, b) => {
            let compareA = a[sortCriteria];
            let compareB = b[sortCriteria];

            // 관리자가 작성한 글 우선순위 부여
            if (a.comment_writer === targetWriter && b.comment_writer !== targetWriter) {
                return -1; // a를 더 앞에 배치
            }
            if (a.comment_writer !== targetWriter && b.comment_writer === targetWriter) {
                return 1;  // b를 더 앞에 배치
            }

            // 상태 순 정렬일 경우 우선순위 부여 (오름차순으로 처리)
            if (sortCriteria === 'comment_status') {
                const statusPriority = (status) => {
                    if (status === 'active') return 1;
                    if (status === 'delete') return 2;
                    return 3; // 그 외 상태의 기본 우선순위
                };

                compareA = statusPriority(a.comment_status);
                compareB = statusPriority(b.comment_status);

                if (compareA < compareB) return -1; // 오름차순
                if (compareA > compareB) return 1;
                return 0;
            }

            // 날짜일 경우 Date 객체로 변환하여 비교
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
            const response = await fetch(`/api/comment/List/${boardID}`, {
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
            setCommentList(data); // 받아온 데이터를 상태에 설정
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
            {/* 읽어들인 댓글이 보여지는 영역 */}
            <Grid item xs={12} sx={{ marginTop: "2vh" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    댓글 {commentList.length}
                </Typography>
                <Grid container sx={{ width: "100%" }} direction="column">
                    {commentList.length !== 0 ? (
                        getCurrentPageData().map((item, index) => (
                            <List key={item.comment_id}>
                                <ListItem sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    <Grid container sx={{ marginBottom: "1vh" }}>
                                        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                                            <NoteAlt sx={{ color: '#0F275C' }} />
                                            <ListItemText primary={item.comment_writer} sx={{ marginLeft: "1vh" }} />
                                            <Grid item xs={1}>
                                                {/* 삭제 버튼 */}
                                                {cookies.user &&
                                                    (cookies.user === item.comment_writer || cookies.userType === "admin") &&
                                                    (
                                                        <Grid item xs={12} sx={{ textAlign: "right" }}>
                                                            <ListItemButton onClick={() => handleDeleteComment(item.comment_id)}>
                                                                삭제
                                                            </ListItemButton>
                                                        </Grid>
                                                    )
                                                }
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={11} sx={{ width: "100%" }}>
                                            <StyledContentListItemText
                                                primary={item.comment_content} />
                                        </Grid>

                                        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                                            <CalendarToday sx={{ color: '#0F275C' }} />
                                            <ListItemText
                                                primary={new Date(item.comment_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', })
                                                    + ' '
                                                    + new Date(item.comment_date).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false, })}
                                            />
                                        </Grid>
                                    </Grid>
                                </ListItem>

                                <Divider />
                            </List>
                        ))

                    ) : (
                        <></>
                    )}
                </Grid>
            </Grid>

            {/* 페이지게이션 */}
            {commentList.length !== 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, position: 'relative' }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            ) : (
                <></>
            )}
            {/* 로그인시 댓글작성영역 */}
            {cookies.user && (
                <Grid item xs={12} sx={{ marginTop: "2vh" }}>
                    <Grid container alignItems="center" spacing={0.5}>
                        <Grid item xs={10}>
                            <StyledTextField
                                name="comment_content"
                                placeholder="원하시는 댓글을 작성하세요"
                                multiline
                                minRows={2}
                                maxRows={4}
                                fullWidth
                                value={comment.comment_content}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: '0.5vw' }}>
                            <StyledButton
                                variant="contained"
                                color="primary"
                                onClick={() => handleSaveComment(boardData.board_id)}
                            >
                                작성하기
                            </StyledButton>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

const StyledTextField = styled(TextField)`
  background-color: #0F275C;
  border-radius: 0.5vh;

  & .MuiInputBase-input::placeholder {
    color: #FFFFFF;
  }

  & .MuiInputBase-input {
    color: #FFFFFF;
  }
`;
const StyledButton = styled(Button)`
  padding: 3vh 1vw !important; 
  font-size: 1rem !important;
  background-color: #0F275C !important;

  &:hover {
    background-color: #325db8 !important;;
  }
`;

const StyledContentListItemText = styled(ListItemText)`
  border-radius: 0.5vh;
  background-color: #0F275C;
  color: #FFFFFF;
  padding: 2vh;
`;