import React from 'react';
import styles from './ContactSection.module.css';

const ContactSection = () => {
  return (
    <div className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.div}>
          <img className={styles.cuteAvatarIcon} alt="" src="/images/Webinar-rafiki.svg" />
          <div className={styles.text}>
            <div className={styles.headline}>
              <div className={styles.contact}>Contact</div>
              <div className={styles.enjoyedMyWork}>Enjoyed my work? Let’s work together</div>
            </div>
            <div className={styles.imAlwaysUpContainer}>
              <span>{`I’m always up for a chat. Pop me an email at `}</span>
              <span className={styles.hilinalevicom}>davidbecam006@gmail.com</span>
              <span>{` or give me a shout on social media. `}</span>
            </div>
            <div className={styles.socialIcons}>
              <a href="https://github.com/Daviqr1" target="_blank" rel="noopener noreferrer" className={styles.iconbutton}>
                <img className={styles.logoIcon} alt="GitHub" src="/images/logo-github 1.svg" />
              </a>
              <a href="https://www.linkedin.com/in/davi-rezende-09540b222/" target="_blank" rel="noopener noreferrer" className={styles.iconbutton}>
                <img className={styles.logoIcon} alt="LinkedIn" src="/images/logo-linkedin 1.svg" />
              </a>
              <a href="https://www.instagram.com/davi_b.rezende" target="_blank" rel="noopener noreferrer" className={styles.iconbutton}>
                <img className={styles.logoIcon} alt="Instagram" src="/images/logo-instagram 1.svg" />
              </a>
            </div>
          </div>
        </div>
        <form className={styles.form} action={`mailto:davidbecam006@gmail.com`} method="POST" encType="text/plain">
          <div className={styles.text}>
            <div className={styles.nameWrapper}>
              <div className={styles.name}>Name</div>
              <input type="text" name="name" required />
            </div>
            <div className={styles.eMailWrapper}>
              <div className={styles.name}>E-mail</div>
              <input type="email" name="email" required />
            </div>
            <div className={styles.yourMessageWrapper}>
              <div className={styles.yourMessage}>Your message</div>
              <textarea name="message" required></textarea>
            </div>
          </div>
          <button type="submit" className={styles.button}>
            <div className={styles.label}>Send me a message</div>
            <img className={styles.logoGithub1Icon} alt="" src="/images/ArrowRight.svg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
