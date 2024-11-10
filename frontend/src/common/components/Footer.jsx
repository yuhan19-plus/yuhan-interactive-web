/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */

import { faCss3, faHtml5, faJs, faNodeJs, faReact } from '@fortawesome/free-brands-svg-icons'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (
        <FooterWrapper>
            <FooterContent>
                <p>&copy; 2024 유한대학교 19PLUS 졸업작품</p>
                <p>이석재 임성준 이정민 오자현</p>
                <b>기술스택</b>
            </FooterContent>
            <IconList>
                <IconItem>
                    <p><FontAwesomeIcon icon={faHtml5} />HTML5</p>
                    <p><FontAwesomeIcon icon={faCss3} />CSS3</p>
                    <p><FontAwesomeIcon icon={faJs} />JavaScript</p>
                </IconItem>
                <IconItem>
                    <p><FontAwesomeIcon icon={faReact} />React</p>
                    <p><FontAwesomeIcon icon={faNodeJs} />NodeJS</p>
                    <p><FontAwesomeIcon icon={faDatabase} />MySQL</p>
                </IconItem>
            </IconList>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 1.5rem 5rem;
`

const FooterContent = styled.div`
    width: 100%;
    margin-bottom: 1rem;

    P {
        margin-bottom: 0.5rem;
    }

    p, b {
        font-size: 1.3rem;
    }
`

const IconList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const IconItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 1rem;

    p {
        display: flex;
        align-items: center;
        font-size: 1.3rem;
        
        svg {
            margin-right: 0.3rem;
        }
    }
`

export default Footer