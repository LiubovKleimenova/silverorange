import { useEffect, useState } from 'react';
import Repo from './Repo';
import Button from './Button';

export default function Repos() {
  const [repos, setPepos] = useState([]);
  const [error, setError] = useState('');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    requestData();
  }, []);

  async function requestData() {
    const res = await fetch('http://localhost:4000/repos');

    if (!res || res.status !== 200) {
      setError('Error fetching data from server. Please try again');
    } else {
      const data = await res.json();
      const reposList = data.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      console.log(reposList);

      const languagesList = data
        .map((repo) => repo.language)
        .filter((value, index, self) => self.indexOf(value) === index);

      setPepos(reposList);
      setLanguages(languagesList);
    }
  }

  const selectLanguage = (e) => {
    console.log(e.target.value);
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
            {repos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
