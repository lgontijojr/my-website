import Image from 'next/image';
import { profileText } from '../static/data/profile';
import profilePicture from '../static/images/ProfilePicture.png';

const Profile = () => {
  return (
    <>
      <div className="profile">
        <h1 className="name">👋🏽 Hi, I'm Luiz</h1>
        <hr />
        <div className="description">
          {profileText.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </div>
      </div>
      <div>
        <Image className="profile-image" src={profilePicture} alt="Profile" />
      </div>
    </>
  );
};

export default Profile;
