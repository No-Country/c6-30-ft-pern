import { StyleSheet } from "react-native";
import { theme } from "../../../../globalStyles/theme";

// Styles HomeUser

const styles = StyleSheet.create({
  color: {
    color: "red",
    fontWeight: 700,
  },
  container: {
    backgroundColor: theme.colors.background,
    minHeight: "100%",
  },
  appointment: {
    borderWidth: 2,
    borderColor: "#479BB6",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10
  },
  cardContainer: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    bottom: 220
  },
  imgContainer: {
    alignItems: "center",
    marginTop: 80
  },
  imgLogo: {
    width: 165,
    height: 55,
  },
  text: {
    fontSize: 24,
    marginBottom: 10
  }
});

export default styles;
