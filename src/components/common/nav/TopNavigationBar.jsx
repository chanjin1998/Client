import { Container, Image, Nav, Navbar } from "react-bootstrap";
import BackButton from "../../../assets/back.png";
import HamburgerButton from "../../../assets/hamburger.png";
import SettingButton from "../../../assets/settings.png";
import XButton from "../../../assets/x.png";
import HomeButton from "../../../assets/home.png";
import RightArrowButton from "../../../assets/right_arrow.png";
import DownArrowButton from "../../../assets/down_arrow.png";
import InterestButton from "../../../assets/interest.png";
import StockButton from "../../../assets/stock.png";
import TransferButton from "../../../assets/cash.png";
import FlowButton from "../../../assets/Flow.png";
import AlarmButton from "../../../assets/alarm.png";
import "./TopNavigationBar.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  fetchPartyInquire,
  fetchUser,
  fetchPartyInfo,
} from "../../../lib/apis/party";
import { fetchDepositData } from "../../../lib/apis/stock";

const TopNavigationBar = ({ text, type = 0 }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const userName = userInfo.name;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [partyInfo, setPartyInfo] = useState([]);
  const { partyKey } = useParams();
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleFlowButtonClick = () => {
    navigate("/party");
  };

  const handleHamburgerButtonClick = () => {
    setMenuOpen(!menuOpen);
    setToggleOpen(false);
  };

  const handleSettingButtonClick = (partyKey) => {
    navigate(`/party/${partyKey}/info`);
  };

  const handletoggleButtonClick = () => {
    setToggleOpen(!toggleOpen);
  };
  const handleHomeButtonClick = () => {
    navigate("/party");
  };

  const callPartyInfo = async () => {
    try {
      const response = await fetchPartyInfo(partyKey);
      setPartyInfo(response);
    } catch (error) {
      console.error("모임 정보 데이터 호출 중 에러:", error);
    }
  };

  const [infos, setInfos] = useState([]);

  //TODO 햄버거버튼 연결

  // console.log(infos);

  useEffect(() => {
    callPartyInfo();
  }, []);

  if (type === 0) {
    //기본, 뒤로가기와 가운데 텍스트 있음
    return (
      <Navbar className="navbar">
        <Container className="navbar-container">
          <Navbar.Brand
            onClick={handleBackButtonClick}
            className="navbar-brand"
          >
            <Image src={BackButton} alt="Back" />
          </Navbar.Brand>
          <Nav.Item className="nav-item-text">{text}</Nav.Item>
        </Container>
      </Navbar>
    );
  } else if (type === 1) {
    //햄버거 버튼 있는 버전
    const partyName = partyInfo.name;
    const partyAccountNumber = partyInfo.accountNumber;

    return (
      <Navbar className="navbar">
        <Container className="navbar-container">
          <Navbar.Brand
            onClick={handleBackButtonClick}
            className="navbar-brand"
          >
            <Image src={BackButton} alt="Back" />
          </Navbar.Brand>
          <Nav.Item className="nav-item-text">{text}</Nav.Item>

          <Navbar.Brand
            onClick={handleHamburgerButtonClick}
            className="navbar-brand icon-right"
          >
            <Image src={HamburgerButton} alt="Hamburger" />
          </Navbar.Brand>
        </Container>
        {menuOpen && (
          <div className="slide-menu-background active">
            <div className="slide-menu">
              <div className="slide-menu-top">
                <div className="slide-menu-x">
                  <Navbar.Brand
                    onClick={handleHamburgerButtonClick}
                    className="navbar-brand"
                  >
                    <Image src={XButton} className="x-btn" alt="X" />
                  </Navbar.Brand>
                </div>
                <div className="slide-menu-top-info">
                  <div className="home-name">
                    <div className="go-to-home" onClick={handleHomeButtonClick}>
                      <Image src={HomeButton} alt="Home" />
                    </div>
                    <div className="userName">{userName}님</div>
                  </div>
                  <div className="logout">로그아웃</div>
                </div>
              </div>
              <div className="party-stock">
                <div className="current-party">현재 모임투자</div>
                <div className="current-party-info">
                  <div className="party-name">{partyName}의 모임투자</div>
                  <div className="party-account-number">
                    [계좌] {partyAccountNumber}
                  </div>

                  <div className="slide-menu-buttons">
                    <div className="menu-btn">
                      <Link className="link" to={`/transfer/${partyKey}`}>
                        <Image src={TransferButton} />
                        <span> 이체하기</span>
                      </Link>
                    </div>
                    <div className="menu-btn">
                      <Link className="link" to={`/livestock/${partyKey}`}>
                        <Image src={StockButton} />
                        <span> 투자하기</span>
                      </Link>
                    </div>
                    <div className="menu-btn interest-btn">
                      <Link className="link" to={`/interests/${partyKey}`}>
                        <Image src={InterestButton} />
                        <span> 관심목록</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="move-another-account"
                  onClick={handletoggleButtonClick}
                >
                  다른 모임투자로 이동하기
                  {toggleOpen ? (
                    <>
                      {/* TODO: 리덕스에 userGroup 들어오면 userGroup map으로 수정!!!! */}
                      <Image
                        src={DownArrowButton}
                        className="right-arrow-btn"
                      />
                      <div className="another-party">
                        <div className="another-party-info">
                          <div className="party-name">178의 모임투자</div>
                          <div className="party-account-number">
                            012-456-789
                          </div>
                        </div>
                        <div className="another-party-info">
                          <div className="party-name">179의 모임투자</div>
                          <div className="party-account-number">
                            012-422-789
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Image src={RightArrowButton} className="right-arrow-btn" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Navbar>
    );
  } else if (type === 2) {
    //설정 버튼 있는 버전
    return (
      <Navbar className="navbar">
        <Container className="navbar-container">
          <Navbar.Brand
            onClick={handleBackButtonClick}
            className="navbar-brand"
          >
            <Image src={BackButton} alt="Back" />
          </Navbar.Brand>
          <Nav.Item className="nav-item-text">{text}</Nav.Item>
          <Navbar.Brand
            onClick={() => {
              handleSettingButtonClick(partyKey);
            }}
            className="navbar-brand icon-right"
          >
            <Image src={SettingButton} alt="Setting" />
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  } else if (type === 3) {
    return (
      <Navbar className="navbar">
        <Container className="navbar-container">
          <Navbar.Brand
            onClick={handleFlowButtonClick}
            className="navbar-brand"
            style={{ marginLeft: "2vw", marginTop: "3vw" }}
          >
            <Image src={FlowButton} alt="Home" style={{ width: "25vw" }} />
          </Navbar.Brand>
          <Nav.Item className="nav-item-text">{text}</Nav.Item>
          <Navbar.Brand
            className="navbar-brand icon-right"
            style={{ marginRight: "3vw", marginTop: "1vw" }}
          >
            <Image src={AlarmButton} alt="alarm" />
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
};

export default TopNavigationBar;
