import { StyleSheet, FlatList, View } from "react-native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

export default function MealsOverviewScreen({ navigation, route }) {
  const catID = route.params.categoryId;
  const displayedMeals = MEALS.filter((mealItem) => mealItem.categoryIds.indexOf(catID) >= 0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: CATEGORIES.find((category) => category.id === catID).title,
    });
    //cleanup function
    return () => navigation.setOptions({ title: "" });
  }, [catID, navigation]);

  return <MealsList items={displayedMeals} />;
}
