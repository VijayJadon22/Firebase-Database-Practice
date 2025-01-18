import { getFirestore, collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc, deleteDoc, deleteField } from "firebase/firestore";
import { app } from "./firebase"
import './App.css';

// Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore(app);

function App() {

  const writeData = async () => {
    const collectionRef = collection(firestore, "cities");
    const result = await addDoc(collectionRef, {
      name: "Delhi",
      pinCode: 1234,
      lat: 123,
      long: 456
    });
  };

  const makeSubCollection = async () => {
    const result = await addDoc(collection(firestore, "cities/vDMVcSJvs2AJgRa4SoLs/places"), {
      name: "Rajeev Chowk",
      desc: "Very crowded"
    });

  };

  const getDocument = async () => {
    const docRef = doc(firestore, "cities", "vDMVcSJvs2AJgRa4SoLs");
    const snap = await getDoc(docRef);
    console.log(snap.data());
  };

  const getDocumentsByQuery = async () => {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("isMale", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => console.log(doc.data()));
  };

  const updateDocument = async () => {
    const docRef = doc(firestore, "cities", "vDMVcSJvs2AJgRa4SoLs");
    await updateDoc(docRef, {
      name: "New Delhi"
    });
  };

  const deleteDocument = async () => {
    await deleteDoc(doc(firestore, "users", "sZ9C0VxJiFh46kTVMnmO"));
  };

  const deleteFieldFromDocument = async () => {
    const docRef = doc(firestore, "users", "N2laGkaa8VWeAiKGOLyu");
    await updateDoc(docRef, {
      Tall: deleteField()
    })
  };

  return (
    <div className="App">
      <h1>Firebase Firestore</h1>
      <button onClick={writeData}>Put Data</button>
      <button onClick={makeSubCollection}>Put SubData</button>
      <button onClick={getDocument}>Get Doc</button>
      <button onClick={getDocumentsByQuery}>Get Docs on query</button>
      <button onClick={updateDocument}>Update document</button>
      <button onClick={deleteDocument}>Delete document</button>
      <button onClick={deleteFieldFromDocument}>Delete Field</button>
    </div>
  );
}

export default App;
