import React from 'react';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  if (contacts.length === 0) {
    return <p>No contacts found</p>;
  }

  return (
    <div className={styles.contactListWrapper}>
      <table className={styles.contactTable}>
        <thead className={styles.contactTableHead}>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody className={styles.contactTableBody}>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name} :</td>
              <td>{contact.number}</td>
              <td>
                <button
                  className={styles.contactDelBtn}
                  onClick={() => onDeleteContact(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
