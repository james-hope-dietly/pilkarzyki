import React from 'react';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="pilkarzyki__nav">
      <Link href="/">
        <a className="pilkarzyki__nav-link">Strona główna</a>
      </Link>
      <Link href="/tournament">
        <a className="pilkarzyki__nav-link">Rozpocznij turniej</a>
      </Link>
      <Link href="/best">
        <a className="pilkarzyki__nav-link">Najlepsze wyniki</a>
      </Link>
    </nav>
  );
};

export default Navigation;
