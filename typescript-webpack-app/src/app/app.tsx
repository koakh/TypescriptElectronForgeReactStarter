import { ipcRenderer } from 'electron';
import React, { useState } from 'react';

// register ipc event messages
ipcRenderer.on( 'channel1-response', (e, args) => {
  console.log(args)
})

ipcRenderer.on( 'mailbox', (e, args) => {
  console.log(args)
})

const App = () => {
  const [count, setCount] = useState(0)
  const onClickHandler = () => {
    // add a break point here
    setCount(count + 1);
    console.log('onClickHandler fired');
  }
  const onIpcSendChannel1Handler = () => {
    ipcRenderer.send('channel1', 'Hello from main window');
  }
  const onIpcSendSyncMessageHandler = () => {
    let response = ipcRenderer.sendSync('sync-message', 'Waiting for response')
    console.log(response)
  }

  return (
    <div className="app">
      <h1>I'm React running in Electron App!!</h1>
      <button onClick={onClickHandler}>Increment counter</button>
      <p>counter: {count}</p>
      <button onClick={onIpcSendChannel1Handler}>Send Ipc Message to Main</button>
      <button onClick={onIpcSendSyncMessageHandler}>Send Ipc Message to Main and Back</button>
    </div>
  );
}

export default App;
