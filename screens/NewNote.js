import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import ActionButton from "../components/ActionButton";
import { storeData } from '../utils/storageFunctions';
import { useRoute } from "@react-navigation/native"
import AudioRecorder from "../components/AudioRecorder";
import AudioRecorder2 from '../components/AudioRecorder2';



export default function NewNote({ navigation }) {

  const route = useRoute()
  const routeNotes = JSON.parse(route.params.notes);
  const routeSelectedNote = JSON.parse(route.params.selectedNote);

  const [notes, setNotes] = useState(routeNotes); 
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // if a note is selected, prepare for update
  useEffect(() => {
    if (routeSelectedNote?.id) {
      setTitle(routeSelectedNote.title);
      setContent(routeSelectedNote.content);
      setSelectedNote(routeSelectedNote);
    }
  }, [])

  // Function to handle saving a note 
  const handleSaveNote = () => { 
    if (selectedNote) { 
      const updatedNotes = notes.map((note) => 
          note.id === selectedNote.id 
              ? { ...note, title, content } 
              : note 
      ); 
      setNotes(updatedNotes); 
      storeData(updatedNotes);
      setSelectedNote(null); 
      navigation.navigate('NoteList');
    } else { 
      const newNote = { 
        id: new Date(), 
        title, 
        content, 
      }; 
      notes.push(newNote);
      setNotes([...notes, newNote]); 
      storeData(notes);
      navigation.navigate('NoteList');
    }
    setTitle(""); 
    setContent(""); 
  };

  // Function to handle deleting a note 
  const handleDeleteNote = (note) => { 
    const updatedNotes = notes.filter( 
          (item) => item.id !== note.id 
      ); 
      setNotes(updatedNotes); 
      storeData(updatedNotes);
      setSelectedNote(null); 
      navigation.navigate('NoteList');
  }; 

  return (
    <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Enter title'
          value={title}
          onChangeText={setTitle} 
        />
        <TextInput 
          style={styles.contentInput} 
          multiline 
          placeholder="Enter note content"
          value={content} 
          onChangeText={setContent} 
        /> 
        <View style={styles.buttonContainer}>
          <ActionButton
            title="Save"
            onPress={handleSaveNote} 
            color="green"
          />
          <ActionButton 
            title="Cancel"
            onPress={() => { navigation.navigate('NoteList')}}
            color="#FF9500"
          />
          {selectedNote?.id && ( 
            <ActionButton 
              title="Delete"
              onPress={() => handleDeleteNote(selectedNote)}
              color="#FF3B30"
            /> 
          )} 
        </View>

        {/* <AudioRecorder /> */}
        <AudioRecorder2 />
      </View>
  )
}

const styles = StyleSheet.create({
    modalContainer: { 
      flex: 1, 
      padding: 30, 
      backgroundColor: "white", 
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    form: {
      flex: 1, 
      padding: 30, 
      marginTop: 50,
    },
    input: { 
      borderWidth: 1, 
      borderColor: "#E0E0E0", 
      backgroundColor: '#E0E0E0',
      padding: 10, 
      marginBottom: 10, 
      borderRadius: 5, 
  },
  contentInput: { 
    borderWidth: 1, 
    borderColor: "#E0E0E0", 
    backgroundColor: '#E0E0E0',
    padding: 10, 
    marginBottom: 20, 
    borderRadius: 5, 
    height: 150, 
    textAlignVertical: "top",
  },
  buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
  },

});