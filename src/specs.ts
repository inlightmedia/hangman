import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';

import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import './app/mask.pipe.spec';

// Automatically Find all Tests
function requireAll(requireContext) {
   return requireContext.keys().map(requireContext);
}

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

requireAll(require.context('./app/**/', true, /\.spec\.ts$/));