import axios from "axios";
import { AxiosResponse } from "axios";
import axiosConfing from "./axiosConfig";

interface MemoContent {
  title: string;
  content: string;
}

interface Memo extends MemoContent {
  id: number;
  user_id: number;
  created_at: string;
}

interface MemoPaginationData {
  memos: Memo[];
  page_count: number;
  total_count: number;
}

export const getMemos = async (
  pageNumber?: number
): Promise<MemoPaginationData> => {
  return axiosConfing
    .get<MemoPaginationData>(`/memos?page=${pageNumber}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error("Failed to fetch memos");
    });
};

export async function addMemo(memo: MemoContent): Promise<MemoContent> {
  try {
    const response = await axiosConfing.post<MemoContent>("/memos", memo);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add memo");
  }
}

export async function searchMemo(
  searchQuery: string,
  pageNumber?: number
): Promise<MemoPaginationData> {
  try {
    const response = await axiosConfing.get<MemoPaginationData>(
      `/memos/search?keyword=${searchQuery}&page=${pageNumber}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add memo");
  }
}

export async function editMemo(): Promise<readonly Memo[]> {
  try {
    const response = await axiosConfing.get<Memo[]>(`/memos`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch memos");
  }
}

export async function deleteMemo(memoId: number): Promise<AxiosResponse> {
  try {
    const response = await axiosConfing.delete(`/memos/${memoId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch memos");
  }
}
