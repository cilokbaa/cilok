import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  orderBy, 
  increment, 
  limit, 
  where,
  DocumentData
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Script, SortOption, AnalyticsSummary } from '../types';

const COLLECTION_NAME = 'scripts';

// Helper to map doc to Script type
const mapDoc = (doc: DocumentData): Script => ({
  id: doc.id,
  ...doc.data()
} as Script);

export const getAllScripts = async (sortOption: SortOption = 'newest', search?: string): Promise<Script[]> => {
  let q = query(collection(db, COLLECTION_NAME));

  // Note: Firestore searching is limited. For production, use Algolia/Typesense.
  // Here we do client-side filtering for search or basic sorting.
  
  if (sortOption === 'newest') {
    q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  } else if (sortOption === 'popular') {
    q = query(collection(db, COLLECTION_NAME), orderBy('clicks', 'desc'));
  } else if (sortOption === 'searched') {
    q = query(collection(db, COLLECTION_NAME), orderBy('searches', 'desc'));
  }

  const snapshot = await getDocs(q);
  let scripts = snapshot.docs.map(mapDoc);

  if (search) {
    const lowerSearch = search.toLowerCase();
    scripts = scripts.filter(s => 
      s.title.toLowerCase().includes(lowerSearch) || 
      s.description.toLowerCase().includes(lowerSearch)
    );
  }

  return scripts;
};

export const getLatestScripts = async (count: number = 6): Promise<Script[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDoc);
};

export const getScriptById = async (id: string): Promise<Script | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return mapDoc(docSnap);
  }
  return null;
};

export const addScript = async (data: Omit<Script, 'id' | 'views' | 'clicks' | 'searches' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    views: 0,
    clicks: 0,
    searches: 0,
    createdAt: Date.now()
  });
  return docRef.id;
};

export const updateScript = async (id: string, data: Partial<Script>): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
};

export const deleteScript = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

// Analytics Actions
export const recordView = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { views: increment(1) });
};

export const recordClick = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { clicks: increment(1) });
};

export const getAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  const scripts = snapshot.docs.map(mapDoc);

  return scripts.reduce((acc, script) => ({
    totalViews: acc.totalViews + (script.views || 0),
    totalClicks: acc.totalClicks + (script.clicks || 0),
    totalScripts: acc.totalScripts + 1
  }), { totalViews: 0, totalClicks: 0, totalScripts: 0 });
};
