'use client';

import './styles.scss';
import 'highlight.js/styles/atom-one-dark.css';

import { useEffect } from 'react';
import hljs from 'highlight.js';

export default function ClientCodeBlockConfig() {
  useEffect(() => {
    hljs.highlightAll();

    const buttons = document.querySelectorAll<HTMLButtonElement>('.copy-button');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const codeEl = btn.parentElement?.querySelector('code');
        if (codeEl) {
          navigator.clipboard.writeText(codeEl.innerText).then(() => {
            console.log('Copied!');
          });
        }
      });
    });

    return () => {
      buttons.forEach((btn) => {
        btn.replaceWith(btn.cloneNode(true));
      });
    };
  }, []);

  return null;
}
