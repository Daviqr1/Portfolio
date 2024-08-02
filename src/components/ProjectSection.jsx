import { FunctionComponent } from 'react';
import styles from './ProjectsSection.module.css';


const ProjectsSection = () => {
  	return (
    		<div className={styles.projectsSection}>
      			<div className={styles.headline}>
        				<div className={styles.projects}>Experiences</div>
        				<div className={styles.takeALook}>Core Projects</div>
      			</div>
      			<div className={styles.project}>
        				<div className={styles.projectCard}>
          					<div className={styles.info}>
            						<img className={styles.projectImageIcon} alt="" src="/images/Project image2.png" />
            						<div className={styles.section}>
              							<div className={styles.julDec}>Jul - 2022</div>
              							<div className={styles.techs}>
                								<img className={styles.phpIcon} alt="" src="/images/Php.svg" />
												<img className={styles.laravelIcon} alt="" src="/images/Laravel.svg" />
												<img className={styles.javascriptIcon} alt="" src="/images/JavaScript.svg" />
              							</div>
            						</div>
            						<div className={styles.nomeDoProjetoParent}>
              							<div className={styles.nomeDoProjeto}>GuiaNorteCapixaba.com.br</div>
              							<div className={styles.loremIpsumDolor}>Website in collaboration with the Research Support Foundation (FAPES) as Web Developer Role with the aim of connecting and mapping companies in the north of Espírito Santo to develop a digital presence.</div>
            						</div>
          					</div>
        				</div>
        				<div className={styles.projectCard1}>
          					<div className={styles.info}>
            						<img className={styles.projectImageIcon} alt="" src="/images/Project image1.png" />
            						<div className={styles.section}>
              							<div className={styles.julDec}>Ago - Dec 2022</div>
              							<div className={styles.techs1}>
                								<img className={styles.tailwindIcon} alt="" src="/images/Tailwind.svg" />
                								<img className={styles.laravelIcon} alt="" src="/images/Laravel.svg" />
												<img className={styles.vuejsIcon} alt="" src="/images/Vitejs.svg" />
												<img className={styles.javascriptIcon} alt="" src="/images/JavaScript.svg" />
												<img className={styles.composerIcon} alt="" src="/images/Composer.svg" />
												<img className={styles.mysqlIcon} alt="" src="/images/Mysql.svg" />
              							</div>
            						</div>
            						<div className={styles.nomeDoProjetoParent}>
              							<div className={styles.nomeDoProjeto}>Viper Project</div>
              							<div className={styles.loremIpsumDolor}>Viper is an open source Fullstack Project collaboration to create a customizable script-based platform for Slots Online.</div>
            						</div>
          					</div>
        				</div>
        				<div className={styles.projectCard1}>
          					<div className={styles.info}>
            						<img className={styles.projectImageIcon} alt="" src="/images/Project image3.png" />
            						<div className={styles.section}>
              							<div className={styles.julDec}>Jan - Dec 2023</div>
              							<div className={styles.techs1}>
                								<img className={styles.fastapiIcon} alt="" src="/images/Fastapi.svg" />
                								<img className={styles.pythonIcon} alt="" src="/images/Python.svg" />
												<img className={styles.digitaloceanIcon} alt="" src="/images/Digitalocean.svg" />
												
              							</div>
            						</div>
            						<div className={styles.nomeDoProjetoParent}>
              							<div className={styles.nomeDoProjeto}>Telegram_Slots_Bot</div>
              							<div className={styles.loremIpsumDolor2}>{`Automation and bot hosting service for slot groups on telegram. `}</div>
            						</div>
          					</div>
        				</div>
      			</div>
      			<a href="https://github.com/Daviqr1" target="_blank" rel="noopener noreferrer" className={styles.button}>
                <div className={styles.label}>See all</div>
                <img className={styles.tailwindIcon} alt="" src="/images/ArrowRight.svg" />
            </a>
    		</div>);
};

export default ProjectsSection;
