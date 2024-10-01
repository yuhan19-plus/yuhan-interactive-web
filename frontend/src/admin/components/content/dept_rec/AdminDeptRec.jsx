/**
 * 학부추천관리 루트 컴포넌트 - 임성준
 */
import React, { useState, useEffect} from 'react'
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminDeptRec = () => {

    const [departments, setDepartments] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [rankings, setRankings] = useState([]);
    const [selectedDept, setSelectedDept] = useState(''); // 선택된 학부
    const [deptQuestions, setDeptQuestions] = useState([]); // 선택된 학부의 질문
    const [loading, setLoading] = useState(false);

    // 학부 목록과 점수 정보 불러오기
    useEffect(() => {
        fetchDepartments();
        fetchRankings();
    }, []);

    // 학부 목록을 서버에서 가져옴
    const fetchDepartments = async () => {
        try {
            const response = await fetch('/api/deptrecadmin/rankings');
            const data = await response.json();
            setDepartments(data);
            if (data.length > 0) {
                setSelectedDept(data[0].dept_name); // 기본으로 첫 번째 학부 선택
            }
        } catch (error) {
            console.error('학부 목록을 불러오는 중 에러 발생:', error);
        }
    };

    // 학부 점수 및 순위 정보를 서버에서 가져옴
    const fetchRankings = async () => {
        try {
            const response = await fetch('/api/deptrecadmin/rankings');
            const data = await response.json();
            setRankings(data);
        } catch (error) {
            console.error('학부 점수를 불러오는 중 에러 발생:', error);
        }
    };

    // 선택된 학부의 질문 목록을 서버에서 가져옴
    useEffect(() => {
        if (selectedDept) {
            fetchQuestions(selectedDept);
        }
    }, [selectedDept]);

    const fetchQuestions = async (deptName) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/deptrecadmin/questions/${deptName}`);
            const data = await response.json();
            setDeptQuestions(data);
        } catch (error) {
            console.error('질문 목록을 불러오는 중 에러 발생:', error);
        }
        setLoading(false);
    };

    // 질문 수정
    const handleSaveQuestion = async (questionId, newQuestion) => {
        try {
            const response = await fetch(`/api/deptrecadmin/questions/${questionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: newQuestion }),
            });
            if (response.ok) {
                alert('질문이 수정되었습니다.');
                fetchQuestions(selectedDept); // 수정 후 질문 목록 다시 불러오기
            } else {
                throw new Error('질문 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('질문 수정 중 에러 발생:', error);
        }
    };

    return (
        <>
        <Box sx={{ p: 3 }}>

            {/* 학부 선택 드롭다운 */}
            <FormControl sx={{ mb: 3, minWidth: 200 }}>
                <InputLabel id="dept-select-label">학부 선택</InputLabel>
                <Select
                    labelId="dept-select-label"
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                >
                    {departments.map((dept) => (
                        <MenuItem key={dept.dept_name} value={dept.dept_name}>
                            {dept.dept_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* 질문 수정 섹션 */}
            <Box sx={{ mb: 5 }}>
                <Typography variant="h6" gutterBottom>
                    {selectedDept} 질문 수정
                </Typography>
                {loading ? (
                    <Typography>로딩 중...</Typography>
                ) : (
                    deptQuestions.map((item, index) => (
                        <Box key={item.question_id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Typography sx={{ width: '5%' }}>{index + 1}</Typography>
                            <TextField
                                sx={{ width: '80%', mr: 2 }}
                                value={item.question}
                                onChange={(e) => {
                                    const updatedQuestions = [...deptQuestions];
                                    updatedQuestions[index].question = e.target.value;
                                    setDeptQuestions(updatedQuestions);
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleSaveQuestion(item.question_id, item.question)}
                            >
                                수정
                            </Button>
                        </Box>
                    ))
                )}
            </Box>

            {/* 학부 점수 및 순위 테이블 */}
            <Typography variant="h6" gutterBottom>
                학부 점수 및 순위
            </Typography>
            <TableContainer component={Paper} sx={{ width: '50%', margin: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>학부</TableCell>
                            <TableCell>점수</TableCell>
                            <TableCell>순위</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rankings.map((row) => (
                            <TableRow key={row.dept_name}>
                                <TableCell>{row.dept_name}</TableCell>
                                <TableCell>{row.score}</TableCell>
                                <TableCell>{row.rank}</TableCell> {/* 서버에서 제공한 rank 사용 */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        </>
    )
}

export default AdminDeptRec