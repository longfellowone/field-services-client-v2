import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div>
      <div>Dashboard</div>
      Project:
      <Link to="/cf510766-faf7-415e-a067-0c5ae5cb2ae8">cf510766-faf7-415e-a067-0c5ae5cb2ae8</Link>
      {/* Test:
      <Link to="/test">Test</Link> */}
    </div>
  );
};
