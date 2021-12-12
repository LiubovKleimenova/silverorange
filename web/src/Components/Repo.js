import { Link } from 'react-router-dom';

export default function Repo(props) {
  const {
    id,
    name,
    description,
    forks_count,
    created_at,
    language,
  } = props.repo;

  return (
    <tr>
      <td>
        <Link
          to={{
            pathname: `/repo/${id}`,
          }}
          state={props.repo}
        >
          {name}
        </Link>
      </td>
      <td>{description}</td>
      <td>{forks_count}</td>
      <td>{created_at.slice(0, 10)}</td>
      <td>{language}</td>
    </tr>
  );
}
