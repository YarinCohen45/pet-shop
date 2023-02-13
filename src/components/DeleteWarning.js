import { Modal, Button, Spinner } from 'react-bootstrap';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../index';
import { useState } from 'react';

export default function DeleteWarning({name, setName, id, onDelete}) {
    const [loading, setLoading] = useState(false);
    return <Modal show={name !== ''} onHide={() => {if (setName !== undefined) setName('')}}>
        <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {name}?</Modal.Body>
        <Modal.Footer>
            {loading && <Spinner style={{position: 'absolute', left: 16}} animation="border" role="status"/>}
            <Button variant="secondary" onClick={() => setName('')}>
            Close
            </Button>
            <Button variant="danger" onClick={() => deleteItem(id, setLoading, onDelete)}>
            Delete
            </Button>
        </Modal.Footer>
    </Modal>
}

function deleteItem(id, setLoading, onDelete) {
    const itemRef = doc(db, "items", id);
    setLoading(true);
    deleteDoc(itemRef).then(() => {
        window.location.reload(false);
        onDelete();
    });
}