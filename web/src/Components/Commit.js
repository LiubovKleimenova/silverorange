export default function Commit(props) {
  if (props.error) {
    return <h3>{props.error}</h3>;
  } else if (props.lastCommit) {
    return (
      <div>
        <h2>Last commit date: {props.lastCommit.commit.committer.date}</h2>
        <h2>Last commit message: {props.lastCommit.commit.message}</h2>
        <h2>Last commit author: {props.lastCommit.commit.author.name}</h2>
      </div>
    );
  } else {
    return <h3>No commit data</h3>;
  }
}
