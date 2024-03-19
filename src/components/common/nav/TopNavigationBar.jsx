import { Container, Image, Nav, Navbar } from "react-bootstrap";
import BackButton from "../../../assets/back.png";
import "./TopNavigationBar.css";

const TopNavigationBar = ({ text }) => {
  return (
    <Navbar className="navbar">
      <Container className="navbar-container">
        <Navbar.Brand href="/" className="navbar-brand">
          <Image src={BackButton} alt="Back" />
        </Navbar.Brand>

        <Nav.Item className="nav-item-text">{text}</Nav.Item>

      </Container>
    </Navbar>
  );
};

export default TopNavigationBar;