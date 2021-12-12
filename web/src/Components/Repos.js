import { useEffect, useState } from 'react';
import Repo from './Repo';
import Button from './Button';

export default function Repos() {
  const [repos, setPepos] = useState([]);
  const [filteredRepos, setfilteredRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    requestData();
  }, []);

  // const handleError = function (err) {
  //   console.warn(err);
  //   setError('Error fetching data from server. Please try again');
  //   return new Response(
  //     JSON.stringify({
  //       code: 400,
  //       message: 'Error fetching data from server. Please try again',
  //     })
  //   );
  // };

  async function requestData() {
    await fetch('http://localhost:4000/repos')
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          // sort by creation date
          const reposList = data.sort((a, b) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });

          // get languages from repos list
          const languagesList = data
            .map((repo) => repo.language)
            .filter((value, index, self) => self.indexOf(value) === index);

          languagesList.push('All');
          setPepos(reposList);

          setfilteredRepos(reposList);
          setLanguages(languagesList);
        }
      })
      .catch((err) => {
        setError('Error fetching data from server. Please try again');
        return new Response(
          JSON.stringify({
            status: 400,
            message: 'Error fetching data from server. Please try again',
          })
        );
      });
  }

  const selectLanguage = (e) => {
    if (e.target.value === 'All') {
      setfilteredRepos(repos);
      return;
    }
    const filtered = repos.filter((repo) => repo.language === e.target.value);
    setfilteredRepos(filtered);
  };

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!repos.length) {
    return <h3>Loading repositories data{error} </h3>;
  } else {
    return (
      <div>
        <ul className="languages-filters">
          {languages.map((language) => (
            <Button key={language} value={language} handler={selectLanguage} />
          ))}
        </ul>
        <table className="repos-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Forks Count</th>
              <th>Creation Date</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>
            {filteredRepos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
