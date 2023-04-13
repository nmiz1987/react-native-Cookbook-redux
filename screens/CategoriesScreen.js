import { FlatList, StyleSheet, Text, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data/";
import CategoryGridTile from "../components/CategoryGridTile";

export default function CategoriesScreen({ navigation }) {
	function renderCategoryItem(itemData) {
		function pressHandler() {
			navigation.navigate("MealsOverview", {
				categoryId: itemData.item.id,
			});
		}
		return (
			<View>
				<CategoryGridTile
					title={itemData.item.title}
					color={itemData.item.color}
					onPress={pressHandler}
				/>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={CATEGORIES}
				renderItem={renderCategoryItem}
				keyExtractor={(item) => item.id}
				numColumns={2}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
});
