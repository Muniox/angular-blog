export interface User {
  id: string;
  username: string;
  email: string;
  role: {
    id: number;
    roleType: string;
  };
}
