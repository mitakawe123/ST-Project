import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBPMzGQAGwOpTtmafmxiQYAEFYeBblotps",
	authDomain: "fitconnect-af4b6.firebaseapp.com",
	projectId: "fitconnect-af4b6",
	storageBucket: "fitconnect-af4b6.firebasestorage.app",
	messagingSenderId: "200987338404",
	appId: "1:200987338404:web:25e48db06112c40c102831",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };
