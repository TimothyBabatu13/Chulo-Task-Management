import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export interface AuthContextType {
    id : string | null,
    setId: Dispatch<SetStateAction<string|null>>,
    user?: User | null
}