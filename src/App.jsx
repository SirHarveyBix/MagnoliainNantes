import React, { useState } from 'react';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import './components/Nav/Nav.css';

function App() {
  const [photoHeader, setPhotoHeader] = useState(null);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');

  return (
    <div className="App">
      <Header
        photoHeader={photoHeader}
        setPhotoHeader={setPhotoHeader}
        username={username}
        setUsername={setUsername}
        user={user}
        setUser={setUser}
      />

      <Nav
        photoHeader={photoHeader}
        setPhotoHeader={setPhotoHeader}
        username={username}
        setUsername={setUsername}
        user={user}
        setUser={setUser}
      />
    </div>
  );
}

export default App;
