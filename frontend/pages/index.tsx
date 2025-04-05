import Head from 'next/head';
import { Dashboard } from '../components/Dashboard';

export default function Home() {
  return (
    <>
      <Head>
        <title>D90 Crypto Trading Bot</title>
        <meta name="description" content="Advanced grid trading bot" />
      </Head>
      <main>
        <Dashboard botId="main_bot" />
      </main>
    </>
  );
}
