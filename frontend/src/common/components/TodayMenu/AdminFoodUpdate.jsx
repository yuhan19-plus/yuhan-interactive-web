import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const AdminFoodUpdate = ({ foodID, onCancel }) => {

    const food_id = foodID.foodID
    const food_img = foodID.foodImg
    const food_name = foodID.foodName
    console.log("아이디",food_id);
    console.log("이름",food_name);
    console.log("이미지",food_img);

    const [foodData, setFoodData] = useState({
        
        foodType: "",
        foodName: "",
        foodPrice: "",
        foodImg: "", // base64 image data
    });
    const [files, setFiles] = useState([]); // 파일을 별도로 관리

    // 데이터 가져오기 함수
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
            });
            setFiles([
                {
                    file_name: "image.png",
                    file_data: data.foodImg,
                    file_size: 0,
                    file_type: "image/png",
                },
            ]);
        } catch (error) {
            console.error("데이터 불러오는 중 에러 발생", error);
        }
    };

    useEffect(() => {
        fetchFoodData();
    }, [food_id]);

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
            foodImg: files[0]?.file_data || foodData.foodImg, // base64 이미지 데이터
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
                        음식 항목 업데이트
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="음식 종류"
                                name="foodType"
                                variant="outlined"
                                value={foodData.foodType}
                                onChange={handleInputChange}
                                required
                            />
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
                                                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </Box>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={12} textAlign="right">
                            <Button variant="contained" color="primary" onClick={handleUpdateFood}>
                                업데이트
                            </Button>
                            <Button variant="contained" color="secondary" onClick={onCancel}>
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
