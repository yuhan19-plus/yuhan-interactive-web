/** 파일생성자 : 임성준
 * 회원관리 루트 컴포넌트 - 임성준
 * 이석재
 *   - 회원관리 기능 구현 완료 
 */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Swal from 'sweetalert2';
import styled from 'styled-components'

const AdminMember = () => {
    // 상태관리
    const [students, setStudents] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [deletedStudents, setDeletedStudents] = useState([]);
    const [deletedProfessors, setDeletedProfessors] = useState([]);

    // 핸들러
    // 회원탈퇴 처리 핸들러
    const deleteMember = async (userId, memberType) => {
        Swal.fire({
            title: '이 회원을 탈퇴처리 하시겠습니까?',
            text: '이 작업은 되돌릴 수 없습니다!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '탈퇴',
            cancelButtonText: '취소',
            reverseButtons: true
        // 회원탈퇴 진행을 사용자가 선택한 경우
        }).then(async (result) => {
            if (result.isConfirmed) {
                // 회원탈퇴 처리
                try {
                    const response = await fetch(`/api/memberAdmin/deleteMember/${userId}`, {
                        method: 'PUT',
                    });
                    // 회원탈퇴 처리에 성공한 경우, 학생/교수 목록에서 해당 회원을 제거 휴 탈퇴 목록에 추가
                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: '회원탈퇴 완료',
                            text: '회원탈퇴 처리가 완료되었습니다.',
                            confirmButtonColor: '#3085d6',
                        });
                        if (memberType === 'student') {
                            const deletedStudent = students.find(student => student.user_id === userId);
                            setStudents(students.filter(student => student.user_id !== userId));
                            setDeletedStudents([...deletedStudents, deletedStudent]);
                        } else if (memberType === 'professor') {
                            const deletedProfessor = professors.find(professor => professor.user_id === userId);
                            setProfessors(professors.filter(professor => professor.user_id !== userId));
                            setDeletedProfessors([...deletedProfessors, deletedProfessor]);
                        }
                    // 회원탈퇴에 실패한 경우
                    } else {
                        Swal.fire({
                            title: '회원탈퇴 실패',
                            text: '회원탈퇴에 실패했습니다. 다시 시도해주세요.',
                            icon: 'error',
                            confirmButtonText: '확인'
                        });
                    }
                // 서버 오류인 경우
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: '서버 오류',
                        text: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.',
                        confirmButtonColor: '#d33',
                    });
                }
            // 회원탈퇴 취소시
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    icon: 'info',
                    title: '취소됨',
                    text: '회원탈퇴가 취소되었습니다.',
                    confirmButtonColor: '#d33',
                });
            }
        });
    };

    // useEffect
    // 회원 정보 가져오기
    useEffect(() => {
        // 학생 정보 가져오기
        fetch('/api/memberAdmin/fetchstudent')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('학생 정보 불러오기 중 에러:', error));

        // 교수 정보 가져오기
        fetch('/api/memberAdmin/fetchprofessor')
            .then(response => response.json())
            .then(data => setProfessors(data))
            .catch(error => console.error('교수 정보 불러오기 중 에러:', error));

        // 탈퇴된 학생 정보 가져오기
        fetch('/api/memberAdmin/fetchdeletedstudent')
            .then(response => response.json())
            .then(data => setDeletedStudents(data))
            .catch(error => console.error('탈퇴된 학생 정보 불러오기 중 에러:', error));

        // 탈퇴된 교수 정보 가져오기
        fetch('/api/memberAdmin/fetchdeletedprofessor')
            .then(response => response.json())
            .then(data => setDeletedProfessors(data))
            .catch(error => console.error('탈퇴된 교수 정보 불러오기 중 에러:', error));
    }, []);
    
    return (
        <>
        <Box sx={{ p: 3 }}>
            {/* 활성 학생 목록 */}
            <Typography variant="h5" gutterBottom>
                학생 목록
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>아이디</TableCell>
                            <TableCell>전공</TableCell>
                            <TableCell>학번</TableCell>
                            <TableCell>학년</TableCell>
                            <TableCell>반</TableCell>
                            <TableCell>탈퇴</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.user_id}>
                                <TableCell>{student.user_id}</TableCell>
                                <TableCell>{student.user_major}</TableCell>
                                <TableCell>{student.student_number}</TableCell>
                                <TableCell>{student.student_grade}</TableCell>
                                <TableCell>{student.student_class}</TableCell>
                                <TableCell>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteMember(student.user_id, 'student')}
                                >
                                    탈퇴
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 활성 교수 목록 */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                교수 목록
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>아이디</TableCell>
                            <TableCell>전공</TableCell>
                            <TableCell>직책</TableCell>
                            <TableCell>탈퇴</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {professors.map((professor) => (
                            <TableRow key={professor.user_id}>
                                <TableCell>{professor.user_id}</TableCell>
                                <TableCell>{professor.user_major}</TableCell>
                                <TableCell>{professor.professor_position}</TableCell>
                                <TableCell>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteMember(professor.user_id, 'professor')}
                                >
                                    탈퇴
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 탈퇴된 학생 목록 */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                탈퇴된 학생 목록
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>아이디</TableCell>
                            <TableCell>전공</TableCell>
                            <TableCell>학번</TableCell>
                            <TableCell>학년</TableCell>
                            <TableCell>반</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deletedStudents.map((student) => (
                            <TableRow key={student.user_id}>
                                <TableCell>{student.user_id}</TableCell>
                                <TableCell>{student.user_major}</TableCell>
                                <TableCell>{student.student_number}</TableCell>
                                <TableCell>{student.student_grade}</TableCell>
                                <TableCell>{student.student_class}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 탈퇴된 교수 목록 */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                탈퇴된 교수 목록
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>아이디</TableCell>
                            <TableCell>전공</TableCell>
                            <TableCell>직책</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deletedProfessors.map((professor) => (
                            <TableRow key={professor.user_id}>
                                <TableCell>{professor.user_id}</TableCell>
                                <TableCell>{professor.user_major}</TableCell>
                                <TableCell>{professor.professor_position}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        </>
    );
}

export default AdminMember