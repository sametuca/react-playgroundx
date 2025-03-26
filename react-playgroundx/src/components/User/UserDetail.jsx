import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UserDetail = () => {

    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setUser(data);
        }
        fetchUser();
    }, [id]);
     
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Detail</h1>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.website}</p>
        </div>
    )
}

export default UserDetail;