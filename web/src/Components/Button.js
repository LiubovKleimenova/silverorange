export default function Button(props) {
  return (
    <button type="button" value={props.value} onClick={(e) => props.handler(e)}>
      {props.value}
    </button>
  );
}
