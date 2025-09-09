import Footer from '../components/Footer';
import Profile from '../components/Profile';
import AboutSection from '../components/AboutSection';
import ResumeSection from '../components/ResumeSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <div className="App">
      <div className="main">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            height: '100vh',
            alignItems: 'center',
          }}
        >
          <Profile />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
          }}
        >
          <AboutSection />
          <ResumeSection />
          <ContactSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
