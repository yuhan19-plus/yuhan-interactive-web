import React, { useEffect, useState } from 'react'
import { Button, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import styled from 'styled-components'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const PAGE_COUNT = 5

const MyCounsel = ({ currentUserState }) => {
    const myProfessorInfoState = useSelector((state) => state.myProfessor)
    const userId = currentUserState.user_id

    // console.log(myProfessorInfoState)

    const [currentPage, setCurrentPage] = useState(1) // 페이지 번호는 1부터 시작
    const [myCounselData, setMyCounselData] = useState([]) // 상담 데이터 상태관리
    const [paginatedData, setPaginatedData] = useState([]) // 페이지네이션된 데이터 상태관리

    const handleUpdateCounselState = async (professorId, counselDate, counselTime) => {
        try {
            // console.log(professorId)
            const response = await axios.put('/api/consultation/update-counsel-state', {
                professorId: professorId,
                counselDate: counselDate,
                counselTime: counselTime,
                counselState: 0
            })
            // console.log("상담상태 : ", response.data.counselState)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `${error.message} 상담신청 중 오류가 발생했습니다.`,
            })
        }
    }

    // 상담이력 불러오기
    const GetMyCounselData = async () => {
        try {
            const response = await axios.get('/api/consultation/my-counsel', {
                params: {
                    userId: userId
                }
            })
            const data = response.data.myCounsel
            setMyCounselData(data)
            Swal.fire({
                icon: 'success',
                title: '데이터 로드 성공.',
                text: '상담이력 데이터를 가져왔습니다.',
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `상담이력 데이터를 가져오는 도중 오류가 발생했습니다: ${error}`,
            })
        }
    }

    // 상담 취소 처리
    const ClickCancel = async (userId, consultationId, counselDate, counselTime) => {
        try {
            const response = await axios.put('/api/consultation/my-counsel/counsel-cancel', {
                userId: userId,
                consultationId: consultationId
            })
            Swal.fire({
                icon: 'success',
                title: '상담취소',
                text: '상담을 취소하였습니다.',
            })
            // console.log("상담취소 후 상태업데이트 : ", response.data)
            handleUpdateCounselState(myProfessorInfoState.myProfessorId, counselDate, counselTime)
            // 데이터 갱신
            GetMyCounselData()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `신청하신 상담을 취소할 수 없습니다: ${error}`,
            })
        }
    }

    // 페이지네이션 처리
    const handleChangePage = (event, value) => {
        setCurrentPage(value)
    }

    // paginatedData 갱신
    useEffect(() => {
        if (myCounselData.length > 0) {
            const startIdx = (currentPage - 1) * PAGE_COUNT
            const paginated = myCounselData.slice(startIdx, startIdx + PAGE_COUNT)
            setPaginatedData(paginated)
        }
    }, [myCounselData, currentPage])

    // 상담 데이터 로드
    useEffect(() => {
        if (userId) {
            GetMyCounselData()
        }
    }, [userId])

    return (
        <>
            {userId && (
                <>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#0F275C' }}>
                                <TableCell align='center' sx={{ color: '#FFFFFF', fontWeight: 900 }}>NUM</TableCell>
                                <TableCell align='center' sx={{ color: '#FFFFFF', fontWeight: 900 }}>상담내용</TableCell>
                                <TableCell align='center' sx={{ color: '#FFFFFF', fontWeight: 900 }}>상담사</TableCell>
                                <TableCell align='center' sx={{ color: '#FFFFFF', fontWeight: 900 }}>상담일시</TableCell>
                                <TableCell align='center' sx={{ color: '#FFFFFF', fontWeight: 900 }}>취업구분</TableCell>
                                <TableCell align='center' sx={{ color: '#FFFFFF', fontWeight: 900 }}>상태</TableCell>
                                <TableCell align='center' sx={{ color: '#FFFFFF', fontWeight: 900 }}>취소</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((data, idx) => (
                                    <TableRow
                                        key={data.consultation_id}
                                        sx={{ backgroundColor: (idx + 1) % 2 === 0 ? '#cad5e0' : '#ffffff' }}
                                    >
                                        <TableCell align='center'>{(currentPage - 1) * PAGE_COUNT + (idx + 1)}</TableCell>
                                        <TableCell align='center' sx={{ fontSize: '28px', fontWeight: 900 }}>{data.counsel_content}</TableCell>
                                        <TableCell align='center' sx={{ fontWeight: 900 }}>{data.professor_name}학과장</TableCell>
                                        <TableCell align='center'>
                                            <b>{data.counsel_date}</b>
                                            <p>{data.counsel_time}</p>
                                            <p>{data.consultation_category}</p>
                                        </TableCell>
                                        <TableCell align='center'>
                                            {data.employment_classification === 'careerGuidance' && '진로지도'}
                                            {data.employment_classification === 'ResumeAndCoverLetterConsulting' && '이력서'}
                                            {data.employment_classification === 'interviewConsulting' && '면접 컨설팅'}
                                            {data.employment_classification === 'EmploymentGuidance' && '취업지도'}
                                            {data.employment_classification === 'CriminalRecordMap' && '전과지도'}
                                            {data.employment_classification === 'OtherConsultation' && '기타상담'}
                                        </TableCell>
                                        {(data.counsel_state === '상담완료' || data.counsel_state === '상담승인') && (
                                            <>
                                                <TableCell align='center' sx={{ color: 'green', fontWeight: 900 }}>{data.counsel_state}</TableCell>
                                                <TableCell align='center' sx={{ color: 'green', fontWeight: 900 }}>취소불가</TableCell>
                                            </>
                                        )}
                                        {data.counsel_state === '승인대기중' && (
                                            <>
                                                <TableCell align='center' sx={{ color: 'orange', fontWeight: 900 }}>{data.counsel_state}</TableCell>
                                                <TableCell align='center'>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                icon: 'question',
                                                                title: '상담취소',
                                                                text: '상담을 취소하시겠습니까?',
                                                                showCancelButton: true,
                                                                confirmButtonText: "취소",
                                                                cancelButtonText: "닫기",
                                                            }).then((res) => {
                                                                if (res.isConfirmed) {
                                                                    ClickCancel(userId, data.consultation_id, data.counsel_date, data.counsel_time)
                                                                }
                                                                else {
                                                                    return
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        취소
                                                    </Button>
                                                </TableCell>
                                            </>
                                        )}
                                        {(data.counsel_state === '승인거절' || data.counsel_state === '상담취소') && (
                                            <>
                                                <TableCell align='center' sx={{ color: 'red', fontWeight: 900 }}>{data.counsel_state}</TableCell>
                                                <TableCell align='center' sx={{ color: 'red', fontWeight: 900 }}>취소불가</TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} style={{ textAlign: 'center' }}>
                                        상담이력이 없습니다.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <PaginationContainer>
                        {myCounselData.length > 0 && (
                            <Pagination
                                count={Math.ceil(myCounselData.length / PAGE_COUNT)}
                                page={currentPage}
                                onChange={handleChangePage}
                                color="info"
                            />
                        )}
                    </PaginationContainer>
                </>
            )}
        </>
    )
}

const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 15px 0px;
`

export default MyCounsel