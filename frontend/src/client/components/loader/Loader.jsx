/** 파일 생성자 : 임성준
 * 오브젝트 담당 : 이정민
 * 기능구현 : 오자현
 */
import React from 'react'
import styled from 'styled-components'

const Loader = () => {
    return (
        <LoaderLayout>Loader</LoaderLayout>
    )
}

const LoaderLayout = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;
`

export default Loader