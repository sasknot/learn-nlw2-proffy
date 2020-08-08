import React, { useState } from 'react'
import { View, Image, Text, Linking, Alert } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import removeFavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import styles from './styles'

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
  favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({ item, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited)

  async function createNewConnection () {
    await api.post('connections', { user_id: item.id })
    Linking.openURL(`whatsapp://send?phone=${item.whatsapp}`)
  }

  async function toggleFavorite () {
    let favorites = []
    const storedFavorites = await AsyncStorage.getItem('favorites')

    if (storedFavorites) {
      try {
        favorites = JSON.parse(storedFavorites)
      } catch (error) {
        Alert.alert('Desculpe-nos!', 'Não foi possível puxar a lista de favoritos.')
        console.error('TeacherItem favorites error', error)
      }
    }

    if (isFavorited) {
      favorites = favorites.filter((favorite: Teacher) => favorite.id !== item.id)
      setIsFavorited(false)
    } else {
      favorites.push(item)
      setIsFavorited(true)
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: item.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subject}>{item.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{item.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {item.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : {}
            ]}
            onPress={toggleFavorite}
          >
            {
              isFavorited
                ? <Image source={removeFavoriteIcon} />
                : <Image source={heartOutlineIcon} />
            }
          </RectButton>

          <RectButton style={styles.contactButton} onPress={createNewConnection}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}

export default TeacherItem
