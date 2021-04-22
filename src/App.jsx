import React, { useState } from 'react';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import './components/Nav/Nav.css';

function App() {
  const [photoHeader, setPhotoHeader] = useState(null);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [homeActive, setHomeActive] = useState(false);

  return (
    <div className="App">
      {homeActive === true ? (
        <Header
          photoHeader={photoHeader}
          setPhotoHeader={setPhotoHeader}
          username={username}
          setUsername={setUsername}
          user={user}
          setUser={setUser}
        />
      ) : (
        ''
      )}

      <Nav
        photoHeader={photoHeader}
        setPhotoHeader={setPhotoHeader}
        username={username}
        setUsername={setUsername}
        user={user}
        setUser={setUser}
        setHomeActive={setHomeActive}
        homeActive={homeActive}
      />
    </div>
  );
}

export default App;
