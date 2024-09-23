/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */
import { Close } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { initSideMenu } from '../../../../../../../redux/actions/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faSitemap } from '@fortawesome/free-solid-svg-icons'

const DetailHeader = (props) => {
    const sideMenuValue = useSelector((state) => state.sideMenu)
    const dispatch = useDispatch()
    const { title } = props

    const handleCloseSideMenu = (e) => {
        e.stopPropagation()
        dispatch(initSideMenu())
    }
    
    return (
        <>
            <DetailHeaderLayout>
                <HeaderMenu>
                    <p>
                        <a href='https://pf.kakao.com/_WbJgxb'><FontAwesomeIcon icon={faComment} /> 입학상담</a>
                    </p>
                    <p>
                        <a href='https://www.yuhan.ac.kr/sitemap.do'><FontAwesomeIcon icon={faSitemap} /> 사이트맵</a>
                    </p>
                </HeaderMenu>
                <HeaderMain>
                    <ContentTitle>{title}</ContentTitle>
                    <MenuClose onClick={handleCloseSideMenu}>
                        <Close />
                    </MenuClose>
                </HeaderMain>
            </DetailHeaderLayout>
        </>
    )
}

const DetailHeaderLayout = styled.div`
    width: 100%;
    height: 15%;
    background-color: #0F275C;
    color: white;
    padding: 15px;
    border-bottom: 3px solid #0F275C;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const HeaderMenu = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    align-items: center;
    justify-content: end;
    p {
        margin-left: 25px;
    }
`

const HeaderMain = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ContentTitle = styled.div`
    font-size: 32px;
    font-weight: 900;
    border-left: 10px solid white;
    padding: 15px;
`

const MenuClose = styled.div`
    cursor: pointer;

    svg {
        width: 32px;
        height: 32px;
    }
`

export default DetailHeader