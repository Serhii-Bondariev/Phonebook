import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';
import { addContact } from 'store/contactsSlice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' ][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      { message: 'Invalid name', excludeEmptyString: true }
    )
    .required('Name is required'),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/,
      { message: 'Invalid phone number', excludeEmptyString: true }
    )
    .required('Phone number is required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

 const handleSubmit = (values, { resetForm }) => {
  validationSchema
    .validate(values, { abortEarly: false })
    .then(() => {
      const existingContactByName = contacts.find((contact) => contact.name === values.name);
      const existingContactByNumber = contacts.find((contact) => contact.number === values.number);

      if (existingContactByName) {
        toast.error(`${values.name} is already in contacts`);
      } else if (existingContactByNumber) {
        toast.error(`Contact with number ${values.number} already exists`);
      } else {
        dispatch(addContact({ id: uuidv4(), name: values.name, number: values.number }));
        toast.success(`Contact ${values.name} added successfully`);
        resetForm();
      }
    })
    .catch((errors) => {
      errors.inner.forEach((error) => {
        toast.error(error.message);
      });
    });
};

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className={styles['contact-form']}>
          <label className={styles['contact-label']}>
            Name:
            <Field
              className={styles['contact-input']}
              type="text"
              placeholder="Enter name"
              name="name"
              required
              minLength="3"
              maxLength="30"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage className={styles['error-message']} name="name" component="div" />
          </label>
          <label className={styles['contact-label']}>
            Number:
            <Field
              className={styles['contact-input']}
              type="tel"
              placeholder="Enter phone number"
              name="number"
              required
              pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              minLength="10"
              maxLength="13"
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage className={styles['error-message']} name="number" component="div" />
          </label>
          <button className={styles['contact-btn']} type="submit">
            Add contact
          </button>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={true}
            draggable
            pauseOnHover
            theme="light"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;


