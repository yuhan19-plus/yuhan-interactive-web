import React, { useState } from 'react'
import { Button, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import styled from 'styled-components'
import { counselListTestData } from '../../../../../../../../../data/commonData'
const PAGE_COUNT = 5

const ReqForConsultationList = () => {
    const [currentPage, setCurrentPage] = useState(1) // 페이지 번호는 1부터 시작

    // 현재 페이지에 해당하는 데이터를 추출
    const paginatedData = counselListTestData.slice((currentPage - 1) * PAGE_COUNT, currentPage * PAGE_COUNT)

    // 페이지 변경 처리
    const handleChangePage = (event, value) => {
        setCurrentPage(value)
    }
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
                    {
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
                                <TableCell align='center'>{data.name}</TableCell>
                                <TableCell align='center'>{data.submitDate}</TableCell>
                                {data.status === '승인대기중' && (
                                    <>
                                        <TableCell align='center'>
                                            <Button variant="contained" color="success">수락</Button>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Button variant="contained" color="error">거절</Button>
                                        </TableCell>
                                    </>
                                )}
                                {(data.status === '상담취소' || data.status === '승인거절') && (
                                    <>
                                        <TableCell align='center' sx={{color: 'red', fontWeight: 900}}>
                                            수락불가
                                        </TableCell>
                                        <TableCell align='center' sx={{color: 'red', fontWeight: 900}}>
                                            {data.status}
                                        </TableCell>
                                    </>
                                )}
                                {(data.status === '상담완료' || data.status === '상담승인') && (
                                    <>
                                        <TableCell align='center' sx={{color: 'green', fontWeight: 900}}>
                                            {data.status}
                                        </TableCell>
                                        <TableCell align='center' sx={{color: 'green', fontWeight: 900}}>
                                            취소불가
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <PaginationContainer>
                <Pagination
                    count={Math.ceil(counselListTestData.length / PAGE_COUNT)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="info"
                />
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