<script>    
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, getDoc} from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyC6V-kdbYMztVHB13au9sC1cn5D5N3MFb4",
authDomain: "campus-tour-1.firebaseapp.com",
projectId: "campus-tour-1",
storageBucket: "campus-tour-1.appspot.com",
messagingSenderId: "693859887032",
appId: "1:693859887032:web:e3f6031813cf512485114d",
measurementId: "G-51D4T38K7H"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function dblist(){
    const querySnapshot = await getDocs(collection(db, "locations"));
    let buildings = [];
    querySnapshot.forEach((doc) => {
        buildings.push(doc.id);
    });
    return buildings;
}

    
export async function dbread(gebaeude){
    const docRef = doc(db, "locations", gebaeude);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return "No such document!";
    };
}        
</script>