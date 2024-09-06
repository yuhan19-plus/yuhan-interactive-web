/** 오자현 
 * 게시판 글작성페이지
 *  임시로 여기서 test하기 위해서 배치해둠 실제로는 따로 폴더 뽑아서 해야할지도
 */
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import styled from "styled-components";
import { useCookies } from "react-cookie";

const YuhanBoardInsert = ({ onCancel }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [boardData, setBoardData] = useState({
        board_title: "",
        board_content: "",
        board_writer: cookies.user, // 세션쿠키에서 user를 받아서 작성자로 입력
        files: []  // 파일 데이터를 저장하는 배열
    });

    // console.log("cookies",cookies)

    // 파일드랍
    const onDrop = useCallback((acceptedFiles) => {
        // 1. acceptedFiles는 사용자가 드롭한 파일 목록
        const files = acceptedFiles.map((file) => {
            // 2. 각 파일에 대해 FileReader 객체를 사용하여 파일을 읽음
            const reader = new FileReader();
            reader.readAsDataURL(file);

            return new Promise((resolve) => {
                // 3. FileReader가 파일을 다 읽으면 'loadend' 이벤트가 발생
                reader.onloadend = () => {
                    resolve({
                        file_name: file.name,
                        file_data: reader.result.split(",")[1],
                        file_size: file.size,
                        file_type: file.type,
                    });
                };
            });
        });

        // 5. 모든 파일이 처리되면 Promise.all을 사용해 모든 파일이 처리된 후에 실행
        Promise.all(files).then((uploadedFiles) => {
            // 6. setBoardData로 상태를 업데이트
            // 기존의 boardData 상태를 유지하면서, files 배열에 새로 업로드된 파일 정보를 추가
            setBoardData((prevState) => ({
                ...prevState,  // 기존의 boardData 상태를 유지 (board_title, board_content 등)
                files: [...prevState.files, ...uploadedFiles],  // 기존 files 배열에 새로운 파일들을 추가
            }));
        });
    }, []);

    // 드래그앤 드랍
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBoardData({ ...boardData, [name]: value });
    };

    // 게시판저장
    const handleAddData = async () => {
        try {
            const response = await fetch("/api/board", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(boardData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.text();
            alert(result);
            setBoardData({ board_title: "", board_content: "", board_writer: "실험가", files: [] });
            // 게시물 등록 완료 후 게시판목록으로 돌아가기
            onCancel();
        } catch (error) {
            console.error("Error adding data:", error);
            alert("데이터 추가 중 오류 발생!");
        }
    };

    return (
        <BoardLayout>
            <BoardMainLayout>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        게시물 작성
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="제목"
                                name="board_title"
                                variant="outlined"
                                required
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div {...getRootProps()} style={{
                                border: "2px dashed #cccccc",
                                padding: "20px",
                                textAlign: "center",
                                cursor: "pointer"
                            }}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>파일을 이곳에 드롭하세요...</p> :
                                        <p>파일을 여기에 드래그 앤 드롭하거나 클릭하여 파일을 선택하세요.</p>
                                }
                            </div>
                            {boardData.files.length > 0 && (
                                <Box mt={2}>
                                    <Typography variant="h6">첨부된 파일들:</Typography>
                                    <ul>
                                        {boardData.files.map((file, index) => (
                                            <li key={index}>{file.file_name} ({(file.file_size / 1024).toFixed(2)} KB)</li>
                                        ))}
                                    </ul>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="내용"
                                name="board_content"
                                variant="outlined"
                                required
                                multiline
                                rows={8}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign="right">
                            <Button variant="contained" color="primary" onClick={handleAddData}>
                                게시물 등록
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

export default YuhanBoardInsert;

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
    }`
    ;

const BoardMainLayout = styled.div`
`
    ;