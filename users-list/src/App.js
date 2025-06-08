import React from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import { useState } from 'react';

const App = () => {
    const [usersList, setUsersList] = useState([]);

    const addUserHandler = (username, age) => {
        setUsersList((prevUsersList) => {
            return [
                ...prevUsersList,
                { id: Math.random().toString(), text: `${username} (${age} years old)` }
            ];
        });
    };

    return (
        <>
            <AddUser onAddUser={addUserHandler} />
            <UsersList users={usersList} />
        </>
    );
}

export default App;
