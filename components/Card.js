import { View, StyleSheet } from "react-native"

export const Card = ({children}) => {
    return (
        <View style={styles.inputContainer}>
            {children}
        </View>
    )
}

export const styles = StyleSheet.create({
    inputContainer: {
        padding: 16,
        marginTop: 36 ,
        backgroundColor: '#3b021f',
        marginHorizontal: 24,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        justifyContent: 'center',
        alignItems: 'center'
    },
})