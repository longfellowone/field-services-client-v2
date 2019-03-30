import React from 'react';
// import { Link } from 'react-router-dom';

const Dashboard = ({ auth }) => {
  const { isAuthenticated } = auth;
  return (
    <div className="container">
      {isAuthenticated() && (
        <h4>
          <div style={{ cursor: 'pointer', color: 'blue' }} onClick={auth.logout}>
            Logout
          </div>
        </h4>
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
  // return (
  //   <div>
  //     <div>Dashboard</div>
  //     Project:
  //     <Link to="/cf510766-faf7-415e-a067-0c5ae5cb2ae8">cf510766-faf7-415e-a067-0c5ae5cb2ae8</Link>
  //     {/* Test:
  //     <Link to="/test">Test</Link> */}
  //   </div>
  // );
};

export default Dashboard;
