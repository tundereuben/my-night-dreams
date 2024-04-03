import { Button, Pressable, StyleSheet, Text, View } from "react-native"

export default function ActionButton({ title, color, onPress }) {
  return (
    <View style={[styles.buttonContainer, { backgroundColor: color }]}>
        <Pressable
             onPress={onPress} 
             color={ color }
        >
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: 80,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})