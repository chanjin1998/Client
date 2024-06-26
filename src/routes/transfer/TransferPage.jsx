import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import "./TransferPage.css";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import { Link, useParams } from "react-router-dom";
import { fetchTransferList } from "../../lib/apis/transfer";
import { fetchPartyInfo } from "../../lib/apis/party";
import { fetchPartyAdmin } from "../../lib/apis/party";

export default function TransferPage() {
  const [transferData, setTransferData] = useState([]);
  const [partyInfo, setPartyInfo] = useState();
  const [role, setRole] = useState();

  const partyKey = useParams().partyKey;
  const callTransferData = async () => {
    try {
      const response = await fetchTransferList(partyKey);
      setTransferData(response);
    } catch (error) {
      console.error("이체 데이터 호출 중 에러:", error);
    }
  };

  const callPartyInfo = async () => {
    try {
      const response = await fetchPartyInfo(partyKey);
      setPartyInfo(response);
    } catch (error) {
      console.error("모임 정보 데이터 호출 중 에러:", error);
    }
  };
  const callPartyAdminInfo = async () => {
    try {
      const response = await fetchPartyAdmin(partyKey);
      setRole(response.data.role);
    } catch (error) {
      console.error("모임 정보 운영자 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callTransferData();
    callPartyInfo();
    callPartyAdminInfo();
  }, []);

  let deposit = 0;

  if (partyInfo) {
    deposit = partyInfo.deposit;
  }

  return (
    <>
      <TopNavigationBar text={"이체하기"} to={`/party/${partyKey}/myparty`} />

      <Container>
        <div className="transfer-possible-price-sentence">이체 가능 금액</div>
        <div className="transfer-possible-price">
          {deposit.toLocaleString()}원
        </div>
        {role === 0 ? (
          <></>
        ) : (
          <Link
            to={`transferDetailAccountNumPage`}
            preventScrollReset
            className="text-decoration-none"
          >
            <PrimaryButton text="이체하기" minWidth="100%" />
          </Link>
        )}

        <hr />
        <div className="full-transfer-sentence">전체 내역</div>
        {transferData.map((data, index) => (
          <React.Fragment key={index}>
            <Row>
              <Col xs={2} className="transfer-date">
                {`${new Date(data.createdAt).getMonth() + 1}.${new Date(
                  data.createdAt
                ).getDate()}`}
              </Col>
              <Col xs={4} className="transfer-name">
                {data.name}
              </Col>
              <Col xs={6} className="transfer-price">
                -{data.price.toLocaleString()}원
              </Col>
            </Row>
            <Row>
              <Col className="transfer-second-line transfer-deposit">
                {data.deposit.toLocaleString()}원
              </Col>
            </Row>
          </React.Fragment>
        ))}
      </Container>
    </>
  );
}
