import Section from './Section';
import { contactText } from '../static/data/contact';

const ContactSection = () => {
  return <Section headerTitle="Contact" content={contactText} />;
};

export default ContactSection;
