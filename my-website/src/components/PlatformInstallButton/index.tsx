import React from 'react';
import Link from '@docusaurus/Link';

export default function PlatformInstallButton() {
  return (
    <Link
      to="/install/overview"
      style={{
        display: 'inline-block',
        width: '200px',
        height: '50px',
        lineHeight: '50px', // Center text vertically
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '15px',
        textAlign: 'center',
        border: '2px solid black',
        textDecoration: 'none',
      }}>
      Create a page
    </Link>
  );
}
