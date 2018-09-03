import { User } from "../models/generic";
import { get } from "../utils/http.util";

export const authSrv = {
  findCurrentUser() {
    return get<User>('/api/auth');
  }
};
