import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./TransferDetailConfirmPage.css";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchPartyInfo } from "../../lib/apis/party";

export default function TransferDetailConfirmPage() {
  const location = useLocation();
  const name = location.state.name;
  const accountNumber = location.state.accountNumber;
  const price = location.state.price;
  const [partyInfo, setPartyInfo] = useState([]);

  const partyKey = 25; //TODO: 수정 필요

  const callPartyInfo = async () => {
    try {
      const response = await fetchPartyInfo(partyKey);
      setPartyInfo(response);
    } catch (error) {
      console.error("이체 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callPartyInfo();
  }, []);

  return (
    <>
      <TopNavigationBar />
      <Container className="transfer-detail-page">
        <div className="transfer-confirm-sentence">
          <div className="transfer-account-name">
            <span class="blue-text">{name}</span>님에게
          </div>
          <div className="transfer-price-ask">
            <span class="blue-text">{price.toLocaleString()}</span>원을
          </div>
          <div className="transfer-ask">옮길까요?</div>
        </div>

        <Row className="transfer-detail-info" style={{ marginTop: "auto" }}>
          <Col className="transfer-detail-title">받는 분에게 표시</Col>
          <Col className="transfer-detail-content">177의 모임투자</Col>
        </Row>
        <Row className="transfer-detail-info">
          <Col className="transfer-detail-title">출금 계좌</Col>
          <Col className="transfer-detail-content">
            신한투자 {partyInfo.accountNumber}{" "}
          </Col>
        </Row>
        <Row className="transfer-detail-info">
          <Col className="transfer-detail-title">입금 계좌</Col>
          <Col className="transfer-detail-content">{accountNumber}</Col>
        </Row>

        <PrimaryButton
          text="이체하기"
          minWidth="100%"
          style={{ marginTop: "2vh" }}
        />
      </Container>
    </>
  );
}
