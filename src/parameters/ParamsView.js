import React from 'react';
import Toggle from 'react-toggle';
import fbLogo from '../_assets/logos/facebook-2.svg';
import instagramLogo from '../_assets/logos/instagram.svg';
import twitterLogo from '../_assets/logos/twitter.svg';
import "react-responsive-modal/styles.css";
import { Modal } from 'react-responsive-modal';


const accounts = [
  {
    title: 'Compte Oveo',
    "Nom d'utilisateur": "Fadel Gueye",
    Email: 'fadel2603@gmail.com',
    "Mot de passe": 'mylongpasswordwithnosense',
    mdp: true,
  },
  {
    title: 'Compte Spotify',
    "Nom d'utilisateur": "Fadel Gueye",
    "Abonnement": 'Premium',
    "Date d'ajout": `Le 16/03/2020`,
  }
];

const notifications = [
  {
    title: 'Nouvautés musicales',
    "Notification push": false,
    "Notification mail": false,
    ref: 'music'
  },
  {
    title: 'Nouvautés mise à jour',
    "Notification push": false,
    "Notification mail": true,
    ref: 'update'
  }
];

const buttons = [
  {
    title: 'Facebook',
    logo: fbLogo,
    link: "#",
  },
  {
    title: 'Instagram',
    logo: instagramLogo,
    link: "#",
  },
  {
    title: 'Twitter',
    logo: twitterLogo,
    link: "#",
  }
];

const Accounts = (toggleModal) =>
  <div className="params_account">
    <div className="title">
      <h3>Compte et sécurité</h3>
    </div>
    {accounts.map((acc, idx) => (
      <div key={idx} className="params_account-main">
        <h4>{acc.title}</h4>
        <div>
          <span className="left">{Object.keys(acc)[1]}</span>
          <span className="right">{acc["Nom d'utilisateur"]}</span>
        </div>
        <div>
          <span className="left">{Object.keys(acc)[2]}</span>
          <span className="right">{acc[Object.keys(acc)[2]]}</span>
        </div>
        <div>
          <span className="left">{Object.keys(acc)[3]}</span>
          {acc.mdp
          ? <input type='password' value={acc["Mot de passe"]} className="right"></input>
          : <span className="right">{acc["Date d'ajout"]}</span>}
        </div>
        <div className='params_account-main-password'>
          {acc.mdp
            ? <span onClick={() => toggleModal()}> Changer de mot de passe </span>
            : null
          }
        </div>
      </div>
    ))}
  </div>;

const Notifications = (
  toggleNotifications,
  musicPush,
  musicMail,
  updatePush,
  updateMail
  ) =>
  <div className="params_notif">
    <div className="title">
      <h3>Notifications</h3>
    </div>
    {notifications.map((acc, idx) => (
      <div key={idx} className="params_account-main">
        <h4>{acc.title}</h4>
        <div>
          <span className="left">{Object.keys(acc)[1]}</span>
          <span className="right">
            <Toggle
              name={acc.ref === 'music' ? 'musicPush' : 'updatePush'}
              icons={false}
              checked={acc.ref === 'music' ? musicPush : updatePush}
              onChange={(e) => toggleNotifications(e)}/>
          </span>
        </div>
        <div>
          <span className="left">{Object.keys(acc)[2]}</span>
          <span className="right">
            <Toggle
              name={acc.ref === 'music' ? 'musicMail' : 'updateMail'}
              icons={false}
              checked={acc.ref === 'music' ? musicMail : updateMail}
              onChange={(e) => toggleNotifications(e)}/>
          </span>
        </div>
      </div>
    ))}
  </div>

const About = () =>
  <div className="params_about">
    <div className="title">
      <h3>About</h3>
      <h5>Suivez-nous sur</h5>
    </div>
    <div className="params_about-logos">
      {buttons.map((btn, id) => (
        <div key={id} className='params_about-logos-btn'>
          <button onClick={() => window.open(btn.link)}>
            <img src={btn.logo} alt={btn.title}/>
          </button>
          <span>{btn.title}</span>
        </div>
      ))}
    </div>
  </div>

const Deactivate = () =>
  <div className="params_deactivate">
    <button>
      Desactiver le compte
    </button>
  </div>

  const NewPassord = (toggleModal) =>
    <div className="newpassword">
      <h3>Changez de mot de passe</h3>
      <div className="newpassword_oldpass">
        <span>Ancien mot de passe</span>
        <input type="text"/>
      </div>
      <div className="newpassword_newpass">
        <span>Nouveau mot de passe</span>
        <input type="text"/>
      </div>
      <div className="newpassword_confirmpass">
        <span>Confirmation du nouveau mot de passe</span>
        <input type="text"/>
      </div>
      <div className="newpassword_btns">
        <button onClick={() => toggleModal()} className='newpassword_btns-cancel'>Annuler</button>
        <button className='newpassword_btns-confirm'>Confirmer</button>
      </div>
    </div>

export default function ParamsView({
  isModalOpen,
  toggleModal,
  musicPush,
  musicMail,
  updatePush,
  updateMail,
  toggleNotifications,
  }) {
  return (
    <div className='params'>
      {Accounts(toggleModal)}
      {Notifications(
        toggleNotifications,
        musicPush,
        musicMail,
        updatePush,
        updateMail
        )}
      {About()}
      {Deactivate()}
      <Modal
        open={isModalOpen}
        showCloseIcon={false}
        onClose={() => toggleModal()}>
        {NewPassord(toggleModal)}
      </Modal>
    </div>
  )
}