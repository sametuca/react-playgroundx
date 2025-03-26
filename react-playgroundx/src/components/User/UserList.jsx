import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserList.css';
import { useTranslation } from 'react-i18next';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(t('error'));
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loading">{t('loading')}...</div>;  
  }

  if (error) {
    return <div className="error">{t('error')}: {error}</div>;
  }

  return (
    <div className="user-list">
      <h2>{t('userList')}</h2>
      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Telefon: {user.phone}</p>
            <p>Şirket: {user.company.name}</p>
            <p>Adres: {user.address.street}, {user.address.city}</p>
            <Link to={`/user/${user.id}`}>{t('details')}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
