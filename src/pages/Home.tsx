import { Link } from "react-router-dom";
// import { Analytics } from "aws-amplify";

// Analytics.record({ name: 'homePageVisit' });

export const Home = () => (
  <div>
    <h1>Amplify Toybox</h1>
    <p>Amplifyの機能を試すためのサンプルアプリです。</p>
    <p>以下の機能を試すことができます。</p>
    <ul>
      <li><Link to="service-worker">Service Worker</Link></li>
      <li><Link to="cache">Cache</Link></li>
      <li><Link to="analytics">Analytics</Link></li>
      <li><Link to="auth">Auth</Link></li>
    </ul>
  </div>
)
