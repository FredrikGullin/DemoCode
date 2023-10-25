import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest {
  token: string | JwtPayload;
}
