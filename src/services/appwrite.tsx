import { Client, Databases, ID, Query } from "appwrite";
import type { IAppwriteTopMovie, IMovie } from "../interface/Movie";
import { transformGetAppwriteMovies } from "../transformers/movie-transformer";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const BASE_URL = import.meta.env.VITE_APPWRITE_BASE_URL;

const client = new Client().setEndpoint(BASE_URL).setProject(PROJECT_ID);
const database = new Databases(client);

export const updateSearchCount = async (searchTerm: string, movie: IMovie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("search_term", searchTerm),
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        search_term: searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {}
};

export const getTrendingMovies = async (): Promise<
  IAppwriteTopMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return transformGetAppwriteMovies(result.documents);
  } catch (error) {}
};
