import React, { useState, useEffect } from 'react';
import { db } from '../index';
import { collection, getDocs } from 'firebase/firestore'
import { Container, Image, Table, Nav, Button, Row } from 'react-bootstrap';
import DeleteWarning from './DeleteWarning';

export default function AllItemsPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const itemsRef = collection(db, "items");
    getDocs(itemsRef).then(snapshot => {
        let temp = [];
        snapshot.forEach(doc => {
          const data = {...doc.data(), id: doc.id};
          temp = [...temp, data];
        })
        setItems(temp);
    });
  }, []);

  const FilterItems = (catergory) => {
    let color = false;
    return <Table striped hover bordered>
        <thead>
          <tr>
              <th style={{width: 125, color: 'white', backgroundColor: '#202020', fontSize: 21, textAlign: 'center'}}>Name</th>
              <th style={{width: 125, color: 'white', backgroundColor: '#202020', fontSize: 21, textAlign: 'center'}}>Price</th>
              <th style={{width: 125, color: 'white', backgroundColor: '#202020', fontSize: 21, textAlign: 'center'}}>In Stock</th>
              <th style={{width: 125, color: 'white', backgroundColor: '#202020', fontSize: 21, textAlign: 'center'}}>Image</th>
              <th style={{width: 125, color: 'white', backgroundColor: '#202020', fontSize: 21, textAlign: 'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
          return (item.Category === catergory) &&
              <tr>
                  {color = !color}
                  <td><span style={{display: 'flex', fontSize: 15, justifyContent: 'center', letterSpacing: -.6, textAlign: 'center'}}>{item.Name}</span></td>
                  <td><span style={{display: 'flex', fontSize: 15, justifyContent: 'center', letterSpacing: -.6, textAlign: 'center'}}>{item.Price}$</span></td>
                  <td><span style={{display: 'flex', fontSize: 15, justifyContent: 'center', letterSpacing: -.6, textAlign: 'center'}}>{item.InStock === true ? '✅' : '❌'}</span></td>
                  <td><Image style={{width: '100%', height: 110, objectFit: 'contain'}} alt src={item.Image}/></td>
                  <td>
                    <Container style={{display: 'flex', flexDirection: 'column', height: 110, justifyContent: 'space-evenly'}}>
                      <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant='secondary' style={{width: 125 , color: 'white', fontSize: 15, letterSpacing: -.6, textAlign: 'center'}}><Nav.Link href={`/view-item/${item.id}`}>View</Nav.Link></Button>
                      </Row>
                      <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant='danger' onClick={() => {setName(item.Name); setId(item.id)}} style={{width: 125, color: 'white', fontSize: 15, letterSpacing: -.6, textAlign: 'center'}}>Delete</Button>
                      </Row>
                    </Container>
                  </td>
              </tr>
              }
          )}
        </tbody>
    </Table>
  };

  const [category, setCategory] = useState('food');

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100vw'}}>
      <Nav
        fill
        variant="tabs"
        onSelect={(selectedKey) => setCategory(selectedKey)}
        defaultActiveKey={'food'}
      >
        <Nav.Item>
          <Nav.Link eventKey={'food'}>Food</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={'accessories'}>Accessories</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={'toys'}>Toys</Nav.Link>
        </Nav.Item>
      </Nav>
      {FilterItems(category)}
      <DeleteWarning setName={setName} name={name} id={id}/>
    </div>
  );
};