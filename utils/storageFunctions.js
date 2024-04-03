import AsyncStorage from '@react-native-async-storage/async-storage';


export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('notes');
        const fetchedNotes = (JSON.parse(jsonValue));
        
        const sortedNotes = fetchedNotes.sort((a, b) => 
        (new Date(b.id).getTime()) - (new Date(a.id).getTime()));

        // setNotes(sortedNotes);
        return fetchedNotes != null ? sortedNotes : null;
    } catch (e) {
        // error reading value
    }
};


export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('notes', jsonValue);
    } catch (e) {
      // saving error
    }
};