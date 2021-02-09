import './App.css';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect } from 'react';
import ebconfig from './ebconfig';

function App() {
  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <EasybaseProvider ebconfig={ebconfig}>
        <Notes />
        <NewTemButton />
        <Router/>
      </EasybaseProvider>
    </div>
  );
}

function NewTemButton() {
  const { Frame, sync } = useEasybase();

  const buttonStyle = {
    position: "absolute",
    left: 10,
    top: 10,
    fontSize: 21
  }

  const handleClick = () => {
    const newNumber = prompt("Please enter TemTem number");
    const newName = prompt("Please enter TemTem name");
    const newDescription = prompt("Please enter a short description");
    
    Frame().push({
      number: newNumber,
      name: newName,
      description: newDescription
    })
    
    sync();
  }

  return <button style={buttonStyle} onClick={handleClick}>Add TemTem</button>
}

function Notes() {
  const { Frame, sync, configureFrame } = useEasybase();

  useEffect(() => {
    configureFrame({ tableName: "TEMTEM", limit: 10 });
    sync();
  }, []);

  const noteRootStyle = {
    border: "2px #0af solid",
    borderRadius: 9,
    margin: 20,
    backgroundColor: "#efefef",
    padding: 6
  };

  return (
    <div style={{ width: 400 }}>
      {Frame().map(ele => 
        <div style={noteRootStyle}>
          <h3>{ele.number}</h3>
          <p>{ele.name}</p>
          <small>{String(ele.description).slice(0, 20)}</small>
        </div>
      )}
    </div>
  )
}
export default App;
