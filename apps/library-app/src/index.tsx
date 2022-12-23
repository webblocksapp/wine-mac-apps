import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import { DialogProvider, Owner, ThemeProvider } from '@shared';
import { App } from './App';
import './index.css';

render(
  () => (
    <Router>
      <ThemeProvider>
        <DialogProvider>
          <Owner>
            <App />
          </Owner>
        </DialogProvider>
      </ThemeProvider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
