import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import googleLogo from '../_assets/Insciption_2/google-icon.svg';
import fbLogo from '../_assets/Insciption_2/facebook-2.svg';
import eyeLogo from '../_assets/Page_connexion/grey_eye.svg';


const PasswordInput = ({field, form, ...props}) => {
  return (
    <div className='input-container'>
      <input {...field} {...props} />
      <span onClick={() => props.onShowPassword(field)}>
        <img src={eyeLogo} alt='password logo'/>
      </span>
    </div>
  );
}

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

const SocialSignUp = (onSignUpWithGoogle, onSignUpWithFacebook) =>
  <div className='signup__social'>
    <div className='signup__social-btn facebook'>
      <button onClick={() => onSignUpWithFacebook()}>
        <span>
          <img src={fbLogo} alt="google logo"/>
        </span>
      </button>
      <span>Facebook</span>
    </div>
    <div className='signup__social-btn google'>
      <button onClick={() => onSignUpWithGoogle()}>
        <span>
          <img src={googleLogo} alt="google logo"/>
        </span>
      </button>
      <span>Google</span>
    </div>
  </div>

const BasicSignUp = (onSignUpWithEmail, onShowPassword, isPassVisible, isConfirmedPassVisible) =>
  <div className='signup__basic'>
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
        <Form className='signup__basic-form'>
          <Field name='lastName' placeholder='Nom'/>
          <div className="signup__basic-form-error">
            <ErrorMessage name='lastName'/>
          </div>
          <Field  name='firstName' placeholder='Prénom'/>
          <div className="signup__basic-form-error">
            <ErrorMessage name='firstName'/>
          </div>
          <Field type='email' name='email' placeholder='Email'/>
          <div className="signup__basic-form-error">
            <ErrorMessage name='Email'/>
          </div>
          <Field
            type={isPassVisible ? 'text': 'password'}
            name='password'
            placeholder='Mot de passe'
            component={PasswordInput}
            onShowPassword={onShowPassword}/>
          <div className="signup__basic-form-error">
            <ErrorMessage name='password'/>
          </div>
          <Field
            name='confirmed_pass'
            type={isConfirmedPassVisible ? 'text': 'password'}
            placeholder='Confirmer mot de passe'
            component={PasswordInput}
            onShowPassword={onShowPassword}/>
          <div className="signup__basic-form-error">
            <ErrorMessage name='confirmed_pass'/>
          </div>
          <button type='submit'>S'inscrire</button>
      </Form>
      )}
    </Formik>
  </div>


export const SignUpView = ({ onSignUpWithEmail, onSignUpWithGoogle, onSignUpWithFacebook, onShowPassword, isPassVisible, isConfirmedPassVisible }) =>
  <div className='signup'>
    <div className='signup__title'>
      <h2>Bienvenue !</h2>
      <h2>Créez votre Compte !</h2>
    </div>
    {BasicSignUp(onSignUpWithEmail, onShowPassword, isPassVisible, isConfirmedPassVisible)}
    <div className="signup__separator">
      <h5>Ou inscrivez-vous avec</h5>
    </div>
    {SocialSignUp(onSignUpWithGoogle, onSignUpWithFacebook)}
  </div>