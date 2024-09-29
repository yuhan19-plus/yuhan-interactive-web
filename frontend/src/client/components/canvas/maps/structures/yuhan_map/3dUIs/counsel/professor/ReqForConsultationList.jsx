import React, { useEffect, useState } from 'react'
import { Button, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import styled from 'styled-components'
import { counselListTestData } from '../../../../../../../../../data/commonData'
import Swal from 'sweetalert2'
import axios from 'axios'
import moment from 'moment'
const PAGE_COUNT = 5

const ReqForConsultationList = ({currentUserState}) => {
    const userId = currentUserState.user_id

    const [currentPage, setCurrentPage] = useState(1) // 페이지 번호는 1부터 시작
    const [myCounselData, setMyCounselData] = useState([]) // 상담 데이터 상태관리
    const [paginatedData, setPaginatedData] = useState([]) // 페이지네이션된 데이터 상태관리

    // 상담이력 불러오기
    const GetReqForConsultationData = async () => {
        try {
            const response = await axios.get(`/api/consultation/req-for-consultation-list/${userId}`)
            const data = response.data.myCounsel
            setMyCounselData(data)
            Swal.fire({
                icon: 'success',
                title: '데이터 로드 성공.',
                text: '상담신청목록 데이터를 가져왔습니다.',
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `상담신청목록 데이터를 가져오는 도중 오류가 발생했습니다: ${error}`,
            })
        }
    }

    // 상담 승인 처리
    const ClickApprove = async (userId, consultationId) => {
        try {
            await axios.put(`/api/consultation/req-for-consultation-list/counsel-approve/${userId}/${consultationId}`)
            Swal.fire({
                icon: 'success',
                title: '상담승인',
                text: '상담을 승인하였습니다.',
            })
            // 데이터 갱신
            GetReqForConsultationData()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `상담승인 중 오류가 발생했습니다: ${error}`,
            })
        }
    }

    // 상담 거절 처리
    const ClickRefusal = async (userId, consultationId, counselDate, counselTime) => {
        try {
            await axios.put('/api/consultation/req-for-consultation-list/counsel-refusal', {
                professorId: userId,
                consultationId: consultationId,
                counselDate: counselDate,
                counselTime: counselTime
            })
            Swal.fire({
                icon: 'success',
                title: '상담거절',
                text: '상담을 거절하였습니다.',
            })
            
            // 데이터 갱신
            GetReqForConsultationData()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `상담거절 중 오류가 발생했습니다: ${error}`,
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

    // 상담신청목록 데이터 로드
    useEffect(() => {
        if(userId) {
            GetReqForConsultationData()
        }
    }, [userId])

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow sx={{backgroundColor: '#0F275C'}}>
                        <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>NUM</TableCell>
                        <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>상담내용</TableCell>
                        <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>상담일시</TableCell>
                        <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>학생명</TableCell>
                        <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>신청일</TableCell>
                        <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>수락</TableCell>
                        <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>취소</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((data, idx) => (
                            <TableRow
                                key={data.consultation_id}
                                sx={{
                                    backgroundColor: (idx + 1) % 2 === 0 ? '#cad5e0' : '#ffffff', // 홀수/짝수 행 배경색
                                }}
                            >
                                <TableCell align='center'>{(currentPage - 1) * PAGE_COUNT + (idx + 1)}</TableCell>
                                <TableCell align='center' sx={{ fontSize: '28px', fontWeight: 900 }}>{data.counsel_content}</TableCell>
                                <TableCell align='center'>
                                    <b>{data.counsel_date}</b>
                                    <p>{data.counsel_time}</p>
                                    <p>{data.consultation_category}</p>
                                </TableCell>
                                <TableCell align='center' sx={{ fontWeight: 900 }}>{data.student_name}</TableCell>
                                <TableCell align='center'>{moment(data.createdAt).format("YYYY-MM-DD")}</TableCell>
                                {data.counsel_state === '승인대기중' && (
                                    <>
                                        <TableCell align='center'>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => {
                                                    Swal.fire({
                                                        icon: 'question',
                                                        title: '상담승인',
                                                        text: '상담을 승인하시겠습니까?',
                                                        showCancelButton: true,
                                                        confirmButtonText: "승인",
                                                        cancelButtonText: "닫기",
                                                    }).then((res) => {
                                                        if (res.isConfirmed) {
                                                            ClickApprove(userId, data.consultation_id)
                                                        }
                                                        else {
                                                            return
                                                        }
                                                    })
                                                }}
                                            >
                                                승인
                                            </Button>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => {
                                                    Swal.fire({
                                                        icon: 'question',
                                                        title: '상담거절',
                                                        text: '상담을 거절하시겠습니까?',
                                                        showCancelButton: true,
                                                        confirmButtonText: "거절",
                                                        cancelButtonText: "닫기",
                                                    }).then((res) => {
                                                        if (res.isConfirmed) {
                                                            ClickRefusal(userId, data.consultation_id, data.counsel_date, data.counsel_time)
                                                        }
                                                        else {
                                                            return
                                                        }
                                                    })
                                                }}
                                            >
                                                거절
                                            </Button>
                                        </TableCell>
                                    </>
                                )}
                                {(data.counsel_state === '상담취소' || data.counsel_state === '승인거절') && (
                                    <>
                                        <TableCell align='center' sx={{color: 'red', fontWeight: 900}}>
                                            수락불가
                                        </TableCell>
                                        <TableCell align='center' sx={{color: 'red', fontWeight: 900}}>
                                            {data.counsel_state}
                                        </TableCell>
                                    </>
                                )}
                                {(data.counsel_state === '상담완료' || data.counsel_state === '상담승인') && (
                                    <>
                                        <TableCell align='center' sx={{color: 'green', fontWeight: 900}}>
                                            {data.counsel_state}
                                        </TableCell>
                                        <TableCell align='center' sx={{color: 'green', fontWeight: 900}}>
                                            취소불가
                                        </TableCell>
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
                {/* <Pagination
                    count={Math.ceil(counselListTestData.length / PAGE_COUNT)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="info"
                /> */}
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

export default ReqForConsultationList