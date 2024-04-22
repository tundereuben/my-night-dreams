import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import ActionButton from "../components/ActionButton";
import { storeData } from '../utils/storageFunctions';
import { useRoute } from "@react-navigation/native"
import AudioRecorder from "../components/AudioRecorder";
import AudioRecorder2 from '../components/AudioRecorder2';
import Moment from 'moment';


export default function NewNote({ navigation }) {

  const route = useRoute()
  const routeNotes = JSON.parse(route.params.notes);
  const routeSelectedNote = JSON.parse(route.params.selectedNote);

  const [notes, setNotes] = useState(routeNotes); 
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editMode, setEditMode] = useState(false);

  // if a note is selected, prepare for update
  useEffect(() => {
    if (routeSelectedNote?.id) {
      setTitle(routeSelectedNote.title);
      setContent(routeSelectedNote.content);
      setSelectedNote(routeSelectedNote);
      // setEditMode(true);
    } else {
      if (title === '' && content === '') {
        setEditMode(true);
      }
    }
  }, []);


  const getRecordings = (r) => {console.log(`recordings ==> `, r)}

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

  const handleCancel = () => {
    if (selectedNote?.id) {
      setEditMode(false);
    } else {
      navigation.navigate('NoteList');
    }
  }

  return (
    <>
      {!editMode &&
        <View style={styles.noteContainer}>
          <View style={styles.note}>
            <Text style={styles.noteTitle}>{title}</Text>
            <Text style={styles.noteContent}>{content}</Text>
            <Text style={styles.noteDate}>
              { Moment(selectedNote?.id).format('MMMM Do YYYY, h:mm:ss a')} 
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <ActionButton
              title="Go Back"
              onPress={() => { navigation.navigate('NoteList')}} 
              color="darkblue"
            />
            <ActionButton 
            title="Edit/Delete"
            onPress={() => {setEditMode(true)}}
            color="#FF3B30"
          />
          </View>
        </View>
      }

      {editMode && 
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
            // onPress={() => { navigation.navigate('NoteList')}}
            onPress={handleCancel}
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
        {/* <AudioRecorder2 getRecordings={getRecordings} /> */}
      </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  noteContainer: {
    flex: 1, 
    padding: 30, 
    marginTop: 50,
  },
  note: {
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'capitalize'
  },
  noteContent: {
    fontSize: 15,
    textAlign: 'justify',
    lineHeight: 22
  },
  noteDate: {
    color: 'grey',
    textAlign: 'right',
    fontSize: 12,
    marginTop: 10
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
    fontWeight: 'bold',
    textTransform: 'capitalize'
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
    lineHeight: 20
  },
  buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
  },

});