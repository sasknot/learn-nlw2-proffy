import React, { useState } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/page-header'
import TeacherItem, { Teacher } from '../../components/teacher-item'
import styles from './styles'

export default function () {
  const [favorites, setFavorites] = useState([])

  function loadFavorites () {
    AsyncStorage.getItem('favorites').then((storedFavorites) => {
      if (storedFavorites) {
        try {
          const parsedFavorites = JSON.parse(storedFavorites)
          setFavorites(parsedFavorites)
        } catch (error) {
          Alert.alert('Desculpe-nos!', 'Não foi possível puxar a lista de favoritos.')
          console.error('TeacherList favorites error', error)
        }
      }
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites()
    }, [])
  )

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {
          favorites.map((item: Teacher) => (
            <TeacherItem
              key={item.id}
              item={item}
              favorited
            />
          ))
        }
      </ScrollView>
    </View>
  )
}
