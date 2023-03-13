export interface MemoContent {
  title: string;
  content: string;
}

export interface Memo extends MemoContent {
  id: number;
  user_id: number;
  created_at: string;
}

export interface MemoPaginationData {
  memos: Memo[];
  page_count: number;
  total_count: number;
}
