import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import warningIcon from '../../assets/images/icons/warning.svg'
import PageHeader from '../../components/page-header'
import Input from '../../components/input'
import Textarea from '../../components/textarea'
import Select from '../../components/select'
import api from '../../services/api'
import './styles.css'

function TearcherForm () {
  const history = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')
  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')
  const [scheduleItems, setScheduleItems] = useState([
    { id: 0, week_day: 0, from: '', to: '' }
  ])

  function addNewScheduleItem () {
    const id = scheduleItems.length + 1

    setScheduleItems([
      ...scheduleItems,
      { id, week_day: 0, from: '', to: '' }
    ])
  }

  function setScheduleItemValue (index: number, field: string, value: string) {
    const updatedItems = scheduleItems.map((item, itemIndex) => {
      if (index === itemIndex) {
        return { ...item, [field]: value }
      }

      return item
    })

    setScheduleItems(updatedItems)
  }

  async function handleCreateClass (event: FormEvent) {
    event.preventDefault()

    try {
      await api.post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      })

      alert('Cadastro realizado com sucesso!')
      history.push('/')
    } catch (error) {
      alert('Erro no cadastro!')
      console.error('TeacherForm request error', error)
    }
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Educação Física', label: 'Educação Física' },
                { value: 'Física', label: 'Física' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'História', label: 'História' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Química', label: 'Química' }
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {
              scheduleItems.map((item, index) => {
                return (
                  <div key={item.id} className="schedule-item">
                    <Select
                      name="week_day"
                      label="Dia da semana"
                      value={item.week_day}
                      onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                      options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sábado' }
                      ]}
                    />
                    <Input
                      name="from"
                      label="Das"
                      type="time"
                      value={item.from}
                      onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                    />
                    <Input
                      name="to"
                      label="Até"
                      type="time"
                      value={item.to}
                      onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                    />
                  </div>
                )
              })
            }
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TearcherForm
