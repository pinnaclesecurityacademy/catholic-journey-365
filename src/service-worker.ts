/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

type PrecacheManifestEntry = string | { url: string };

clientsClaim();

const precacheManifest = ((self as any).__WB_MANIFEST as PrecacheManifestEntry[]).filter(
  (entry) => {
    const url = typeof entry === 'string' ? entry : entry.url;
    return !url.endsWith('.html') && !url.endsWith('/app-shell-version.json');
  }
);

precacheAndRoute(precacheManifest);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
