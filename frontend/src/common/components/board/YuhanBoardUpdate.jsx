/**
 * 파일생성자 - 오자현 
 * 게시판수정페이지 컴포넌트
 * 
 * 기능 구현 - 오자현
 * - 조회, 게시글 수정, 첨부파일 수정, 첨부파일 다운로드
 */
import React, { useEffect, useRef, useState } from "react";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import styled from "styled-components";
import Swal from "sweetalert2";
import { BackButton, ButtonContainer, ContentContainer, InputContent, InputTitle, SubmitButtonContainer, TitleTypography, TotalSubmitButton } from "./YuhanBoardCommonStyles";

const YuhanBoardUpdate = ({ boardId, onCancel }) => {
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
    // attachment 테이블의 데이터를 관리하기 위한 상태
    const [attachments, setAttachments] = useState([]);
    const [attachmentId, setAttachmentId] = useState(0); // 기존파일의 attachment_id를 받아와 관리하는 상태
    const [fileIndex, setFileIndex] = useState(0); // boardData의 files배열의 수정할 인덱스를 관리하는 상태

    const fileInputRef = useRef(null); // 파일 입력요소 접근용도 ref

    const board_id = boardId;


    // 첨부파일다운로드핸들러
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

    // 게시판 업데이트 핸들러
    const handleUpdateData = async () => {
        if (!boardData.board_title.trim() || !boardData.board_content.trim()) {
            Swal.fire({
                icon: 'warning',
                title: '입력 오류',
                text: '제목과 내용을 모두 입력해주세요.',
                confirmButtonColor: '#3085d6',
            });
            return;
        }

        // console.log("수정버튼눌림")
        try {
            const response = await fetch(`/api/board/update/${board_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", // JSON 형식으로 데이터 전송
                },
                body: JSON.stringify(boardData), // 수정된 boardData를 서버로 보냄
            });

            if (!response.ok) {
                throw new Error("데이터를 수정하는 데 실패했습니다.");
            }
            Swal.fire({
                icon: 'success',
                title: '수정 완료',
                text: '게시물이 성공적으로 수정되었습니다.',
            }).then(() => {
                onCancel(); // 성공 후 페이지 이동
            });
            // console.log("수정 성공");
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '수정 실패',
                text: '데이터 수정 중 오류가 발생했습니다.',
            });
            console.error("데이터 수정 중 에러 발생", error);
        }

    }

    // 입력값핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBoardData({ ...boardData, [name]: value });
    };

    // 파일선택 핸들러
    const handleAttachmentEdit = (attachment_id, index) => {
        setFileIndex(index);
        setAttachmentId(attachment_id);
        // console.log("attachmentId", attachmentId)

        // 파일 선택기 트리거 input태그의 type="file"을 이용
        if (fileInputRef.current) {
            fileInputRef.current.click(); // 파일 선택기 열기
        }
    };

    // 파일변경 핸들러
    const handleFileChange = (e) => {
        // console.log("파일변경 진입 fileIndex:", fileIndex)
        const file = e.target.files[0];
        if (!file) return;

        // 파일을 base64로 읽기
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            const uploadedFile = {
                attachment_id: attachmentId,
                file_name: file.name,
                file_data: reader.result.split(",")[1], // base64 데이터
                file_size: file.size,
                file_type: file.type,
            };

            // console.log("uploadedFile", uploadedFile)
            // 기존의 dataBoard.files배열에 있는 것과 동일한 것을 업로드하는 지 체크
            const isDuplicate = boardData.files.some((existingFile) => {
                // console.log("isDuplicate진입")
                return (
                    existingFile.file_name === uploadedFile.file_name &&
                    existingFile.file_size === uploadedFile.file_size
                );
            });

            if (isDuplicate) {
                // 중복된 파일이 있으면 업로드를 막음
                Swal.fire({
                    icon: 'warning',
                    title: '중복 파일',
                    text: '이미 동일한 파일이 존재합니다. 업로드할 수 없습니다.'
                });
                return;
            }
            // files 배열의 해당 인덱스를 새 파일로 교체
            setBoardData((prevState) => {
                const updatedFiles = [...prevState.files]; // 배열 복사

                if (fileIndex !== -1) {
                    updatedFiles[fileIndex] = uploadedFile; // 기존 파일 대체
                } else {
                    updatedFiles.push(uploadedFile); // 만약 attachment_id가 없으면 새로 추가
                }

                return {
                    ...prevState,
                    files: updatedFiles, // 새로운 배열로 상태 업데이트
                };
            });
            console.log(attachments[fileIndex]);
            setAttachments(prevAttachments =>
                prevAttachments.map((attachment, index) =>
                    index === fileIndex ?
                        {
                            ...attachment,
                            ...uploadedFile,
                            board_id: attachment.board_id,
                            upload_date: attachment.upload_date,
                        }
                        : attachment
                )
            );
        };
        // console.log("변경된 첨부파일", boardData.files)
    };

    // 데이터패치
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

            // console.log(data);
        } catch (error) {
            console.error("데이터 불러오는 중 에러 발생", error);
        }
    };

    // useEffect(() => {
    //     console.log("첨부파일", boardData.files) // 체크용
    // },[boardData.files])

    useEffect(() => {
        fetchData();
        // console.log("들어온게시판 id", board_id);
    }, [board_id]);

    return (
        <BoardLayout>
            {/* 버튼구역 */}
            <ButtonContainer>
                <BackButton onClick={onCancel} >
                    돌아가기
                </BackButton>
            </ButtonContainer>
            <TitleTypography variant="h3">
                게시물 수정
            </TitleTypography>
            <ContentContainer>
                <InputTitle
                    name="board_title"
                    value={boardData.board_title}
                    onChange={handleInputChange}
                />
                첨부파일
                {attachments.length > 0 ? (
                    attachments.map((attachment, index) => (
                        <FileItemContainer key={index} >
                            <Typography variant="body1" sx={{ marginRight: 2 }}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDownload(attachment.file_name, attachment.file_data, attachment.file_type);
                                    }}
                                    style={{ textDecoration: 'none', color: 'blue' }}
                                >
                                    {attachment.file_name}
                                </a>
                            </Typography>
                            <Button
                                onClick={(e) => handleAttachmentEdit(attachment.attachment_id, index)}
                                variant="outlined"
                                size="small"
                            >
                                파일수정
                            </Button>
                        </FileItemContainer>
                    ))
                ) : (
                    <Typography>첨부파일이 없습니다.</Typography>
                )}
                <input // 기능만 이용
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />

                <InputContent
                    name="board_content"
                    value={boardData.board_content}
                    onChange={handleInputChange}
                />
                <SubmitButtonContainer>
                    <TotalSubmitButton onClick={handleUpdateData}>
                        수정하기
                    </TotalSubmitButton>
                </SubmitButtonContainer>
            </ContentContainer>
        </BoardLayout>
    );
};

export default YuhanBoardUpdate;

const BoardLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: white;
    
    .header {
    color: white;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
`;
const FileItemContainer = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 16px; // marginBottom: 2는 16px에 해당합니다
`;