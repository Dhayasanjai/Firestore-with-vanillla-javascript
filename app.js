const form = document.getElementById('form');

const ul = document.getElementById('list');

const renderDocsHandler = (doc) => {
  const li = document.createElement('li');
  const name = document.createElement('span');
  const city = document.createElement('span');
  const deleteBtn = document.createElement('div');
  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  deleteBtn.textContent = 'X';
  city.textContent = doc.data().city;
  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    db.collection('firestore-tutorial')
      .doc(e.target.parentElement.getAttribute('data-id'))
      .delete();
  });
};

//getting data from  the firestore
// db.collection('firestore-tutorial')
//   .where('city', '==', 'valanthangottai')
//   .orderBy('name')
//   .get()
//   .then((snapShorts) => {
//     snapShorts.docs.forEach((doc) => {
//       renderDocsHandler(doc);
//     });
//   });
// sending or adding data to firestore
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('firestore-tutorial').add({
    name: form.name.value,
    city: form.city.value,
  });

  form.name.value = '';
  form.city.value = '';
});
//updating and changing for every changes (adding or removing )
db.collection('firestore-tutorial')
  .orderBy('name')
  .onSnapshot((snapShot) => {
    let changes = snapShot.docChanges();
    changes.forEach((change) => {
      if (change.type == 'added') {
        renderDocsHandler(change.doc);
      } else if (change.type === 'removed') {
        const li = document.querySelector('[data-id=' + change.doc.id + ']');
        ul.removeChild(li);
      }
    });
  });
//updating the values individually simply fires up this in any of the function when the user wanted to  change this values

// db.collection('firestore-tutorial').doc('<id of the doc>').update({
//   name: 'dhayasanjasi',
// });
//
//setting  the values of the total object it is quite similay to the above update method whereas set update all the values
// db.collection('firestore-tutorial').doc('<id of the doc>').set({
//   name: 'dhayasanjasi',
// city:'madras'
// });
