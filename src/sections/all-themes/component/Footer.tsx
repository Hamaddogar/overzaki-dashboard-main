import React, { useState } from 'react';
import Iconify from 'src/components/iconify';

const Footer = ({
  menuItems,
  menuItemColor,
  containerBackgroundColor,
  footerStyling,
}: {
  menuItems: any;
  menuItemColor: string;
  containerBackgroundColor: string;
  footerStyling: any;
}) => {
  const socialIcons = [
    footerStyling.socials.facebook && 'ic:baseline-facebook',
    footerStyling.socials.instagram && 'lets-icons:insta',
    footerStyling.socials.twitter && 'mdi:twitter',
    footerStyling.socials.google && 'ri:google-fill',
  ];
  return (
    <footer style={{ ...footerStyling.container, width: '100%', padding: '18px' }}>
      <div style={{ padding: '8px' }} className="footerContainer">
        <div
          style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}
          className="socialIcons"
        >
          {socialIcons.map((item) => (
            <Iconify
              key={item}
              style={{
                ...footerStyling.socialIcons,

                padding: '4px',
                borderRadius: '50%',
              }}
              width={30}
              icon={item}
            />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '10px',
            ...footerStyling.menuItems,
          }}
          className="footerNav"
        >
          {menuItems.map((item: string) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
