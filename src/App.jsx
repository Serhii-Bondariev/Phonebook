import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import styles from './App.module.css';


const App = () => {


  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.appWrapper}>
          <h1 className={styles.phonebookTitle}>Phonebook</h1>
          <ContactForm />
          <h2 className={styles.contactsTitle}>Contacts</h2>
          <Filter />
          <ContactList className={styles.contactList} />
        </div>
      </div>
    </div>
  );
};

export default App;
