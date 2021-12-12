export default function Commit(props) {
  if (props.error) {
    return <h3>{props.error}</h3>;
  } else if (props.lastCommit) {
    return (
      <div className="border-top">
        <div className="d-flex">
          <p>Last commit date:</p>
          <h3>{props.lastCommit.commit.committer.date.slice(0, 10)}</h3>
        </div>
        <div className="d-flex">
          <p>
            Last commit message:
            <pre className="commit">{props.lastCommit.commit.message}</pre>
          </p>
        </div>
        <div className="d-flex">
          <p>Last commit author:</p>
          <h3>{props.lastCommit.commit.author.name}</h3>
        </div>
      </div>
    );
  } else {
    return <h3>No commit data</h3>;
  }
}
