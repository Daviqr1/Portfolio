import React from 'react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
    return (
        <div className={styles.container}>
            <img className={styles.designerGirlbroIcon} alt="" src="/images/Programming-bro.svg" />
            <div className={styles.container1}>
                <div className={styles.techStack}>
                    <img className={styles.icon} alt="" src="/images/Laravel.svg" />
                    <img className={styles.icon} alt="" src="/images/React.svg" />
                    <img className={styles.icon} alt="" src="/images/Mysql.svg" />
                    <img className={styles.icon} alt="" src="/images/Tailwind.svg" />
                    <img className={styles.icon} alt="" src="/images/Python.svg" />
                    <img className={styles.icon} alt="" src="/images/Php.svg" />
                    <img className={styles.icon} alt="" src="/images/Vitejs.svg" />
                </div>
                <div className={styles.container2}>
                    <div className={styles.headline}>
                        <div className={styles.aboutMe}>About me</div>
                        <div className={styles.imAPassionate}>
                            I’m a Brazilian software developer looking for my first international opportunity
                        </div>
                    </div>
                    <div className={styles.beyondCodingIm}>
                        Beyond coding, I'm a coffee enthusiast, a cat lover, and a self-taught artist who enjoys spending my free time doodling.
                        I am currently seeking opportunities to bring my skills and enthusiasm to a tech company in the United States or Europe and am excited about the prospect of relocating to pursue new challenges.
                    </div>
                </div>
                <a href="/images/CV Dai Rezende Software Engineer En_us.pdf" download className={styles.button}>
                    <img className={styles.readcvlogoIcon} alt="Read CV" src="../public/images/ReadCvLogo.svg" />
                    <div className={styles.label}>My resume</div>
                </a>
            </div>
        </div>
    );
};

export default AboutSection;
