import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput, Alert } from 'react-native'
// import { Picker } from '@react-native-community/picker'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import api from '../../services/api'
import PageHeader from '../../components/page-header'
import TeacherItem, { Teacher } from '../../components/teacher-item'
import styles from './styles'

export default function () {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [subject, setSubject] = useState('')
  const [weekDay, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  async function searchTeachers () {
    loadFavorites()

    try {
      const { data } = await api.get('classes', {
        params: { subject, week_day: weekDay, time }
      })

      setIsFiltersVisible(false)
      setTeachers(data)
    } catch (error) {
      Alert.alert('Desculpe-nos!', 'Ocorreu um erro no filtro.')
      console.error('TeacherList request error', error)
    }
  }

  function loadFavorites () {
    AsyncStorage.getItem('favorites').then((storedFavorites) => {
      if (storedFavorites) {
        try {
          const parsedFavorites = JSON.parse(storedFavorites)
          setFavorites(parsedFavorites.map((item: Teacher) => item.id))
        } catch (error) {
          Alert.alert('Desculpe-nos!', 'Não foi possível puxar a lista de favoritos.')
          console.error('TeacherList favorites error', error)
        }
      }
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      searchTeachers()
    }, [])
  )

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={() => setIsFiltersVisible(!isFiltersVisible)}>
            <Feather name="filter" size={20} color="#FFF"></Feather>
          </BorderlessButton>
        )}
      >
        {
          isFiltersVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>Matéria</Text>
              <TextInput
                style={styles.input}
                placeholder="Qual a matéria?"
                placeholderTextColor="#C1BCCC"
                value={subject}
                onChangeText={(text) => setSubject(text)}
              />

              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  {/*<Picker
                    selectedValue={setWeekDay}
                    style={styles.input}
                    prompt="Dia da semana"
                    onValueChange={(itemValue: string) => setWeekDay(itemValue)}
                  >
                    <Picker.Item label="Domingo" value="0" />
                    <Picker.Item label="Segunda-feira" value="1" />
                    <Picker.Item label="Terça-feira" value="2" />
                    <Picker.Item label="Quarta-feira" value="3" />
                    <Picker.Item label="Quinta-feira" value="4" />
                    <Picker.Item label="Sexta-feira" value="5" />
                    <Picker.Item label="Sábado" value="6" />
                  </Picker>*/}
                  <TextInput
                    style={styles.input}
                    placeholder="Qual o dia?"
                    placeholderTextColor="#C1BCCC"
                    value={weekDay}
                    onChangeText={(text) => setWeekDay(text)}
                  />
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Qual horário?"
                    placeholderTextColor="#C1BCCC"
                    value={time}
                    onChangeText={(text) => setTime(text)}
                  />
                </View>
              </View>

              <RectButton style={styles.submitButton} onPress={searchTeachers}>
                <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>
            </View>
          )
        }
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {
          teachers.map((item: Teacher) => (
            <TeacherItem
              key={item.id}
              item={item}
              favorited={favorites.includes(item.id)}
            />
          ))
        }
      </ScrollView>
    </View>
  )
}
