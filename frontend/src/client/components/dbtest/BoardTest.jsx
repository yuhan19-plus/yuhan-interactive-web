/** 파일 생성자 : 오자현
 *  db연동 test페이지
 *  저장, 조회, 업데이트, 삭제 구현
 * */
import { Input } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const BoardTest = () => {
  // React 상태 훅을 사용하여 testdata 상태를 정의
  // 이 상태는 입력된 데이터를 저장하는 데 사용
  const [testdata, setTestdata] = useState({
    text: "", // 초기값으로 빈 문자열을 설정
  });

  const [dataList, setDataList] = useState([]);
  const updateRefs = useRef([]);

  // 입력 필드의 값이 변경될 때 호출되는 함수
  // 이벤트 객체에서 name과 value를 추출하여 상태를 업데이트합니다.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 기존 testdata 상태를 복사한 후, name에 해당하는 필드를 업데이트
    setTestdata({ ...testdata, [name]: value });
  };

  // 데이터를 읽어오는 함수
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/testdb"); // 서버에서 데이터를 가져오는 요청
      if (!response.ok) {
        throw new Error("데이터를 불러오는데 실패했습니다.");
      }
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      console.error("데이터불러오는 중 에러발생", error);
    }
  };

  // 페이지가 로드(컴포넌트가 마운트될 때)되면 기본데이터 불러옴
  useEffect(() => {
    fetchData();
  }, []);

  // 데이터를 추가하는 버튼 클릭 시 호출되는 함수
  const handleAddData = async () => {
    try {
      // fetch API를 사용하여 서버에 POST 요청을 보냄
      const response = await fetch("http://localhost:4000/testdb", {
        method: "POST", // HTTP 메서드로 POST를 사용하여 데이터 전송
        headers: { "Content-Type": "application/json" }, // JSON 형식으로 전송할 것을 명시
        body: JSON.stringify(testdata), // 상태 데이터를 JSON 문자열로 변환하여 요청의 본문에 포함
      });

      // 서버 응답이 정상적인지 확인 (HTTP 상태 코드 200-299)
      if (!response.ok) {
        // 응답이 실패했을 경우 에러를 발생시킴
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 서버로부터 응답을 텍스트로 받아옴
      const result = await response.text();
      // 응답 결과를 사용자에게 알림으로 표시
      alert(result);
      // 데이터가 성공적으로 추가된 후 입력 필드를 초기화
      setTestdata({ text: "" });
      // 데이터가 성공적으로 추가된 후 데이터를 다시 불러옴
      fetchData();
    } catch (error) {
      // 요청 중 오류가 발생하면 콘솔에 로그를 출력하고, 사용자에게 알림
      console.error("Error adding data:", error);
      alert("데이터 추가 중 오류 발생!");
    }
  };

  const handleUpdateData = async (index) => {
    const updateText = updateRefs.current[index]?.value;
    if (updateText) {
      console.log("updateText:", updateText); // 수정할 값을 콘솔에 출력
    } else {
      console.log("updateText가 undefined 또는 null입니다.");
      console.log("updateRefs.current[index]:", updateRefs.current[index]); // 참조를 확인
      console.log("index:", index); // 인덱스를 확인
      return;
    }

    try {
      // fetch API를 사용하여 서버에 put 요청을 보냄
      const response = await fetch(
        `http://localhost:4000/testdb/${dataList[index].ID_num}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" }, // JSON 형식으로 전송할 것을 명시
          body: JSON.stringify({ text: updateText }), // 수정된 데이터를 JSON 문자열로 변환하여 요청의 본문에 포함
        }
      );

      // 서버 응답이 정상적인지 확인 (HTTP 상태 코드 200-299)
      if (!response.ok) {
        // 응답이 실패했을 경우 에러를 발생시킴
        throw new Error(`HTTP error! status: ${response.status}`);
      } // 서버로부터 응답을 텍스트로 받아옴
      const result = await response.text();
      // 응답 결과를 사용자에게 알림으로 표시
      alert(result);
    } catch (error) {
      // 요청 중 오류가 발생하면 콘솔에 로그를 출력하고, 사용자에게 알림
      console.error("Error updating data:", error);
      alert("데이터 추가 중 오류 발생!");
    }
  };

  const handleDeleteData = async (index) => {
    const ID_num = dataList[index].ID_num; // 데이터베이스의 실제 ID 값을 가져옴
    try {
      // fetch API를 사용하여 서버에 POST 요청을 보냄
      const response = await fetch(`http://localhost:4000/testdb/${ID_num}`, {
        method: "DELETE", // HTTP 메서드로 POST를 사용하여 데이터 전송
        headers: { "Content-Type": "application/json" }, // JSON 형식으로 전송할 것을 명시
      });
      // 서버 응답이 정상적인지 확인 (HTTP 상태 코드 200-299)
      if (!response.ok) {
        // 응답이 실패했을 경우 에러를 발생시킴
        throw new Error(`HTTP error! status: ${response.status}`);
      } // 서버로부터 응답을 텍스트로 받아옴
      const result = await response.text();
      // 응답 결과를 사용자에게 알림으로 표시
      alert(result);
      // 데이터가 성공적으로 삭제된 후 데이터를 다시 불러옴
      fetchData();
    } catch (error) {
      // 요청 중 오류가 발생하면 콘솔에 로그를 출력하고, 사용자에게 알림
      console.error("Error deleting data:", error);
      alert("데이터 삭제 중 오류 발생!");
    }
  };

  return (
    <TestDB>
      <Datainput>
        <h3>데이터베이스 Test</h3>
        <br />
        <Input
          type="text"
          name="text"
          placeholder="Text"
          value={testdata.text}
          onChange={handleInputChange}
        />

        <button onClick={handleAddData}>추가</button>
      </Datainput>
      <Dataload>
        <h3>저장된 데이터</h3>
        <table>
          <thead>
            <tr>
              <th>ID_num</th>
              <th>Text</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((data, index) => (
              <tr key={index}>
                <td>{data.ID_num}</td>
                <td>
                  <Input
                    type="text"
                    name={`text-${index}`}
                    defaultValue={data.text}
                    inputRef={(el) => (updateRefs.current[index] = el)}
                  />
                </td>
                <td>
                  <button onClick={() => handleUpdateData(index)}>수정</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteData(index)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Dataload>
    </TestDB>
  );
};

export default BoardTest;

const TestDB = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const Datainput = styled.div``;

const Dataload = styled.div``;
