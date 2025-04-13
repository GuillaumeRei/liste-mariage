import { useEffect } from 'react';
import { db } from '../firebase'; // Assure-toi que le chemin est correct
import { collection, getDocs } from 'firebase/firestore';

const TestFirestore = () => {

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "maCollection"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Firestore</h1>
      <p>Consulte la console pour voir les résultats de la récupération de données.</p>
    </div>
  );
};

export default TestFirestore;
