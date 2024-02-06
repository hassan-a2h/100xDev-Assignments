// Schema of Person
// Person: {
//   name: '',
//   description: '',
//   profiles: [
//     {
//       title: 'LinkedIn',
//       link: 'https...'
//     }
//   ],
//   interests: ['cricket', 'outing']
// };

function App() {
  const hamza = {
    name: 'Hamza Ali',
    description: 'A good hustler trying to make a living.',
    profiles: [
      {
        title: 'Facebook',
        link: '#'
      },
      {
        title: 'LinkedIn',
        link: '#'
      },
      {
        title: 'Twitter',
        link: '#'
      }
    ],
    interests: ['cricket', 'outing']
  };

  return(
    <div className="container">
      <div className='card'>
        <Card person={hamza}/>
      </div>
    </div>
  );
}

function Card({
  person
}) {
  return (
    <div>
      <div className="intro">
        <h1>{person.name}</h1>
        <p>{person.description}</p>
      </div>

      <div className="profiles">
        <h1>Profiles</h1>
        { person.profiles.map(profile => <Profile profile={profile}/>) }
      </div>
      
      <div className="interests">
        <h1>Interests</h1>
        { person.interests.map(interest => <Interest interest={interest}/>) }
      </div>
    </div>
  );
}

function Profile({ profile }) {
  return (
    <a href={profile.link}>{profile.title}</a>
  );
}

function Interest({ interest }) {
  return (
    <span className="interest">{interest}</span>
  );
}

export default App;