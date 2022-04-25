import { createRoot } from 'react-dom/client';
import { start } from './shared/main';

start((children, rootElement) => {
  const root = createRoot(rootElement);

  root.render(children);
});
