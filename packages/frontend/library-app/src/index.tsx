import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import { DialogProvider, Owner } from '@shared';
import { App } from './App';
import './index.css';

render(
  () => (
    <Router>
      <DialogProvider>
        <Owner>
          <App />
        </Owner>
      </DialogProvider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
