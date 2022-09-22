import { config } from "./config/config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const _app = initializeApp(config);
const db = getFirestore(_app);

export {
    db
}