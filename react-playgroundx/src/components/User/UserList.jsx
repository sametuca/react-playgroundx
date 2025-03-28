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
    const getUsers = () => {
      return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => {
            if (!response.ok) {
              reject(new Error(t('error')));
            }
            return response.json();
          })
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    };

    getUsers()
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
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
