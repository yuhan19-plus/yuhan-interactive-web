import React, { useEffect, useState } from 'react'
import { Button, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { counselTestData } from '../../../../../../../../data/commonData'
import styled from 'styled-components'
import axios from 'axios'
const PAGE_COUNT = 5
const MyCounsel = ({userId}) => {
    // const [counselInfo, setCounselInfo] = useState({
    //     counsel_content: "",
    //     counsel_date: "",
    //     createAt: "",
    //     counsel_state: ""
    // })

    // const myCounselData = {
    //     // 상담내용, 상담일시, 신청일, 상태
    //     counselContent: counselInfo[0].counsel_content,
    //     counselDate: counselInfo[0].counsel_date,
    //     reqForCounselDate: counselInfo[0].createAt,
    //     counselState: counselInfo[0].counsel_state
    // }

    const [currentPage, setCurrentPage] = useState(1) // 페이지 번호는 1부터 시작

    // 현재 페이지에 해당하는 데이터를 추출
    const paginatedData = counselTestData.slice((currentPage - 1) * PAGE_COUNT, currentPage * PAGE_COUNT)

    // 페이지 변경 처리
    const handleChangePage = (event, value) => {
        setCurrentPage(value)
    }

    // // 상담이력 불러오기
    // const GetMyCounselData = async () => {
    //     try {
    //         const response = await axios.get(`/api/consultation/my-counsel/${userId}`)
    //         const data = response.data
    //         console.log(data)
    //         Swal.fire({
    //             icon: 'success',
    //             title: '데이터 로드 성공.',
    //             text: '사용자 데이터를 가져왔습니다.',
    //         })
    //     } catch (error) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: '오류 발생',
    //             text: `사용자 데이터를 가져오는 도중 오류가 발생했습니다: ${error}`,
    //         })
    //     }
    // }

    // useEffect(() => {
    //     GetMyCounselData()
    // }, [])
    
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
                                <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>신청일</TableCell>
                                <TableCell align='center' sx={{color: '#FFFFFF', fontWeight: 900}}>상태</TableCell>
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
                            }
                        </TableBody>
                    </Table>
                    <PaginationContainer>
                        <Pagination
                            count={Math.ceil(counselTestData.length / PAGE_COUNT)}
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