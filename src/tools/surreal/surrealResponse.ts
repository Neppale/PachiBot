export type SurrealResponse<type> = {
  time: string;
  status: string;
  result: type[];
};
