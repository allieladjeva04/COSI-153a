import React, { useState, useEffect, useContext, createContext } from "react";
import storage from './Storage';

const defaultValue = {
  currentUsername: 'none',
  setCurrentUsername: () => {},
  currentMajor: 'none',
  setCurrentMajor: () => {},
  joinedClubs: [],
  setJoinedClubs: () => {},
  clearData: () => {}
};

export const ValueContext = createContext(defaultValue);

export const ValueProvider = ({ value, children }) => {
  const [currentUsername, setCurrentUsername] = useState(value.username);
  const [currentMajor, setCurrentMajor] = useState(value.major);
  const [joinedClubs, setJoinedClubs] = useState([]);

  const [firstCall, setFirstCall] = useState(true);

  useEffect(() => {
    getData('username', currentUsername, setCurrentUsername);
    getData('major', currentMajor, setCurrentMajor);
    getData('joinedClubs', joinedClubs, setJoinedClubs);
    setFirstCall(false);
  }, []);

  useEffect(() => {
    if (!firstCall) {
      storeData('username', currentUsername);
      storeData('major', currentMajor);
      storeData('joinedClubs', joinedClubs);
    }
  }, [currentUsername, currentMajor, joinedClubs]);

  const clearData = async () => {
    await storage.remove({
      key: 'sharedData',
      id: 'username',
    });
    await storage.remove({
      key: 'sharedData',
      id: 'major',
    });
    await storage.remove({
      key: 'sharedData',
      id: 'joinedClubs',
    });

    setCurrentUsername('');
    setCurrentMajor('');
    setJoinedClubs([]);
  };

  return (
    <ValueContext.Provider
      value={{
        currentUsername,
        setCurrentUsername,
        currentMajor,
        setCurrentMajor,
        joinedClubs,
        setJoinedClubs,
        clearData,
      }}
    >
      {children}
    </ValueContext.Provider>
  );
};

const getData = async (key, currentValue, setCurrentValue) => {
  try {
    const ret = await storage.load({
      key: 'sharedData',
      id: key,
    });
    if (ret === undefined) {
      storeData(key, currentValue);
      console.log(`storing initial ${key} in memory`);
    } else {
      console.log(`getting ${key} from memory`);
      setCurrentValue(ret);
    }
  } catch (err) {
    console.warn(err.message);
    switch (err.name) {
      case 'NotFoundError':
        storeData(key, currentValue);
        console.log('NotFoundError');
        break;
      case 'ExpiredError':
        console.log('ExpiredError');
        break;
    }
  }
};

const storeData = async (key, value) => {
  try {
    await storage.save({
      key: 'sharedData',
      id: key,
      data: value,
      expires: null,
    });
    console.log(`just stored ${JSON.stringify(value)} for ${key}`);
  } catch (e) {
    console.dir(e);
  }
};

export default ValueProvider;
export const useValue = () => useContext(ValueContext);
