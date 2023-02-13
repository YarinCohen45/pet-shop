import React, { useState } from 'react';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import { TransitionGroup, Transition } from 'react-transition-group';
import './MainPage.css'
import AllItemsPage from './AllItemsPage';

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  transform: 'translateY(100%)',
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1000,
};

const transitionStyles = {
    entering: { transform: 'translateY(100%)', width: '100vw', height: '100vh'},
    entered: { transform: 'translateY(0%)', width: '100vw', height: '100vh' },
};

const MainPage = () => {
    const [showPage, setShowPage] = useState(false);

    return (
        <TransitionGroup>
            {showPage ? (
                <Transition in={showPage} timeout={duration}>
                    {state => (
                        <div 
                            style={{...defaultStyle, ...transitionStyles[state], backgroundColor: 'white', width: '100vw', height: '100vh'}}
                        >
                            <Button style={{display: 'flex', position: 'absolute', top: 2, right: 20}} className="close-button" variant='dark' onClick={() => setShowPage(!showPage)}>&times;</Button>
                            <AllItemsPage/>
                        </div>
                    )}
                </Transition>
            ) : null}
            <Container fluid className="vh-100 d-flex flex-column justify-content-flex-start text-center">
                <Row>
                    <Col>
                        <Image style={{height: '65vh'}} src="https://img.freepik.com/free-vector/pet-shop-related_24908-57968.jpg?w=826&t=st=1674750499~exp=1674751099~hmac=7c48ab330198d02b4a0c5a137077227cc2621af6efa25ca34d8f8b380506803c" fluid />
                    </Col>
                </Row>
                <Row className="justify-content-center my-4">
                    <Col>
                        <h1 className="mb-4">Welcome to Pet-Shop</h1>
                        <p className="text-secondary">Find your furry friends' toys here!</p>
                        <Button variant='dark' onClick={() => setShowPage(!showPage)}>View Catalog</Button>
                    </Col>
                </Row>
            </Container>
        </TransitionGroup>
    );
};

export default MainPage;
