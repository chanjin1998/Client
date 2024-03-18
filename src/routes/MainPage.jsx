import logo from "../assets/logo.svg";
import "./MainPage.css";
import PrimaryButton from "../components/common/button/PrimaryButton";
import { Col, Container, Row } from "react-bootstrap";
const MainPage = () => {
  return (
    <Container className="main-container">
      <Row>
        <Col className="main-title">
          <img src={logo} alt="Logo" />
          <h2>함께하는 투자</h2>
          <div>FLOW와 함께라면 쉬워요</div>
          <div>지금 모임을 만들고 투자를 시작해보세요!</div>
        </Col>
      </Row>
      <Row className="account-link">
        <Col>
          <PrimaryButton
            className="start-button"
            text="시작하기"
            minWidth="100%"
          />
        </Col>
      </Row>
      <Col>
        <span>이미 계정이 있나요? </span>
        <span className="login-button">로그인</span>
      </Col>
      <Row></Row>
    </Container>
  );
};

export default MainPage;
