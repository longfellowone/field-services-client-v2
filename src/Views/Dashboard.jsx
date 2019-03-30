import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ auth }) => {
  const { isAuthenticated } = auth;
  return (
    <div className="container">
      {isAuthenticated() && (
        <div>
          <div>Dashboard</div>
          Project:
          <Link to="/cf510766-faf7-415e-a067-0c5ae5cb2ae8">
            cf510766-faf7-415e-a067-0c5ae5cb2ae8
          </Link>
          <div style={{ cursor: 'pointer', color: 'blue' }} onClick={auth.logout}>
            Logout
          </div>
        </div>
      )}
      {!isAuthenticated() && (
        <h4>
          You are not logged in! Please{' '}
          <div style={{ cursor: 'pointer', color: 'blue' }} onClick={auth.login}>
            Log In
          </div>{' '}
          to continue.
        </h4>
      )}
    </div>
  );
};

export default Dashboard;
