import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import { DialogProvider } from '@components';
import { App } from './App';
import './index.css';

render(
  () => (
    <Router>
      <DialogProvider>
        <App />
      </DialogProvider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
