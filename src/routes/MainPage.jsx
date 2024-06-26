import logo from "../assets/logo.svg";
import "./MainPage.css";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../components/common/button/PrimaryButton";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { changePartyKey } from "../store/reducers/partyReducer";
import { useEffect } from "react";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const party = useSelector((state) => state.party.partyKey);
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("partyKey");

  const fetchParty = () => {
    dispatch(changePartyKey({ partyKey: `${key}` }));
  };

  useEffect(() => {
    if (!party.partyKey) {
      fetchParty();
    }
  }, [party]);
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
            onClick={(e) => navigate("/signup")}
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ marginBottom: "2vh" }}>
          <span>이미 계정이 있나요? </span>
          <span className="login-button" onClick={(e) => navigate("/login")}>
            로그인
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
