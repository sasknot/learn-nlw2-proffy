import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#8257E5'
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },

  backButton: {
    padding: 10,
    marginLeft: -10
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginVertical: 20
  }
})
