import React, { useEffect, useRef, useState } from "react";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import styled from "styled-components";


// 이 페이지에 들어오는 경우는 권한이 있는 경우만 들어오는 것임 그러니 글 작성자를 만질 이유 없음 관리자, 글작성자

//할일1 첨부파일도 수정가능하게 ui 디자인
//할일2 회원인 경우 - 제목, 내용, 첨부파일 수정
//할일3 관리자인 경우 - 작성자, 작성일을 제외한 모든 내용 수정 가능

const YuhanBoardUpdatePage = ({ boardId, onCancel }) => {
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
    // attachment 테이블의 데이터를 관리하기 위한 상태
    const [attachments, setAttachments] = useState([]);
    // 파일 입력요소 접근용 ref
    const fileInputRef = useRef(null);

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

            // console.log(data);
        } catch (error) {
            console.error("데이터 불러오는 중 에러 발생", error);
        }
    };

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

    // 게시판업데이트
    const handleUpdateData = async () => {
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
            onCancel();
            console.log("수정 성공");
        } catch (error) {
            console.error("데이터 수정 중 에러 발생", error);
        }

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBoardData({ ...boardData, [name]: value });
    };

    // 기존파일의 attachment_id를 받아와 관리하는 상태
    const [attachmentId, setAttachmentId] = useState(0)
    // boardData의 files배열의 수정할 인덱스를 관리하는 상태
    const [fileIndex, setFileIndex] = useState(0)
    // 기존파일의 데이터를 보관하는 상태
    const [backupFile, setBackupFile] = useState([])

    const handleAttachmentEdit = (attachment_id, index) => {
        // console.log("첨부파일 수정 버튼이 눌림, 파일 id:", attachment_id);
        // console.log("boardData.files[index].attachment_id", boardData.files[index].attachment_id)
        // console.log("fileIndex(index):",index);

        if (attachment_id === boardData.files[index].attachment_id) {
            // 배열 복사 후 해당 인덱스의 파일 정보를 빈 배열로 초기화
            setBoardData((prevState) => {
                const updatedFiles = [...prevState.files]; // 파일 배열 전체 복사
                setBackupFile(updatedFiles);
                updatedFiles[index] = {}; // 해당 인덱스의 파일을 빈 객체로 초기화

                return {
                    ...prevState,
                    files: updatedFiles, // 새 배열로 업데이트
                };
            });
        }

        setFileIndex(index); // boardData의 files의 배열의 인덱스값을 설정 파일처리에서 해당 인덱스에 집어넣기 위함
        setAttachmentId(attachment_id);
        // console.log("attachmentId", attachmentId)

        // 파일 선택기 트리거
        // input태그의 type="file"을 이용
        if (fileInputRef.current) {
            fileInputRef.current.click(); // 파일 선택기 열기
        }
    };

    // 파일이 선택되었을 때 처리
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
// 현문제 같은 파일이 존재하면 막으려는 시도 중 
            // 배열을 순회하며 동일한 파일이 있는지 확인
            const isDuplicate = boardData.files.some((existingFile) => {
                console.log("isDuplicate진입")
                return (
                    existingFile.file_name === uploadedFile.file_name &&
                    existingFile.file_size === uploadedFile.file_size
                );
            });

            if (isDuplicate) {
                // 중복된 파일이 있으면 업로드를 막음
                console.log("이미 동일한 파일이 존재합니다. 업로드할 수 없습니다.");
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
        };
        // console.log("변경된 첨부파일", boardData.files)
    };

    // useEffect(() => {
    //     console.log("첨부파일", boardData.files)
    // },[boardData.files])

    useEffect(() => {
        fetchData();
        // console.log("들어온게시판 id", board_id);

    }, [board_id]);

    return (
        <BoardLayout>
            <BoardMainLayout>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        게시물
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="제목"
                                name="board_title"
                                variant="outlined"
                                value={boardData.board_title}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            첨부파일
                            {attachments.length > 0 ? (
                                attachments.map((attachment, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
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
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body1">첨부파일이 없습니다.</Typography>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef} // ref 연결
                                style={{ display: "none" }} // 숨김 처리
                                onChange={handleFileChange} // 파일이 선택되면 처리
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="내용"
                                name="board_content"
                                variant="outlined"
                                value={boardData.board_content}
                                onChange={handleInputChange}
                                multiline
                                rows={8}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign="right">
                            <Button variant="contained" color="primary" onClick={handleUpdateData}>
                                수정하기
                            </Button>
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

export default YuhanBoardUpdatePage;

const BoardLayout = styled.div`
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
