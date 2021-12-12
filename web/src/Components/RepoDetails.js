import { Link, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';

export default function RepoDetails(props) {
  const location = useLocation();
  const repo = location.state;

  return (
    <div>
      <h5>
        <Link to="/">Go To All Repos</Link>
      </h5>
      <h1>{repo.full_name}</h1>
    </div>
  );
}
