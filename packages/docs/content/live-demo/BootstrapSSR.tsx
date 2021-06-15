export default function BootstrapSSR() {
  return (
    <ul
      style={{ visibility: 'hidden' }}
      className="pagination justify-content-center"
    >
      <li className="page-item disabled">
        <span className="page-link">8</span>
      </li>
    </ul>
  );
}
