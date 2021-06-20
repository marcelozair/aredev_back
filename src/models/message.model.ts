export interface iMessage {
  id: number;
  user_id: number;
  sending_user_id: number;
  message: string;
  url: string;
  created_at: Date;
  updated_at: Date;
}