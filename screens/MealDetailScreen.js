import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/Subtitle";
import List from "../components/List";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
("../store/redux/favorites");

export default function MealDetailScreen({ route, navigation }) {
  const mealID = route.params.mealId;

  const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealIsFavorite = favoriteMealsIds.includes(mealID);

  const selectedMeal = MEALS.find((meal) => meal.id === mealID);

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      dispatch(removeFavorite({ id: mealID }));
    } else {
      dispatch(addFavorite({ id: mealID }));
    }
  }

  // add button to header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          color="white"
          icon={mealIsFavorite ? "star" : "star-outline"}
          onPress={changeFavoriteStatusHandler}
        />
      ),
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>steps</Subtitle>
          <List data={selectedMeal.steps} align="right" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 10,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listContainer: {
    width: "80%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
});
