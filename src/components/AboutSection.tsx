import Section from './Section';
import { aboutText } from '../static/data/about';

const AboutSection = () => {
  return <Section headerTitle="My Life Story" content={aboutText} />;
};

export default AboutSection;
