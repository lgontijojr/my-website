import React from 'react';
import Image from 'next/image';

import github from '../static/social_media_icons/github.png';
import linkedin from '../static/social_media_icons/linkedin.png';
import mail from '../static/social_media_icons/mail.png';

function Footer() {
  return (
    <footer className="footer">
      <div>
        <a href="https://github.com/lgontijojr">
          <Image src={github} alt="Github Icon" className="social_media_icon" />
        </a>
        <a href="https://www.linkedin.com/in/lgontijojr/">
          <Image src={linkedin} alt="LinkedIn Icon" className="social_media_icon" />
        </a>
        <a href="mailto:lgontijojr@gmail.com">
          <Image src={mail} alt="Mail Icon" className="social_media_icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
