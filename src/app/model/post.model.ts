// TODO: check optional types
export interface Post {
  title: string;
  description: string;
  img?: string; //only get form api
  createdAt?: Date; //only get form api
  updatedAt?: Date; //only get form api
  category: string;
  user?: {
    username: string;
    role: {
      roleType: string;
    };
  }; //only get form api
}

export interface CreatePost {
  file: string;
  title: string;
  description: string;
  category: string;
}
