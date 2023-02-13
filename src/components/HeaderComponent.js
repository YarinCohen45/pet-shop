import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header({setShowCatalog}) {
  return (
    <Navbar style={{width: '100%', height: 75}} bg="dark" variant='dark' expand="lg">
    <Container>
        <Navbar.Brand href="/">Pet-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav onSelect={key => {key !== undefined && setShowCatalog(key === 'true')}} className="me-auto">
            {setShowCatalog ? <Nav.Link eventKey={'false'}>Home</Nav.Link> : <Nav.Link href='/'>Home</Nav.Link>}
            {setShowCatalog ? <Nav.Link eventKey={'true'}>View Catalog</Nav.Link> : <Nav.Link href='/catalog'>View Catalog</Nav.Link>}
            <Nav.Link href="/add-item">Add Item</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}