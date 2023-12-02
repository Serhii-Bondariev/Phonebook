import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles['app']}>
      <div className={styles['container']}>
        <div className={styles['app-wrapper']}>
          <h1 className={styles['phonebook-title']}>Phonebook</h1>
          <ContactForm onAddContact={addContact} />
          <h2 className={styles['contacts-title']}>Contacts</h2>
          <Filter filter={filter} onFilterChange={handleFilterChange} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={deleteContact}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
