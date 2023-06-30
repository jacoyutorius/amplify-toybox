import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Amplify, Analytics } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

// https://docs.amplify.aws/lib/analytics/autotrack/q/platform/js/#page-view-tracking
Analytics.autoTrack('session', {
  enable: true,
  attributes: {
      attr: 'attr'
  }
});

Analytics.autoTrack('pageView', {
  enable: true,
  eventName: 'pageView',
  attributes: {
    attr: 'attr'
  },
  type: 'SPA',
  getUrl: () => {
    return window.location.origin + window.location.pathname;
  }
});

Analytics.autoTrack('event', {
  enable: true,
  events: ['click'],
  selectorPrefix: 'data-amplify-analytics-',
  attributes: {
    attr: 'attr'
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
