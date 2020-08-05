import React, { useState, useEffect, FormEvent } from 'react'

import PageHeader from '../../components/page-header'
import TeacherItem, { Teacher } from '../../components/teacher-item'
import Input from '../../components/input'
import Select from '../../components/select'
import api from '../../services/api'
import './styles.css'

function TearcherList () {
  const [teachers, setTeachers] = useState([])
  const [subject, setSubject] = useState('')
  const [weekDay, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  async function searchTeachers (event?: FormEvent) {
    if (event) event.preventDefault()

    console.log('filters',subject,weekDay,time)
    try {
      const { data } = await api.get('classes', {
        params: { subject, week_day: weekDay, time }
      })

      setTeachers(data)
    } catch (error) {
      alert('Erro no filtro!')
      console.error('TeacherList request error', error)
    }
  }

  useEffect(() => {
    searchTeachers()
  }, [subject, weekDay, time])

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Este são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
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
          <Select
            name="week_day"
            label="Dia da semana"
            value={weekDay}
            onChange={(e) => setWeekDay(e.target.value)}
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
            name="time"
            label="Hora"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </form>
      </PageHeader>

      <main>
        {
          teachers.map((item: Teacher) => {
            return <TeacherItem key={item.id} item={item} />
          })
        }
      </main>
    </div>
  )
}

export default TearcherList
