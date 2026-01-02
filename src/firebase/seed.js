import { db } from './config';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { restaurants } from '../data/dummyData';

export const seedDatabase = async () => {
    try {
        // Check if data already exists to avoid duplicates
        const querySnapshot = await getDocs(collection(db, 'restaurants'));
        if (!querySnapshot.empty) {
            console.log('Database already seeded');
            return;
        }

        console.log('Seeding database...');
        for (const restaurant of restaurants) {
            // Remove the hardcoded 'id' if you want Firestore to generate its own, 
            // but for easier reference in this app we might want to keep it or use it as doc ID.
            const { id, ...restData } = restaurant;
            await addDoc(collection(db, 'restaurants'), {
                ...restData,
                originalId: id // Keep original ID reference
            });
        }
        console.log('Seeding complete!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Also seed promos if needed
export const seedPromos = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'promos'));
        if (!querySnapshot.empty) return;

        await addDoc(collection(db, 'promos'), {
            code: 'FK1313',
            discountType: 'percentage',
            value: 0.5,
            maxDiscount: 13,
            description: '13.13 Mega Sale 50% Off'
        });
    } catch (error) {
        console.error('Error seeding promos:', error);
    }
};
