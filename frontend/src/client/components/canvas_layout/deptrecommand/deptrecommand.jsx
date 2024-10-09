import React, { useState, useEffect } from "react";
import axios from "axios";
import { School, Business, Engineering, Brush, LocalHospital, Favorite } from '@mui/icons-material';
import { departmentLinks } from '../../../../data/commonData'
import styled from "styled-components";

const DeptRecommand = () => {
  const [questions, setQuestions] = useState({});
  const [currentQuestionSet, setCurrentQuestionSet] = useState([]);
  const [rotationCount, setRotationCount] = useState(0);
  const [excludedDepartments, setExcludedDepartments] = useState([]);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [askedQuestions, setAskedQuestions] = useState({});
  const departments = ["공학부", "디자인문화학부", "건강보건학부", "건강생활학부", "비즈니스학부"];

  // 학부 추천 기능이 실행되었을때 데이터베이스에서 학부 질문을 가져옴
  useEffect(() => {
    axios
      .get("/api/deptrec/questions")
      .then((res) => {
        const questionData = res.data.reduce((acc, item) => {
          acc[item.dept_name] = acc[item.dept_name]
            ? [...acc[item.dept_name], item.question]
            : [item.question];
          return acc;
        }, {});
        setQuestions(questionData);
        setScores(Object.fromEntries(departments.map(dept => [dept, 0])));
        setAskedQuestions(Object.fromEntries(departments.map(dept => [dept, new Set()])));
        setLoading(false);
      })
      .catch((err) => {
        console.error("질문 가져오기 실패:", err);
        setLoading(false);
      });
  }, []);

  // 학부 질문이 로딩된 후에 질문 세트를 선택하는 useEffect 추가
  useEffect(() => {
    // questions와 scores가 설정되었고 로테이션이 0일 때 초기 질문 세트를 설정
    if (Object.keys(questions).length > 0 && Object.keys(scores).length > 0 && rotationCount === 0) {
      const initialQuestionSet = getNextQuestionSet(); // 첫 질문 세트 설정
      setCurrentQuestionSet(initialQuestionSet); // 초기 질문 세트 설정
    }
  }, [questions, scores, rotationCount]); // 초기 상태에서만 실행

  useEffect(() => {
    // 학과가 제외된 후에 질문 세트를 선택
    if (rotationCount > 0 && Object.keys(questions).length > 0) {
      const nextQuestionSet = getNextQuestionSet();
      setCurrentQuestionSet(nextQuestionSet); // 새로운 질문 세트 설정
    }
  }, [excludedDepartments, rotationCount, questions]); // excludedDepartments, rotationCount가 변경될 때마다 실행
  
  useEffect(() => {
    if (rotationCount > 0) {
      console.log(`로테이션 ${rotationCount} 종료 후 학부별 점수:`, scores);

      if (rotationCount >= 3) {
        excludeDepartments();
      }
    }
  }, [scores, rotationCount]);


  const getRandomQuestion = (dept) => {
    let availableQuestions = questions[dept].filter(q => !askedQuestions[dept].has(q));
  
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
  
    // 선택된 질문을 기록해 중복 선택을 방지
    setAskedQuestions(prev => ({
      ...prev,
      [dept]: new Set([...prev[dept], selectedQuestion])
    }));
  
    console.log(`  선택된 ${dept} 질문: ${selectedQuestion}`);
    return selectedQuestion;
  };
  

  // 다음 로테이션의 질문을 선택하는 메서드
  const getNextQuestionSet = () => {
    let remainingDepartments = departments.filter(dept => !excludedDepartments.includes(dept));
    const selectedQuestions = [];
  
    // 기본 로테이션에서 질문 선택 (점수가 높은 학부에서 추가 질문을 선택하는 로직 제거)
    remainingDepartments = [...remainingDepartments].sort(() => 0.5 - Math.random());
    for (const dept of remainingDepartments) {
      const randomQuestion = getRandomQuestion(dept);
      if (randomQuestion) {
        selectedQuestions.push({ dept, question: randomQuestion });
      }
    }
  
    // 더 이상 추가 질문을 선택하지 않고, 선택된 질문들만 반환
    return selectedQuestions;
  };

  // 최하위 학부 1개를 제외하는 메서드
  const excludeDepartments = () => {
    const currentScores = Object.entries(scores)
      .filter(([dept]) => !excludedDepartments.includes(dept)) // 제외된 학부 필터링
      .sort((a, b) => a[1] - b[1]); // 점수를 기준으로 오름차순 정렬
  
    if (currentScores.length > 0) {
      const lowestScore = currentScores[0][1]; // 최하위 점수 추출
      const lowestScoreDepartments = currentScores.filter(([, score]) => score === lowestScore).map(([dept]) => dept);
  
      if (lowestScoreDepartments.length === 1) {
        const departmentToExclude = lowestScoreDepartments[0];
        setExcludedDepartments(prev => [...prev, departmentToExclude]);
        console.log("제외된 학부:", departmentToExclude);
      } else {
        // 최하위 학부가 여러 개일 때 점수 출력
        console.log(`최하위 학부가 ${lowestScoreDepartments.length}개이므로 제외하지 않음:`, lowestScoreDepartments);
        
        // 각 학부의 점수 출력
        lowestScoreDepartments.forEach(dept => {
          const score = currentScores.find(([department]) => department === dept)[1];
          console.log(`학부: ${dept}, 점수: ${score}`);
        });
      }
    }
  
    // 디버깅용: 현재 학부별 점수 출력
    console.log('현재 학부별 점수:', Object.fromEntries(currentScores));
  };

  // API 호출 함수 (학과명과 점수를 전송)
  const submitScores = async (departmentData) => {
    try {
      const response = await axios.post('/api/deptrec/updateScores', {
        departmentData, // 학과명과 점수 전송
      });

      if (response.status === 200) {
        console.log('점수 업데이트 완료:', response.data.message);
      }
    } catch (error) {
      console.error('점수 전송 실패:', error);
    }
  };
    
  // 사용자가 답변을 제출했을때 제출처리를 진행하는 메서드
  const handleAnswer = (deptName, question, score) => {
    setAnswers(prev => ({
      ...prev,
      [`${deptName}-${question}`]: score
    }));
  };

  const handleSubmit = () => {
    // 새롭게 업데이트된 점수 정보를 newScores에 저장
    const newScores = { ...scores };
    Object.entries(answers).forEach(([key, score]) => {
      const [deptName] = key.split("-");
      newScores[deptName] = (newScores[deptName] || 0) + score;
    });
  
    // 새롭게 업데이트된 로테이션 횟수를 업데이트
    const newRotationCount = rotationCount + 1;
  
    // 3로테이션까지 진행된 상황에서 모든 학부의 점수가 동일하다면?
    if (newRotationCount === 3) {
      const uniqueScores = new Set(Object.values(newScores));
      if (uniqueScores.size === 1) {
        setResult({ recommendation: "자유전공학과" });
        return;
      }
    }
  
    // 상태를 한꺼번에 업데이트하면서 완료 후에 질문 세트를 선택
    setScores(newScores);
    setRotationCount(newRotationCount);
    setAnswers({});
  
    // 7로테이션이 되면 전체 학과 순위를 매긴 후 결과 표시
    if (newRotationCount === 7) {
      const sortedScores = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
  
      let previousScore = null;
      let currentRank = 0;
      let displayRank = 0;
  
      // 순위를 계산하는 기존 로직을 유지
      const rankedDepartments = sortedScores.map(([dept, score], index) => {
        if (score !== previousScore) {
          displayRank = currentRank + 1; // 점수가 다르면 displayRank를 업데이트
        }
        currentRank = displayRank; // 현재 순위는 항상 displayRank를 따라감
  
        previousScore = score;
        return { rank: displayRank, deptName: dept, score: score };
      });
  
      // 학과명과 점수를 API로 전송하기 위한 데이터 생성
      const departmentData = sortedScores.map(([dept, score]) => ({
        deptName: dept,
        score: score,
      }));
  
      // API 호출 추가 (학과명과 점수를 백엔드로 전송)
      submitScores(departmentData);
  
      // 기존 결과 표시
      setResult({ ranking: rankedDepartments });
      return;
    }
  };

  // 학부별 아이콘을 반환하는 함수
  const getDepartmentIcon = (dept) => {
    switch (dept) {
      case "공학부":
        return <Engineering style={{ fontSize: 40, color: "#007bff" }} />;
      case "디자인문화학부":
        return <Brush style={{ fontSize: 40, color: "#007bff" }} />;
      case "건강보건학부":
        return <LocalHospital style={{ fontSize: 40, color: "#007bff" }} />;
      case "건강생활학부":
        return <Favorite style={{ fontSize: 40, color: "#007bff" }} />;
      case "비즈니스학부":
        return <Business style={{ fontSize: 40, color: "#007bff" }} />;
      default:
        return null;
    }
  };

  // 아이콘 클릭 시 해당 학부 페이지로 이동하는 함수
  const handleIconClick = (dept) => {
    const url = departmentLinks[dept];
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) return <div>로딩 중...</div>;

// 결과가 있을 때 조건부로 렌더링
if (result) {
  return (
    <ResultContainer>
      <h2>학부추천 결과</h2>
      {result.recommendation ? (
        // 자유전공학과가 추천된 경우
        <FreeDeptContainer>
          <p>아직 진로를 명확하게 결정하지 못하셨나요? 그러면 이런 선택지는 어떠신가요?</p>
          <p>아이콘을 클릭하면 자유전공학과 소개 페이지로 이동합니다.</p>
          <IconTextWrapper onClick={() => handleIconClick("자유전공학과")}>
            <School style={{ fontSize: 50, color: "#007bff", cursor: "pointer" }} />
            <span>자유전공학과 소개 페이지로 이동하기</span>
          </IconTextWrapper>
        </FreeDeptContainer>
      ) : (
        <div>
          <SubTitle>아이콘을 클릭하면 각 학부의 대표 학과 소개 페이지로 이동합니다.</SubTitle>
          {result.ranking && result.ranking.length > 0 ? (
            <div>
              {result.ranking.map((item, index) => {
                return (
                  <RankBox key={index}>
                    <IconTextWrapper onClick={() => handleIconClick(item.deptName)}>
                      <RankText>{`${item.rank}위`} {/* 순위 출력 */}</RankText>
                      {getDepartmentIcon(item.deptName)} {/* 학부 아이콘 출력 */}
                      <span>{item.deptName}</span> {/* 학부 이름 출력 */}
                      <span>{`${item.score}점`}</span> {/* 점수 출력 */}
                    </IconTextWrapper>
                  </RankBox>
                );
              })}

              {/* 자유전공학과는 마지막에 한 번만 표시 */}
              <FreeDeptContainer>
                <p>어떤 학부를 선택할지 결정을 못하셨나요? 그러면 이런 선택지는 어떠신가요?</p>
                <p>아이콘을 클릭하면 자유전공학과 소개 페이지로 이동합니다.</p>
                <IconTextWrapper onClick={() => handleIconClick("자유전공학과")}>
                  <School style={{ fontSize: 50, color: "#007bff", cursor: "pointer" }} />
                  <span>자유전공학과 소개 페이지로 이동하기</span>
                </IconTextWrapper>
              </FreeDeptContainer>
            </div>
          ) : (
            <p>순위 데이터를 불러올 수 없습니다.</p>
          )}
        </div>
      )}
    </ResultContainer>
  );
}



  
  const allQuestionsAnswered = currentQuestionSet.every(
    question => answers[`${question.dept}-${question.question}`] !== undefined
  );

  return (
    <RecommendContainer>
      <h2>학부추천 (로테이션 {rotationCount + 1})</h2>
      {currentQuestionSet.map((currentQuestion, index) => (
        <QuestionContainer key={`${currentQuestion.dept}-${currentQuestion.question}-${index}`}>
          <p>{currentQuestion.question}</p>
          <AnswerButtons>
            {[1, 2, 3, 4, 5].map(score => (
              <AnswerButton
                key={`${currentQuestion.dept}-${currentQuestion.question}-${score}-${index}`}
                onClick={() => handleAnswer(currentQuestion.dept, currentQuestion.question, score)}
                selected={answers[`${currentQuestion.dept}-${currentQuestion.question}`] === score}
              >
                {score}
              </AnswerButton>
            ))}
          </AnswerButtons>
        </QuestionContainer>
      ))}
      <SubmitButton onClick={handleSubmit} disabled={!allQuestionsAnswered}>
        다음 질문 세트로
      </SubmitButton>
    </RecommendContainer>
  );
};

export default DeptRecommand;



const IconTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
  margin-top: 10x;
  margin-bottom: 5px;
  font-size: 1.2em;
  color: #007bff;
  width: 100%;

  span {
    position: relative;
  }
`;

const RankBox = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  width: 100%; // 전체 너비 사용
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px 0; // 위아래 마진만 유지
`;

const FreeDeptContainer = styled.div`
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: #f0f8ff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;


const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const QuestionContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;


const AnswerButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const AnswerButton = styled.button`
  background-color: ${props => (props.selected ? "#0056b3" : "#007bff")};
  color: white;
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  margin: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const SubTitle = styled.h4`
  text-align: center;
    margin-top: 5px;    // 원하는 간격 설정
`;
const Title = styled.h2`
  margin-bottom: 5px;  // 원하는 간격 설정
`;

const RankText = styled.span`
    font-weight: 900;
    font-size: 1.3em;
`;
