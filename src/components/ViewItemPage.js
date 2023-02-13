import { useParams } from 'react-router-dom';
import { db } from '../index';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { Button, Container, Form, Modal, Spinner, Image, Row, Col, Stack, Card } from 'react-bootstrap';
import DeleteWarning from './DeleteWarning';
import { useState, useEffect } from 'react';

export default function ViewItemPage() {
    const [show, setShow] = useState(false);
    const [item, setItem] = useState({});
    const { id } = useParams();
    const [tempItem, setTempItem] = useState({});
    const [loading, setLoading] = useState(false);
    const [deleteName, setDeleteName] = useState('');
    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        const itemRef = doc(db, 'items', id);
        const itemDoc = getDoc(itemRef);
        itemDoc.then((doc) => {
            setItem(doc.data());
            setTempItem(doc.data());
            const categoryRef = collection(db, 'items');
            const categoryDocs = getDocs(categoryRef);
            categoryDocs.then((docs) => {
                const items = [];
                docs.forEach((doc) => {
                    if (doc.data().Category === item.Category && doc.id !== id) {
                        items.push({...doc.data(), id: doc.id});
                    }
                });
                setCategoryItems(items);
            });
        });
    }, [id, item.Category]);

    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100%', height: '100vh'}}>
        <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', height: '70vh'}}>
            <Col style={{backgroundColor: '#f3f3f3', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
                <Image variant='top' style={{width: 'auto', height: 'auto', maxWidth: '50vw', maxHeight: '50vh'}} src={item.Image} />
            </Col>
            <Col style={{backgroundColor: '#f3f3f3', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'flex-end', justifyContent: 'space-evenly'}}>
                <Container style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: '16vw'}}>
                    <p style={{fontSize: 70, lineClamp: 1, overflow: 'hidden', fontWeight: 'normal', direction: 'rtl'}}>{item.Name}</p>
                    <p style={{fontSize: 30, fontWeight: 'lighter', width: '100%', direction: 'rtl'}}>מחיר: {item.Price}$<br/>נמצא במלאי: {item.InStock ? '✅' : '❌'}<br/>קטגוריה: {item.Category}</p>
                </Container>
                <Container style={{display: 'flex', flexDirection: 'column', gap: 25, alignItems: 'flex-end', paddingRight: '16vw'}}>
                    <Button onClick={() => setShow(true)} style={{width: '17vw', height: '4.3vh', color: 'white'}} variant='warning'>Edit item</Button>
                    <Button onClick={() => setDeleteName(item.Name)} style={{width: '17vw', height: '4.3vh', color: 'white'}} variant='danger'>Delete item</Button>
                </Container>
                <Modal show={show}>
                    <Modal.Header closeButton onHide={() => setShow(false)}>
                        <Modal.Title>Edit Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                            <Form.Group controlId='formName'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={e => tempItem.Name = e.target.value} type='text' placeholder='Enter name' defaultValue={item.Name}/>
                            </Form.Group>
                            <Form.Group controlId='formName'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control onChange={e => tempItem.Price = e.target.value} type='number' placeholder='Enter price' defaultValue={item.Price}/>
                            </Form.Group>
                            <Form.Group controlId='formName'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control onChange={e => tempItem.Image = e.target.value} type='text' placeholder='Enter image' defaultValue={item.Image}/>
                            </Form.Group>
                            <Form.Group style={{display: 'flex', flexDirection: 'row', gap: 15}} controlId='formName'>
                                <Form.Label>In Stock</Form.Label>
                                <Form.Check onChange={e => tempItem.InStock = !tempItem.InStock} type='switch' placeholder='In Stock' defaultChecked={item.InStock}/>
                            </Form.Group>
                            <Form.Group controlId='formName'>
                                <Form.Label>Category</Form.Label>
                                <Form.Select onChange={e => tempItem.Category = e.target.value} id='Category' defaultValue={item.Category}>
                                    <option value={'food'}>Food</option>
                                    <option value={'toys'}>Toys</option>
                                    <option value={'accessories'}>Accessories</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => setShow(false)}>Close</Button>
                        <Button onClick={() => updateItem(id, tempItem, setLoading)} variant='primary'>Save changes</Button>
                        {loading && <Spinner style={{position: 'absolute', left: 16}} animation='border' variant='primary' />}
                    </Modal.Footer>
                </Modal>
                <DeleteWarning name={deleteName} setName={setDeleteName} id={id} onDelete={() => window.location.href = '/'}/>
            </Col>
        </Row>
        <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '70vw', height: '70vh', marginTop: 20}}>
            <Col>
                <h3 style={{direction: 'rtl', alignSelf: 'flex-end'}}>אולי תאהב גם:</h3>
                <Stack direction='horizontal' gap={5} style={{width: '100%', display: 'flex', alignItems: 'flex-start', height: '100%'}}>
                    {categoryItems.map((item, index) => (
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" height={200} src={item.Image} />
                            <Card.Body style={{direction: 'rtl'}}>
                                <Card.Title style={{direction: 'rtl', fontSize: 18}}>{item.Name}</Card.Title>
                                <Card.Text style={{direction: 'rtl', fontSize: 15}}>{item.Price}$</Card.Text>
                                <Button variant="primary" onClick={() => window.location.href = `/view-item/${item.id}`}>
                                    עבור לדף
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Stack>
            </Col>
        </Row>
    </div>
}

function updateItem(id, item, setLoading) {
    setLoading(true);
    const itemRef = doc(db, 'items', id);
    updateDoc(itemRef, item).then(() => {
        window.location.reload(false);
    });
}