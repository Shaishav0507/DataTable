import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { addUser } from './redux/UserReducer';

function Create() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const users = useSelector((state)=> state.users)
    const navigate = useNavigate();
    localStorage.removeItem('editableUsers');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (users.length === 0) {
            // If empty, set the ID to 1
            dispatch(addUser({ id: 1, name, email }));
          } else {
            // If not empty, calculate the ID based on the last user's ID
            const lastUserId = users[users.length - 1].id;
            dispatch(addUser({ id: lastUserId + 1, name, email }));
          }
        navigate('/')
    }

    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <lable htmlFor="name">Name</lable>
                        <input type="text" name="name" className='form-control' onChange={e=> setName(e.target.value)}/>
                    </div>
                    <div>
                        <lable htmlFor="email">Email</lable>
                        <input type="email" name="email" className='form-control' onChange={e=> setEmail(e.target.value)}/>
                    </div><br/>
                    <button className='btn btn-info'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Create;
