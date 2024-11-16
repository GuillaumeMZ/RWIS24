import { StyleSheet, Text, View } from "react-native";

const Root = () => (
    <View style={styles.container}>
        <Text>Hello, world !</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Root;