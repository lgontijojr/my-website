import Section from './Section';
import { resumeText } from '../static/data/resume';

const ResumeSection = () => {
  return <Section headerTitle="Resume" content={resumeText} />;
};

export default ResumeSection;
