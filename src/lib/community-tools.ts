import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { DesignToolItem, INITIAL_DESIGN_TOOLS } from "@/data/design-tools";

const COLLECTION_NAME = "community_tools";
const LOCAL_STORAGE_KEY = "portfolio_community_tools";

export interface CommunityToolSubmission {
  title: string;
  url: string;
  category: string;
  thumbnail: string;
  description?: string;
  author?: string;
  date?: string;
}

/**
 * Fetch all community tools from Cloud Firestore.
 * Falls back to localStorage and curated initial tools if Firebase is not yet configured.
 */
export async function fetchCommunityTools(): Promise<DesignToolItem[]> {
  // If Firebase is configured and DB instance is active
  if (isFirebaseConfigured && db) {
    try {
      const toolsRef = collection(db, COLLECTION_NAME);
      const q = query(toolsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const firestoreTools: DesignToolItem[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Tool",
            url: data.url || "#",
            category: data.category || "Design Tool",
            thumbnail: data.thumbnail || "/tools/shadergradient-preview.png",
            description: data.description || "",
            author: data.author || "Community",
            date: data.date || "2026",
          };
        });

        // Merge with initial tools (deduplicating by URL or title)
        const firestoreUrls = new Set(firestoreTools.map((t) => t.url.toLowerCase()));
        const uniqueInitial = INITIAL_DESIGN_TOOLS.filter(
          (init) => !firestoreUrls.has(init.url.toLowerCase())
        );

        return [...firestoreTools, ...uniqueInitial];
      }
    } catch (error) {
      console.warn("Could not fetch tools from Firestore, falling back to local:", error);
    }
  }

  // Fallback: check localStorage + initial tools
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const combined = [
            ...parsed,
            ...INITIAL_DESIGN_TOOLS.filter(
              (init) => !parsed.some((p: DesignToolItem) => p.id === init.id)
            ),
          ];
          return combined;
        }
      }
    } catch {
      // Ignore localStorage parse errors
    }
  }

  return INITIAL_DESIGN_TOOLS;
}

/**
 * Submit a new community tool.
 * Persists to Firestore when configured, and caches locally.
 */
export async function submitCommunityTool(
  tool: CommunityToolSubmission
): Promise<DesignToolItem> {
  const localId = `tool-${Date.now()}`;
  const newItem: DesignToolItem = {
    ...tool,
    id: localId,
    date: tool.date || new Date().getFullYear().toString(),
  };

  // 1. Try to save to Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        title: tool.title.trim(),
        url: tool.url.trim(),
        category: tool.category.trim(),
        thumbnail: tool.thumbnail.trim(),
        description: tool.description?.trim() || "",
        author: tool.author?.trim() || "Community",
        date: tool.date || new Date().getFullYear().toString(),
        createdAt: serverTimestamp(),
        status: "approved",
      });

      newItem.id = docRef.id;
    } catch (error) {
      console.error("Firestore submission failed, keeping local fallback:", error);
    }
  }

  // 2. Cache in localStorage for immediate client responsiveness
  if (typeof window !== "undefined") {
    try {
      const userSubmissions = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([newItem, ...userSubmissions])
      );
    } catch {
      // Ignore localStorage write error
    }
  }

  return newItem;
}
