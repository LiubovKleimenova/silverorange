import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Commit from './Commit';
import Readme from './Readme';

export default function RepoDetails() {
  const location = useLocation();
  const repo = location.state;
  const [readme, setReadme] = useState('');
  const [lastCommit, setLastCommit] = useState('');
  const [errorReadme, setErrorReadme] = useState('');
  const [errorCommit, setErrorCommit] = useState('');
  let commitsUrl;

  if (repo.commits_url) {
    commitsUrl = `https://api.github.com/repos/silverorange/${repo.full_name}/git/commits`;
  }

  useEffect(() => {
    function requestReadme() {
      fetch(
        `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`
      )
        .then((res) => {
          return res.ok ? res.text() : '';
        })
        .then((data) => setReadme(data))
        .catch((err) => {
          setErrorReadme('Error fetching Readme data from server');
          return new Response(
            JSON.stringify({
              status: 400,
              message: 'Error fetching Readme data from server',
            })
          );
        });
    }
    requestReadme();
  }, [repo.full_name]);

  useEffect(() => {
    function requestReadme() {
      if (commitsUrl) {
        fetch(commitsUrl)
          .then((res) => res.json())
          .then((res) => {
            const data = res.reduce((a, b) => {
              return new Date(a.commit.committer.date) >
                new Date(b.commit.committer.date)
                ? a
                : b;
            });
            setLastCommit(data);
          })
          .catch((err) => {
            setErrorCommit('Error fetching Commit data from server');
            return new Response(
              JSON.stringify({
                status: 400,
                message: 'Error fetching Commit data from server',
              })
            );
          });
      }
    }
    requestReadme();
  }, [commitsUrl]);

  // if ()

  return (
    <div>
      <h5>
        <Link to="/">Go To All Repos</Link>
      </h5>
      <h1>{repo.full_name}</h1>
      <Commit lastCommit={lastCommit} error={errorCommit} />
      <Readme readme={readme} error={errorReadme} />
    </div>
  );
}
