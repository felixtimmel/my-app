import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const basicSignUpSchema = Yup.object().shape({
  email: Yup.string().required('Email requis'),
  password: Yup.string()
    .min(6, 'Mot de passe trop court')
    .required('Mot de passe requis'),
  confirmed_pass: Yup.string()
  .required('Mot de passe requis')
  .oneOf([Yup.ref('password'), null], 'Le mot de passe ne correspond pas'),
  lastName: Yup.string().required('Nom requis'),
  firstName: Yup.string().required('Prénom requis'),
})

const SocialSignUp = () =>
  <div className='social'>
      <div id='firebaseui-auth-container'></div>
  </div>

const BasicSignUp = (onSignUpWithEmail) =>
  <div className='basic-signup'>
    <Formik
      initialValues={{
        email: '',
        password: '',
        lastName: '',
        firstName: '',
        confirmed_pass: '',
      }}
      validationSchema={basicSignUpSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSignUpWithEmail(values.email, values.password, values.firstName, values.lastName)
        setSubmitting(false);
      }}
    >
      {({ errors }) => (
        <Form>
          <Field name='lastName' placeholder='Nom'/>
          <ErrorMessage name='lastName'/>
          <Field  name='firstName' placeholder='Prénom'/>
          <ErrorMessage name='firstName'/>
          <Field type='email' name='email' placeholder='Email'/>
          <ErrorMessage name='email'/>
          <Field type='password' name='password' placeholder='Mot de passe'/>
          <ErrorMessage name='password'/>
          <Field name='confirmed_pass' type='password' placeholder='Confirmer mot de passe'/>
          <ErrorMessage name='confirmed_pass'/>
          <button type='submit'>S'inscrire</button>
      </Form>
      )}
    </Formik>
  </div>

export const SignUpView = ({ onSignUpWithEmail }) =>
  <>
    <h1>SignUp</h1>
    {BasicSignUp(onSignUpWithEmail)}
  </>