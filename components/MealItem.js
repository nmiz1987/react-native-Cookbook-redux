import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Image,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MealDetails from "../components/MealDetails";

export default function MealItem({
	id,
	title,
	imageUrl,
	duration,
	complexity,
	affordability,
}) {
	const navigation = useNavigation();

	function selectMealItem() {
		navigation.navigate("MealDetail", {
			mealId: id,
		});
	}

	return (
		<View style={styles.mealItem}>
			<Pressable
				onPress={selectMealItem}
				android_ripple={{ color: "#ccc" }}
				style={({ pressed }) => pressed && styles.buttonPress}
			>
				<View style={styles.innerContainer}>
					<View>
						<Image source={{ uri: imageUrl }} style={styles.image} />
						<Text style={styles.title}>{title}</Text>
					</View>
					<MealDetails
						duration={duration}
						complexity={complexity}
						affordability={affordability}
					/>
				</View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	mealItem: {
		margin: 16,
		borderRadius: 8,
		overflow: Platform.OS === "android" ? "hidden" : "visible",
		backgroundColor: "white",
		elevation: 4,
		shadowColor: "black",
		shadowOpacity: 0.35,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 16,
	},
	innerContainer: {
		borderRadius: 8,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: 200,
	},
	title: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 18,
		margin: 8,
	},

	buttonPress: {
		opacity: 0.5,
	},
});
