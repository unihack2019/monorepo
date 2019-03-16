import { decorate, observable, action } from 'mobx';
import db from './api/firebase';

class Store {
  applicants = {};
}
decorate(Store, {
  applicants: observable,
});

db.collection('applicants').onSnapshot(snapshot => {
  snapshot.forEach(
    action(doc => {
      const data = doc.data();
      console.log(data);
      store.applicants[doc.id] = data;
    }),
  );
});

const store = new Store();
export default store;
