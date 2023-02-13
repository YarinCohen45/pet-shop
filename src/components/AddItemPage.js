import { useState } from 'react';
import './AddItemPage.css';
import { db } from '../index';
import { collection, addDoc } from "firebase/firestore";
import { Container, Form, Row } from 'react-bootstrap';

function AddItemPage() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    if (name === '' || image === '' || category === '' || price === 0)
      return;
    event.target.reset();
    await addDoc(collection(db, 'items'), {
      Name: name,
      Image: image,
      Category: category,
      Price: price,
      InStock: inStock
    })
  };

  return <div className="Container_add-item" style={{display: 'flex', alignContent: 'center', alignItems: 'center', backgroundColor: 'black', paddingBottom: 50, height: '100%'}}>
    <h1 style={{color: 'white', fontSize: 50, fontWeight: 700, marginBlock: 50}}>Add Item</h1>
    <Form style={{width: '400px', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', paddingInline: 30, marginBottom: 10, borderRadius: 50}} className='Form_add-item' onSubmit={async e => await handleSubmit(e)}>
      <Form.Control type={'text'} style={{width: '100%', borderRadius: 20, borderWidth: 0, marginTop: 8}} onChange={e => setName(e.target.value)} placeholder='Name'/>
      <Form.Control type={'text'} style={{width: '100%', borderRadius: 20, borderWidth: 0, marginTop: 8}} onChange={e => setImage(e.target.value)} placeholder='Image'/>      
      <Form.Control type={'number'} style={{width: '100%', borderRadius: 20, borderWidth: 0, marginTop: 8}} onChange={e => setPrice(Number(e.target.value))} placeholder='Price'/>
      <Form.Select style={{width: '100%', borderRadius: 20, borderWidth: 0, marginTop: 8}} onChange={e => setCategory(e.target.value)}>
        <option value={''}>Category</option>
        <option value={'food'}>Food</option>
        <option value={'toys'}>Toys</option>
        <option value={'accessories'}>Accessories</option>
      </Form.Select>  
      <Form.Check type='switch' style={{color: 'white'}} onChange={e => setInStock(!inStock)} label='In Stock'/>
      <Form.Control style={{height: 40, width: 120, borderWidth: 0, borderRadius: 15}} type={'submit'} value={'Send'}/>
    </Form>
  </div>;
}

export default AddItemPage;
