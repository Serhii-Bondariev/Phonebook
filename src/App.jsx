import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, updateFilter } from './contactsSlice';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import styles from './App.module.css';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const handleAddContact = (name, number) => {
    dispatch(addContact({ id: uuidv4(), name, number }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = e => {
    dispatch(updateFilter(e.target.value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.appWrapper}>
          <h1 className={styles.phonebookTitle}>Phonebook</h1>
          <ContactForm onAddContact={handleAddContact} />
          <h2 className={styles.contactsTitle}>Contacts</h2>
          <Filter filter={filter} onFilterChange={handleFilterChange} />
          <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
        </div>
      </div>
    </div>
  );
};

export default App;
