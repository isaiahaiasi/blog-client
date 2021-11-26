import { createContext } from 'react';

interface FetchedDataInterface {
  blogs: BlogData[];
}

export const FetchedDataContext = createContext<FetchedDataInterface>({
  blogs: [],
});
