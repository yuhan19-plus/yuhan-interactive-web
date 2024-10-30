/**
 * 갤러리 관리 루트 컴포넌트 - 이석재
 */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, TextField } from '@mui/material';
import Swal from 'sweetalert2';

const AdminGallery = () => {
    // 상태관리
    const [galleryWorks, setGalleryWorks] = useState([]);
    const [loading, setLoading] = useState(false);

    // 핸들러
    const handleChange = (index, field, value) => {
        const updatedWorks = [...galleryWorks];
        updatedWorks[index][field] = value;
        setGalleryWorks(updatedWorks);
    };
    // 갤러리 항목 조회 핸들러
    const fetchGalleryWorks = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/galleryAdmin/fetchAllWorkInfo');
            const data = await response.json();
            setGalleryWorks(data);
        } catch (error) {
            console.error('갤러리 데이터를 불러오는 중 에러 발생:', error);
        }
        setLoading(false);
    };
    // 이미지 파일을 선택 및 base64로 변환하여 저장 핸들러
    const handleImageChange = (index, file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedWorks = [...galleryWorks];
            updatedWorks[index].work_picture = reader.result;
            setGalleryWorks(updatedWorks);
        };
        if (file) reader.readAsDataURL(file);
    };
    // 갤러리 항목 수정 처리 핸들러
    const handleSaveWork = async (workId, updatedWork) => {
        // 갤러리 항목 수정 처리
        try {
            const response = await fetch(`/api/galleryAdmin/updateWorkInfo/${workId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedWork),
            });
            // 수정에 성공한 경우 갤러리 목록 다시 불러오기
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '수정 완료',
                    text: '갤러리 항목이 수정되었습니다.',
                    confirmButtonColor: '#3085d6',
                });
                fetchGalleryWorks();
            // 갤러리 항목 수정에 실패한경우
            } else {
                Swal.fire({
                    title: '갤러리 항목 수정 실패!',
                    text: '갤러리 항목 수정에 실패했습니다. 다시 시도해주세요.',
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            }
        // 서버 오류인 경우
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '서버 오류!',
                text: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.',
                confirmButtonColor: '#d33',
            });
        }
    };

    // useEffect
    // 갤러리 데이터 가져오기
    useEffect(() => {
        fetchGalleryWorks();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                갤러리 관리
            </Typography>
            {loading ? (
                <Typography>로딩 중...</Typography>
            ) : (
                galleryWorks.map((work, index) => (
                    <Paper key={work.work_id} sx={{ p: 3, mb: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            {index + 1}위
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label="작품 이름"
                                value={work.work_name}
                                onChange={(e) => handleChange(index, 'work_name', e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="팀 이름"
                                value={work.team_name}
                                onChange={(e) => handleChange(index, 'team_name', e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="팀 멤버"
                                value={work.team_member}
                                onChange={(e) => handleChange(index, 'team_member', e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="기술 스택"
                                value={work.tech_stack}
                                onChange={(e) => handleChange(index, 'tech_stack', e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="작품 설명"
                                value={work.work_desc || ''}
                                onChange={(e) => handleChange(index, 'work_desc', e.target.value)}
                                sx={{ mb: 2 }}
                                multiline
                                rows={10} // 원하는 기본 줄 수로 설정
                            />
                            <TextField
                                fullWidth
                                label="저장소 URL"
                                value={work.work_repository_url || ''}
                                onChange={(e) => handleChange(index, 'work_repository_url', e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1" gutterBottom>작품 이미지</Typography>
                                {work.work_picture && (
                                    <img
                                        src={work.work_picture}
                                        alt="작품 이미지"
                                        style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', marginBottom: '1rem' }}
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                                />
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSaveWork(work.work_id, work)}
                        >
                            수정
                        </Button>
                    </Paper>
                ))
            )}
        </Box>
    );
};

export default AdminGallery;
