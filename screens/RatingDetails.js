import { useEffect } from 'react'
import { StyleSheet, ScrollView, Image, View, Text, Pressable } from 'react-native'
import { COLORS } from '../constants/GlobalStyles'
import { dummyRatings } from '../data/dummy-data'
import { Ionicons } from '@expo/vector-icons'
import { IconButton } from '../components/ui/IconButton'
import moment from 'moment'

export const RatingDetails = ({ route, navigation }) => {
  const item = dummyRatings.find(rating => rating.id === route.params.ratingId)

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => {
        return (
          <IconButton
            icon='create'
            color={COLORS.primary100}
            onPress={() =>
              navigation.navigate('ManageRating', {
                ratingId: item.id,
              })
            }
          />
        )
      },
    })
  }, [item, navigation])

  const stars = []
  for (let i = 0; i < item.rating; i++) {
    stars.push(
      <View style={styles.star} key={i}>
        <Ionicons name='star' size={18} color={COLORS.primary200} />
      </View>
    )
  }

  const handleMap = () => {
    // TODO: add map screen and get location from route.params - link to or open device map app (apple maps or google maps)
    // navigation.navigate('Map', {
    //   location: item.location,
    // })
  }

  return (
    <ScrollView style={styles.screen}>
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.starsWrapper}>
          <Text style={styles.ratingText}>
            <Text style={styles.number}>{item.rating}</Text> / 10
          </Text>
          {stars}
        </View>
        {item.address && (
          <Pressable style={({ pressed }) => pressed && styles.addressPressed} onPress={handleMap}>
            <Text style={styles.address}>
              <Ionicons name='location' size={14} color={COLORS.primary100} /> {item.address}
            </Text>
          </Pressable>
        )}
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>Rated on {moment(item.date).format('ll')}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.primary800,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  infoWrapper: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  starsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.primary100,
    fontSize: 16,
    marginRight: 8,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  star: {
    marginRight: 4,
  },
  address: {
    color: COLORS.primary100,
    opacity: 0.5,
    marginTop: 10,
  },
  addressPressed: {
    opacity: 0.7,
  },
  description: {
    color: COLORS.primary100,
    fontSize: 16,
    marginTop: 20,
  },
  date: {
    color: COLORS.primary100,
    fontSize: 16,
    opacity: 0.5,
    marginTop: 10,
  },
})
