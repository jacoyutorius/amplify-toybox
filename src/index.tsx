import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Amplify, Analytics, AWSKinesisProvider } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
Analytics.addPluggable(new AWSKinesisProvider());

// Configure the plugin after adding it to the Analytics module
Analytics.configure({
  AWSKinesis: {
    // OPTIONAL -  Amazon Kinesis service region
    region: 'ap-northeast-1',

    // OPTIONAL - The buffer size for events in number of items.
    bufferSize: 1000,

    // OPTIONAL - The number of events to be deleted from the buffer when flushed.
    flushSize: 100,

    // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
    flushInterval: 5000, // 5s

    // OPTIONAL - The limit for failed recording retries.
    resendLimit: 5
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
