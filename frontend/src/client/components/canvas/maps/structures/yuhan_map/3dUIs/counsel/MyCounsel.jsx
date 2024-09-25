import React, { useEffect, useState } from 'react'
import { Button, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { counselTestData } from '../../../../../../../../data/commonData'
import styled from 'styled-components'
import axios from 'axios'
import Swal from 'sweetalert2'

const PAGE_COUNT = 5
let myCounselData

const MyCounsel = ({userId, userType}) => {

    const [currentPage, setCurrentPage] = useState(1) // 페이지 번호는 1부터 시작

    // 현재 페이지에 해당하는 데이터를 추출
    // const paginatedData = counselTestData.slice((currentPage - 1) * PAGE_COUNT, currentPage * PAGE_COUNT) // 테스트 코드
    const paginatedData = myCounselData?.slice((currentPage - 1) * PAGE_COUNT, currentPage * PAGE_COUNT)
    console.log('paginatedData', paginatedData)

    // 페이지 변경 처리
    const handleChangePage = (event, value) => {
        setCurrentPage(value)
    }

    // 상담이력 불러오기
    const GetMyCounselData = async () => {
        try {
            const response = await axios.get(`/api/consultation/my-counsel/${userType}/${userId}`)
            const data = response.data
            myCounselData = data.myCounsel
            // console.log(myCounselData)
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

    const ClickCancel = async (userId, consultationId) => {
        try {
            const response = await axios.put(`/api/consultation/my-counsel/${userId}/${consultationId}`)
            const data = response.data
            console.log(data)
            Swal.fire({
                icon: 'success',
                title: '상담취소',
                text: '신청하신 상담을 취소하였습니다.',
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `신청하신 상담을 취소할 수 없습니다: ${error}`,
            })
        }
    }

    useEffect(() => {
        if(userId) {
            GetMyCounselData()
        }
    }, [])
    
    return (
        <>
            {userId &&
                <>
                    <Table>
                        <TableHead>
                            <TableRow sx={{backgroundColor: '#0F275C'}}>
                                <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>NUM</TableCell>
                                <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>상담내용</TableCell>
                                <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>상담일시</TableCell>
                                <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>취업구분</TableCell>
                                <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>상태</TableCell>
                                <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>취소</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* 테스트 코드 */}
                            {/* {
                                paginatedData.map((data) => (
                                    <TableRow
                                        key={data.id}
                                        sx={{
                                            backgroundColor: data.id % 2 === 0 ? '#cad5e0' : '#ffffff', // 홀수/짝수 행 배경색
                                        }}
                                    >
                                        <TableCell align='center'>{data.id}</TableCell>
                                        <TableCell align='center' sx={{fontSize: '28px', fontWeight: 900}}>{data.title}</TableCell>
                                        <TableCell align='center'>{data.date}</TableCell>
                                        <TableCell align='center'>{data.date}</TableCell>
                                        <TableCell align='center'>{data.submitDate}</TableCell>
                                        {(data.status === '상담완료' || data.status === '상담승인') &&
                                            <>
                                                <TableCell align='center' sx={{color: 'green', fontWeight: 900}}>{data.status}</TableCell>
                                                <TableCell align='center' sx={{color: 'green', fontWeight: 900}}>취소불가</TableCell>
                                            </>
                                        }
                                        {data.status === '승인대기중' &&
                                            <>
                                                <TableCell align='center' sx={{color: 'orange', fontWeight: 900}}>{data.status}</TableCell>
                                                <TableCell align='center'>
                                                    <Button variant="contained" color="error">
                                                        취소
                                                    </Button>
                                                </TableCell>
                                            </>
                                        }
                                        {(data.status === '승인거절' || data.status === '상담취소') &&
                                            <>
                                                <TableCell align='center' sx={{color: 'red', fontWeight: 900}}>{data.status}</TableCell>
                                                <TableCell align='center' sx={{color: 'red', fontWeight: 900}}>취소불가</TableCell>
                                            </>
                                        }
                                    </TableRow>
                                ))
                            } */}
                            {
                                paginatedData?.map((data, idx) => (
                                    <TableRow
                                        key={data.consultation_id}
                                        sx={{
                                            backgroundColor: (idx + 1) % 2 === 0 ? '#cad5e0' : '#ffffff', // 홀수/짝수 행 배경색
                                        }}
                                    >
                                        <TableCell align='center'>{(currentPage - 1) * PAGE_COUNT + (idx + 1)}</TableCell>
                                        <TableCell align='center' sx={{fontSize: '28px', fontWeight: 900}}>{data.counsel_content}</TableCell>
                                        <TableCell align='center'>
                                            <b>{data.counsel_date}</b>
                                            <p>{data.counsel_time}</p>
                                        </TableCell>
                                        <TableCell align='center'>
                                            { data.employment_classification === 'careerGuidance' && '진로지도' }
                                            { data.employment_classification === 'ResumeAndCoverLetterConsulting' && '이력서' }
                                            { data.employment_classification === 'interviewConsulting' && '면접 컨설팅' }
                                            { data.employment_classification === 'EmploymentGuidance' && '취업지도' }
                                            { data.employment_classification === 'CriminalRecordMap' && '전과지도' }
                                            { data.employment_classification === 'OtherConsultation' && '기타상담' }
                                        </TableCell>
                                        {(data.counsel_state === '상담완료' || data.counsel_state === '상담승인') &&
                                            <>
                                                <TableCell align='center' sx={{color: 'green', fontWeight: 900}}>{data.counsel_state}</TableCell>
                                                <TableCell align='center' sx={{color: 'green', fontWeight: 900}}>취소불가</TableCell>
                                            </>
                                        }
                                        {data.counsel_state === '승인대기중' &&
                                            <>
                                                <TableCell align='center' sx={{color: 'orange', fontWeight: 900}}>{data.counsel_state}</TableCell>
                                                <TableCell align='center'>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => {
                                                            ClickCancel(userId, data.consultation_id)
                                                        }}
                                                    >
                                                        취소
                                                    </Button>
                                                </TableCell>
                                            </>
                                        }
                                        {(data.counsel_state === '승인거절' || data.counsel_state === '상담취소') &&
                                            <>
                                                <TableCell align='center' sx={{color: 'red', fontWeight: 900}}>{data.counsel_state}</TableCell>
                                                <TableCell align='center' sx={{color: 'red', fontWeight: 900}}>취소불가</TableCell>
                                            </>
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <PaginationContainer>
                        {/* 테스트 코드 */}
                        {/* <Pagination
                            count={Math.ceil(counselTestData.length / PAGE_COUNT)}
                            page={currentPage}
                            onChange={handleChangePage}
                            color="info"
                        /> */}
                        <Pagination
                            count={myCounselData ? Math.ceil(Object.keys(myCounselData).length / PAGE_COUNT) : 0}
                            page={currentPage}
                            onChange={handleChangePage}
                            color="info"
                        />
                    </PaginationContainer>
                </>
            }
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