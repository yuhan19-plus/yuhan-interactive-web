/**
 * 파일생성자 - 이정민
 * 기능 구현- 이정민
 * 관리자가 오늘의 메뉴 등록 하는 페이지
 * 
 */
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import styled from "styled-components";
import Swal from 'sweetalert2';

const AdminFoodInsert = ({ onCancel }) => {
    const navigate = useNavigate(); // useNavigate 훅 초기화
    const [food, setFood] = useState({
        foodType: '',
        foodName: '',
        foodPrice: '',
        foodImg: '', // 파일명만 저장
        day: ''
    });
    const [files, setFiles] = useState([]); // 파일을 별도로 관리

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFiles([{
                file_name: file.name,
                file_data: reader.result.split(',')[1], // base64 이미지 데이터만 추출
                file_size: file.size,
                file_type: file.type,
            }]);
        };

        reader.readAsDataURL(file); // 파일을 base64로 변환
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFood((prevFood) => ({
            ...prevFood,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // 음식 등록 로직 실행
        const todaymenu = {
            foodType: food.foodType,
            foodName: food.foodName,
            foodPrice: food.foodPrice,
            foodImg: files[0]?.file_data, // base64 이미지 데이터
            day: food.day,
        };
    
        const result = await Swal.fire({
            title: '등록 확인',
            text: '음식을 등록하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '등록',
            cancelButtonText: '취소',
        });
    
        if (result.isConfirmed) {
            try {
                const response = await fetch('/api/food', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(todaymenu),
                });

                const responseData = await response.json();

                if (response.ok) {
                    Swal.fire({
                        title: '등록 완료!',
                        text: '음식이 성공적으로 등록되었습니다.',
                        icon: 'success',
                    });
                    onCancel(); // 등록 후 취소 기능 호출
                } else {
                    // 서버에서 받은 오류 메시지를 기반으로 사용자에게 알림
                    Swal.fire({
                        icon: 'error',
                        title: '오류',
                        text: responseData.message || '알 수 없는 오류가 발생했습니다.',
                    });
                }
            } catch (error) {
                console.error('등록 중 오류 발생:', error);
                Swal.fire({
                    icon: 'error',
                    title: '오류',
                    text: '음식 등록 중 오류 발생',
                });
            }
        }
    };

    // 요일 옵션을 동적으로 필터링
    const dayOptions = (() => {
        if (food.foodType === '양식' || food.foodType === '한식') {
            return ['월', '화', '수', '목', '금'];
        } else if (food.foodType === '일품1' || food.foodType === '일품2') {
            return ['매일'];
        }
        return []; // 기본값으로 아무것도 반환하지 않음
    })();

    return (
        <BoardLayout>
            <BoardMainLayout>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        음식 등록
                    </Typography>
                    <Grid container spacing={2}>
                        {/* 음식 타입 드롭다운 */}
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel>음식 타입</InputLabel>
                                <Select
                                    label="음식 타입"
                                    name="foodType"
                                    value={food.foodType}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="양식">양식</MenuItem>
                                    <MenuItem value="한식">한식</MenuItem>
                                    <MenuItem value="일품1">일품1</MenuItem>
                                    <MenuItem value="일품2">일품2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* 음식 이름 */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="음식 이름"
                                name="foodName"
                                value={food.foodName}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>

                        {/* 음식 가격 */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="음식 가격"
                                name="foodPrice"
                                value={food.foodPrice}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>

                        {/* 요일 드롭다운 */}
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel>요일</InputLabel>
                                <Select
                                    label="요일"
                                    name="day"
                                    value={food.day}
                                    onChange={handleChange}
                                    disabled={dayOptions.length === 0} // 옵션이 없을 때 비활성화
                                >
                                    {dayOptions.map((day) => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* 파일 업로드 */}
                        <Grid item xs={12}>
                            <div {...getRootProps()} style={{
                                border: "2px dashed #cccccc",
                                borderRadius: "8px",
                                padding: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                                backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
                            }}>
                                <input {...getInputProps()} />
                                {files.length === 0 ? (
                                    isDragActive ? (
                                        <p>파일을 이곳에 드롭하세요...</p>
                                    ) : (
                                        <p>파일을 여기에 드래그 앤 드롭하거나 클릭하여 파일을 선택하세요.</p>
                                    )
                                ) : (
                                    <Box mt={2}>
                                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                            {files.map((file, index) => (
                                                <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <img
                                                        src={`data:${file.file_type};base64,${file.file_data}`}
                                                        alt={file.file_name}
                                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </Box>
                                )}
                            </div>
                        </Grid>

                        {/* 버튼 */}
                        <Grid item xs={12} textAlign="right">
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                음식 등록
                            </Button>
                            <Button variant="contained" color="error" onClick={onCancel} sx={{ marginLeft: "5px" }}>
                                취소
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </BoardMainLayout>
        </BoardLayout>
    );
};

export default AdminFoodInsert;

const BoardLayout = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
`;

const BoardMainLayout = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
`;
