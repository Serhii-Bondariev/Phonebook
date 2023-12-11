  // import React from 'react';
  // import { Formik, Form, Field, ErrorMessage } from 'formik';
  // import * as Yup from 'yup';
  // import styles from './ContactForm.module.css';
  // import { addContact } from 'store/contactsSlice';
  // import { useDispatch } from 'react-redux';
  // import { v4 as uuidv4 } from 'uuid';
  // import { useSelector } from 'react-redux';
  // import { ToastContainer, toast } from 'react-toastify';
  //   import 'react-toastify/dist/ReactToastify.css';





  // const validationSchema = Yup.object().shape({
  //   name: Yup.string()
  //     .matches(
  //       /^[a-zA-Zа-яА-Я]+(([' ][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
  //       'Invalid name'
  //     )
  //     .required('Name is required'),
  //   number: Yup.string()
  //     .matches(
  //       /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/,
  //       'Invalid phone number'
  //     )
  //     .required('Phone number is required'),
  // });

  // const ContactForm = () => {

  //   toast.info('🦄 Wow so easy!', {
  // position: "top-right",
  // autoClose: 4905,
  // hideProgressBar: false,
  // closeOnClick: true,
  // pauseOnHover: true,
  // draggable: true,
  // progress: undefined,
  // theme: "light",
  // });
  //   const dispatch = useDispatch();
  //   const contacts = useSelector(state => state.contacts.items);
  //   console.log(contacts);
  //   const handleSubmit = (values, { resetForm }) => {
  //     if (contacts.find(contact => contact.name === values.name)) {
  //       return toast.error(`${values.name} is already in contacts`);
  //     }
  //     dispatch(addContact({ id: uuidv4(), name: values.name, number: values.number }));
    
  //     resetForm();
  //   };

  //   return (
  //     <Formik
  //       initialValues={{ name: '', number: '' }}
  //       validationSchema={validationSchema}
  //       onSubmit={handleSubmit}
  //     >
  //       {({ values, errors, touched, handleChange, handleBlur }) => (
  //         <Form className={styles['contact-form']}>
  //           <label className={styles['contact-label']}>
  //             Name:
  //             <Field
  //               className={styles['contact-input']}
  //               type="text"
  //               placeholder="Enter name"
  //               name="name"
  //               required
  //               minLength="3"
  //               maxLength="30"
  //               value={values.name}
  //               onChange={handleChange}
  //               onBlur={handleBlur}
  //             />
  //             <ToastContainer
  // position="top-right"
  // autoClose={4905}
  // hideProgressBar={false}
  // newestOnTop={false}
  // closeOnClick
  // rtl={false}
  // pauseOnFocusLoss
  // draggable
  // pauseOnHover
  // theme="light"
  // />
  //           </label>
  //           <label className={styles['contact-label']}>
  //             Number:
  //             <Field
  //               className={styles['contact-input']}
  //               type="tel"
  //               placeholder="Enter phone number"
  //               name="number"
  //               required
  //               pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
  //               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  //               minLength="10"
  //               maxLength="13"
  //               value={values.number}
  //               onChange={handleChange}
  //               onBlur={handleBlur}
  //             />
  //             <ErrorMessage
  //               className={styles['error-message']}
  //               name="number"
  //               component="div"
  //             />
  //           </label>
  //           <button className={styles['contact-btn']} type="submit">
  //             Add contact
  //           </button>
  //         </Form>
  //       )}
  //     </Formik>
  //   );
  // };

// export default ContactForm;
  
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';
import { addContact } from 'store/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getContacts } from 'store/selectors';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' ][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Invalid name'
    )
    .required('Name is required'),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/,
      'Invalid phone number'
    )
    .required('Phone number is required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleSubmit = (values, { resetForm }) => {
    const existingContact = contacts.find(contact => contact.name === values.name);

    if (existingContact) {
      toast.error(`${values.name} is already in contacts!`, { position: "top-center" });
      return;
    }

    dispatch(addContact({ id: uuidv4(), name: values.name, number: values.number }));
    toast.success(`${values.name} added to contacts!`, { position: "top-center" });

    resetForm();
  };

  return (
    <div>
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
              <ErrorMessage
                className={styles['error-message']}
                name="name"
                component="div"
              />
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
              <ErrorMessage
                className={styles['error-message']}
                name="number"
                component="div"
              />
            </label>
            <button className={styles['contact-btn']} type="submit">
              Add contact
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;

