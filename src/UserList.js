import firebase from 'firebase';
export const UserList = () => {
  const userlist = firebase.database().ref().child("users")
  const arr = [];
  userlist.on('child_added', (snap) => {
    const { nickname, number, sex, city, profileUrl, selfIntro, age } = snap.val();
    arr.push({
      profileUrl,
      nickname,
      number,
      sex,
      selfIntro,
      age
    });
  });
    console.log('잠만보자',arr)
    return arr
};
