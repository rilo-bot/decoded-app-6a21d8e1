import { create } from 'zustand';
import { toast } from 'sonner';
import { apiUrl } from '@/lib/api';
import type { ContactSubmission } from '@/types/contact';

interface ContactState {
  submissions: ContactSubmission[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
  addSubmission: (data: Omit<ContactSubmission, 'id' | 'createdAt'>) => Promise<void>;
  clearSubmissions: () => void;
  fetchContacts: () => Promise<void>;
}

export const useContactStore = create<ContactState>()(
  (set, get) => ({
    submissions: [],
    loading: false,
    error: null,
    loaded: false,

    addSubmission: async (data) => {
      try {
        const res = await fetch(apiUrl('/api/contacts'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const submission: ContactSubmission = await res.json();
        set((state) => ({ submissions: [...state.submissions, submission] }));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to submit contact';
        set({ error: message });
        toast.error(message);
      }
    },

    clearSubmissions: () => set({ submissions: [] }),

    fetchContacts: async () => {
      if (get().loading || get().loaded) return;
      set({ loading: true, error: null });
      try {
        const res = await fetch(apiUrl('/api/contacts'));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const submissions = await res.json();
        set({ submissions, loading: false, loaded: true });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load contacts';
        set({ loading: false, error: message });
        toast.error(message);
      }
    },
  })
);