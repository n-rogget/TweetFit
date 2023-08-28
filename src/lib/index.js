import {
  // eslint-disable-next-line max-len
  signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  addDoc, collection, getDocs,
} from 'firebase/firestore';
import { db, auth } from '../firebase.js';
// Función que inicia sesión con google
const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  // const auth = getAuth(app);
  return signInWithPopup(auth, provider)
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};

// Función que crea el usuario con correo y contraseña
// eslint-disable-next-line max-len
const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// Función que inicia sesión con email y password
const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Función para crear un post
const addPost = async (name, post, date) => {
  const postsCollection = collection(db, 'posts');
  await addDoc(postsCollection, {
    name,
    post,
    date,
  });
};

// Función para mostrar todos los posts
const showPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const getPostSection = document.getElementById('post-section');
  getPostSection.innerHTML = '';
  querySnapshot.forEach((doc) => {
    const individualPost = document.createElement('article');
    individualPost.setAttribute('id', 'individual-post');
    individualPost.classList.add('individual-post');
    const post = doc.data();
    const postNameUser = document.createElement('h4');
    const postContent = document.createElement('p');
    const postDate = document.createElement('p');
    postDate.textContent = post.date;
    postNameUser.textContent = post.name;
    postContent.textContent = post.post;

    // const getLikeSection = document.querySelector('.section-like');

    getPostSection.append(individualPost);
    individualPost.append(postNameUser, postContent, postDate);
  });
};

// Función para mostrar el post del usuario

export {
  loginWithGoogle, createUser, signIn, addPost, showPosts,
};
