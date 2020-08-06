import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api'
import './styles.css'

export interface Teacher {
  id: number
  name: string
  avatar: string
  whatsapp: string
  bio: string
  cost: number
  subject: string
}

interface TeacherItemProps {
  item: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ item }) => {
  async function createNewConnection () {
    await api.post('connections', { user_id: item.id })
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={item.avatar} alt={item.name} />
        <div>
          <strong>{item.name}</strong>
          <span>{item.subject}</span>
        </div>
      </header>

      <p>{item.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {item.cost}</strong>
        </p>
        <a
          href={`https://wa.me/${item.whatsapp}`}
          target="_blank"
          onClick={createNewConnection}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem
