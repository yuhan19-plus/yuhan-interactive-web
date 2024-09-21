import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const AdminFoodUpdate = ({ foodID, onCancel }) => {
    const food_id = foodID.foodID;

    const [foodData, setFoodData] = useState({
        foodType: "",
        foodName: "",
        foodPrice: "",
        foodImg: "", // base64 image data
        day: ""
    });
    const [files, setFiles] = useState([]);

    const fetchFoodData = async () => {
        try {
            const response = await fetch(`/api/food/${food_id}`);
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }

            const data = await response.json();
            setFoodData({
                foodType: data.foodType,
                foodName: data.foodName,
                foodPrice: data.foodPrice,
                foodImg: data.foodImg,
                day: data.day
            });
            setFiles([{ file_name: "현재 이미지", file_data: data.foodImg }]);
        } catch (error) {
            console.error("데이터 불러오는 중 에러 발생", error);
        }
    };

    useEffect(() => {
        fetchFoodData();
    }, [food_id]);

    const onDrop = useCallback((acceptedFiles) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFiles([{
                file_name: acceptedFiles[0].name,
                file_data: reader.result,
            }]);
        };
        reader.readAsDataURL(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFoodData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdateFood = async () => {
        const todaymenu = {
            foodType: foodData.foodType,
            foodName: foodData.foodName,
            foodPrice: foodData.foodPrice,
            foodImg: files[0]?.file_data || foodData.foodImg,
            day: foodData.day
        };

        try {
            const response = await fetch(`/api/food/update/${food_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todaymenu),
            });

            if (response.ok) {
                alert('음식이 업데이트되었습니다.');
                onCancel();
            } else {
                alert('음식 업데이트 중 오류 발생');
            }
        } catch (error) {
            console.error('업데이트 중 오류 발생:', error);
            alert('음식 업데이트 중 오류 발생');
        }
    };

    return (
        <BoardLayout>
            <BoardMainLayout>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        음식 항목 수정
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>음식 종류</InputLabel>
                                <Select
                                    label="음식 종류"
                                    name="foodType"
                                    value={foodData.foodType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <MenuItem value="양식">양식</MenuItem>
                                    <MenuItem value="한식">한식</MenuItem>
                                    <MenuItem value="일품1">일품1</MenuItem>
                                    <MenuItem value="일품2">일품2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="음식 이름"
                                name="foodName"
                                variant="outlined"
                                value={foodData.foodName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="음식 가격"
                                name="foodPrice"
                                variant="outlined"
                                value={foodData.foodPrice}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>요일</InputLabel>
                                <Select
                                    label="요일"
                                    name="day"
                                    value={foodData.day}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <MenuItem value="월">월</MenuItem>
                                    <MenuItem value="화">화</MenuItem>
                                    <MenuItem value="수">수</MenuItem>
                                    <MenuItem value="목">목</MenuItem>
                                    <MenuItem value="금">금</MenuItem>
                                    <MenuItem value="매일">매일</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
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
                                        <img
                                            src={files[0].file_data}
                                            alt={files[0].file_name}
                                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                        />
                                    </Box>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={12} textAlign="right">
                            <Button variant="contained" color="primary" onClick={handleUpdateFood}>
                                업데이트
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

export default AdminFoodUpdate;

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
