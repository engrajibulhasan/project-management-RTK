import { useState } from "react";
import { useSelector } from "react-redux";

export default function useAuthorization() {
    const auth = useSelector(state => state.auth);
    const [isAuthorized, setIsAuthorized] = useState(false);

    if (auth?.accessToken && auth?.user) {
        return true
    } else {
        return false
    }


}