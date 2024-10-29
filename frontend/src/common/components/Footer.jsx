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
        <>
            <p>&copy; 2024 유한대학교 19PLUS 졸업작품</p>
            <p>이석재 임성준 이정민 오자현</p>
            <b>기술스택</b>
            <br />
            <br />
            <IconList>
                <IconItem>
                    <FontAwesomeIcon icon={faHtml5} />HTML5
                    <FontAwesomeIcon icon={faCss3} />CSS3
                    <FontAwesomeIcon icon={faJs} />JavaScript
                </IconItem>
                <IconItem>
                    <FontAwesomeIcon icon={faReact} />React
                    <FontAwesomeIcon icon={faNodeJs} />NodeJS
                    <FontAwesomeIcon icon={faDatabase} />MySQL
                </IconItem>
            </IconList>
        </>
    )
}

const IconList = styled.div`
    width: 30%;
    margin: 0 auto;
`

const IconItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 10px;
    
    & > * {
        font-size: 24px;
    }
`

export default Footer