import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost:5173/',
  pretendToBeVisual: true,
});

Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  Node: dom.window.Node,
});

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

const components = [
  '/src/components/Navbar.jsx',
  '/src/components/Hero.jsx',
  '/src/components/Portfolio.jsx',
  '/src/components/About.jsx',
  '/src/components/CtaBanner.jsx',
  '/src/components/Pricing.jsx',
  '/src/components/Reliability.jsx',
  '/src/components/Counter.jsx',
  '/src/components/Testimonials.jsx',
  '/src/components/Contact.jsx',
  '/src/components/Footer.jsx',
  '/src/components/CustomCursor.jsx',
];

for (const path of components) {
  try {
    const mod = await server.ssrLoadModule(path);
    const Comp = mod.default;
    renderToString(React.createElement(Comp, { onOpenModal: () => {} }));
    console.log('OK:', path);
  } catch (err) {
    console.error('FAIL:', path);
    console.error(err.message);
  }
}

await server.close();
