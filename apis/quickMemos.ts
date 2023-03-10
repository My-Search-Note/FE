import axios from "axios";
import axiosConfing from "./axiosConfig";

type Memo = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
};

type MemoPaginationData = {
  memos: Memo[];
  page_count: number;
  total_count: number;
};

export function getMemos(): Promise<MemoPaginationData> {
  return axiosConfing
    .get<MemoPaginationData>(`/memos`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error("Failed to fetch memos");
    });
}

export async function addMemo(): Promise<readonly Memo[]> {
  try {
    const response = await axiosConfing.get<Memo[]>(`/memos`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch memos");
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

export async function deleteMemo(): Promise<readonly Memo[]> {
  try {
    const response = await axiosConfing.get<Memo[]>(`/memos`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch memos");
  }
}
