import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import axiosConfing from "./axiosConfig";

//헤더 자동으로 보내주는 거

type Memo = {
  id: number;
  title: string;
  content: string;
  user_id: number;
};

export function getMemos(): Promise<readonly Memo[]> {
  return axiosConfing
    .get<Memo[]>(`/memos`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
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
