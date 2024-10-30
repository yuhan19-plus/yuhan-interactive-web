/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */
import { Close } from '@mui/icons-material'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { initSideMenu } from '../../../../../../../redux/actions/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faSitemap } from '@fortawesome/free-solid-svg-icons'

const DetailHeader = (props) => {
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
    background-color: var(--main-color);
    color: var(--sub-color);
    padding: 1rem;
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
        margin-left: 1rem;
    }
`

const HeaderMain = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ContentTitle = styled.div`
    font-size: 2rem;
    font-weight: 900;
    border-left: 0.7rem solid var(--sub-color);
    padding: 1rem;
`

const MenuClose = styled.div`
    cursor: pointer;

    svg {
        width: 2.5rem;
        height: 2.5rem;
    }
`

export default DetailHeader