import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css'

function TeacherItem () {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://directemployers.org/wp-content/uploads/2018/08/avatar-JohnDoe.jpg" alt="John Doe" />
        <div>
          <strong>John Doe</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis quos numquam eos ex, placeat fugiat quasi?
        <br /><br />
        Placeat natus, incidunt sint aperiam. Adipisci fugit suscipit consectetur est ut alias, obcaecati cupiditate.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem;
