import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function AddNoteButton({ onPress }) {
  return (
    <TouchableOpacity 
        style={styles.addButton} 
        onPress={onPress}
    > 
        <Text style={styles.addButtonText}> 
            Add Dream 
        </Text> 
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    addButton: { 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: "#007BFF", 
        paddingVertical: 12, 
        borderRadius: 5, 
        marginTop: 10, 
    }, 
    addButtonText: { 
        color: "white", 
        fontSize: 16, 
        fontWeight: "bold", 
    },
});