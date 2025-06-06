import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const userStore = create(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token) => set({ token }),

      user: null,
      setUser: (user) => set({ user }),

      watchlist: [],
      setWatchList: (watchlist) => set({ watchlist }),
      addToWatchList: (anime) =>
        set((state) => ({ watchlist: [...state.watchlist, anime] })),

      deleteFromWatchList: async (id) => {
        const { token } = get();
        const res = await fetch(`/api/watchlist/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
          watchlist: state.watchlist.filter((anime) => anime._id !== id),
        }));
        return { success: true, message: data.message };
      },

      updateAnime: async (id, updatedAnime) => {
        const { token } = get();
        const temp = await fetch(
          `https://api.jikan.moe/v4/anime?q=${updatedAnime.title}&limit=1`
        );
        const tempdata = await temp.json();
        const imageUrl = tempdata.data[0].images.jpg.image_url;
        const addImage = { ...updatedAnime, image: imageUrl };

        const res = await fetch(`/api/watchlist/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addImage),
        });

        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
          watchlist: state.watchlist.map((anime) =>
            anime._id === id ? data.data : anime
          ),
        }));
      },

      addAnimeSearch: async (id, anime) => {
        const { token } = get();
        const animeData = {
          title: anime.title_english || anime.title,
          status: 'Planning to Watch',
          episodewatched: 1,
          image: anime.images.jpg.image_url,
        };

        const res = await fetch('/api/watchlist', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(animeData),
        });

        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
          watchlist: [...state.watchlist, data.data],
        }));
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ token: state.token, user: state.user, watchlist: state.watchlist }),
    }
  )
);

export default userStore;
