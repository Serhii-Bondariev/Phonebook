import React from 'react';
import styles from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'store/contactsSlice';
import { getFilteredContacts } from 'store/selectors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactList = () => {
  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  const onDeleteContact = contact => {
    dispatch(deleteContact(contact.id));
    toast.success(`Contact ${contact.name} deleted successfully`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (contacts.length === 0) {
    return <p>No contacts found</p>;
  }

  return (
    <div className={styles.contactListWrapper}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                  onClick={() => onDeleteContact(contact)}
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

