import { StyleSheet } from "react-native";
import { theme } from "../../globalStyles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.bgCard,
    borderRadius: 20,
    padding: 20,
    marginVertical: 5,
    overflow: "hidden",
  },
  dataContainer: {
    width: "85%",
  },
  textContainer: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    marginHorizontal: 5,
    marginVertical: 3,
  },
  title: {
    textTransform: "uppercase",
    fontSize: theme.fontSize.headline,
  },
  button: {
    padding: 3,
  },
  textLabel: {
    backgroundColor: theme.colors.background,
    padding: 5,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    overflow: "hidden",
  },
  textSubtitle: {
    fontSize: theme.fontSize.title,
  },
});
