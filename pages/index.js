import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

export default function WeddingList() {
  const [gifts, setGifts] = useState([]);
  const [newGift, setNewGift] = useState("");
  const [newGiftImage, setNewGiftImage] = useState("");

  // 🔹 Récupérer les cadeaux depuis Firestore
  useEffect(() => {
    async function fetchGifts() {
      try {
        const querySnapshot = await getDocs(collection(db, "gifts"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        console.log("📢 Données récupérées depuis Firestore :", data);
        setGifts(data);
      } catch (error) {
        console.error("🔥 Erreur Firestore lors de la récupération :", error);
      }
    }
    fetchGifts();
  }, []);

  // 🔹 Ajouter un cadeau dans Firestore
  async function addGift() {
    if (!newGift) return alert("Veuillez entrer un nom de cadeau !");
    
    try {
      const docRef = await addDoc(collection(db, "gifts"), {
        name: newGift,
        image: newGiftImage, // Ajout de l'image
        reserved: false,
      });

      const newGiftObj = { id: docRef.id, name: newGift, image: newGiftImage, reserved: false };
      setGifts([...gifts, newGiftObj]);
      setNewGift("");
      setNewGiftImage("");
    } catch (error) {
      console.error("🔥 Erreur lors de l'ajout du cadeau :", error);
    }
  }

  // 🔹 Réserver un cadeau
  async function reserveGift(id) {
    try {
      const giftRef = doc(db, "gifts", id);
      await updateDoc(giftRef, { reserved: true });

      setGifts(gifts.map((gift) => (gift.id === id ? { ...gift, reserved: true } : gift)));
    } catch (error) {
      console.error("🔥 Erreur lors de la réservation du cadeau :", error);
    }
  }

  return (
    <div className="p-4 bg-[#A4C9B9] min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-center">🎁 Liste de mariage</h1>

      {/* 🔹 Formulaire pour ajouter un cadeau */}
      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          value={newGift}
          onChange={(e) => setNewGift(e.target.value)}
          placeholder="Nom du cadeau"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={newGiftImage}
          onChange={(e) => setNewGiftImage(e.target.value)}
          placeholder="URL de l'image (optionnel)"
          className="border p-2 rounded"
        />
        <button onClick={addGift} className="bg-blue-500 text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </div>

      {/* 🔹 Affichage des cadeaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gifts.map((gift) => (
          <div key={gift.id} className="p-4 bg-white rounded-lg shadow flex flex-col items-center">
            {gift.image && <img src={gift.image} alt={gift.name} className="w-32 h-32 object-cover mb-2" />}
            <p className="text-lg font-semibold">{gift.name}</p>
            {gift.reserved ? (
              <span className="text-green-500">✅ Réservé</span>
            ) : (
              <button onClick={() => reserveGift(gift.id)} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                Réserver
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


 
  