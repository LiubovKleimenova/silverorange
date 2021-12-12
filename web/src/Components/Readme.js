import ReactMarkdown from 'react-markdown';

export default function Readme(props) {
  if (props.error) {
    return <h3>{props.error}</h3>;
  } else if (props.readme) {
    return (
      <div>
        <h3>Readme.md:</h3>
        <ReactMarkdown children={props.readme} />
      </div>
    );
  } else {
    return <h3>No Readme data</h3>;
  }
}
