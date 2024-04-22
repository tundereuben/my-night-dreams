import { useState, useEffect } from "react"; 
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity, 
    StyleSheet,
} from "react-native"; 

import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddNoteButton from "../components/AddNoteButton";

export default function NoteList({ navigation }) {

    // Array to store notes 
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('notes');
          const fetchedNotes = (JSON.parse(jsonValue));
          
          const sortedNotes = fetchedNotes.sort((a, b) => 
            (new Date(b.id).getTime()) - (new Date(a.id).getTime())
          );

          setNotes(sortedNotes);
          return fetchedNotes != null ? fetchedNotes : null;
        } catch (e) {
          // error reading value
        }
    };

      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
        });
        return unsubscribe;
      }, [navigation]);
  
    // Function to handle editing a note 
    const handleEditNote = (note) => { 
        setSelectedNote(note); 
        // setTitle(note.title); 
        // setContent(note.content); 
        navigation.navigate('NewNote', {
            notes: JSON.stringify(notes),
            selectedNote: JSON.stringify(note)
        })

    }; 

  return (
    <View style={styles.container}> 

      <Text style={styles.title}>My Night Dreams</Text> 

      <ScrollView style={styles.noteList}> 
          {notes.map((note) => ( 
              <TouchableOpacity 
                  key={note.id} 
                  onPress={() => 
                    handleEditNote(note)
                } 
              > 
                  <View style={styles.noteContainer}>
                    <Text style={styles.noteTitle}> 
                        {note.title} 
                    </Text> 
                    <Text>
                      {note.content.slice(0,40)}
                      {note.content.length > 36 && '...'}
                    </Text>
                    <Text style={styles.noteDate}>
                        { Moment(note.id).format('MMMM Do YYYY, h:mm:ss a')} 
                    </Text>
                  </View>
              </TouchableOpacity> 
          ))} 
      </ScrollView> 

      {/* Add Note button */} 
      <AddNoteButton
        onPress={() => { 
                navigation.navigate('NewNote', { 
                notes: JSON.stringify(notes),
                selectedNote: JSON.stringify({})
            })
        }}
      />
  </View> 
  )
};

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        padding: 30, 
    }, 
    title: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 10, 
        color: '#fff',
        textAlign: 'center'
    }, 
    noteList: { 
        flex: 1, 
    }, 
    noteContainer: { 
        marginBottom: 10, 
        backgroundColor: "#ccc", 
        width: "100%", 
        padding: 10, 
        borderRadius: 5, 
    }, 
    noteTitle: { 
      fontSize: 15, 
      fontWeight: "bold", 
      color: "#00008b", 
    }, 
    noteDate: {
      color: 'grey',
      textAlign: 'right',
      fontSize: 12,  
    },
}); 