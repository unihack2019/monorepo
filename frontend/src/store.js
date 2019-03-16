import { decorate, observable, action } from 'mobx';
import db from './api/firebase';

function divideSeries(n) {
  return Math.log(Math.E, n) + 0.5772156649;
}

class Store {
  applicants = {};
  jobs = {};
  technologiesRelevant(applicant, job) {
    return job.technologies
      .map(jobTech => applicant.technologies.find(applicantTech => applicantTech.name === jobTech.name))
      .filter(tech => !!tech);
  }
  technologyScore(technologies = []) {
    return (
      technologies.reduce((total, tech, index) => total + tech.score / (index + 1), 0) /
      divideSeries(technologies.length)
    );
  }
}
decorate(Store, {
  applicants: observable,
  jobs: observable,
});

db.collection('applicants').onSnapshot(snapshot => {
  snapshot.forEach(
    action(doc => {
      const data = doc.data();
      data.technologies = data.technologies || [];
      console.log(data);
      store.applicants[doc.id] = data;
    }),
  );
});

db.collection('roles').onSnapshot(snapshot => {
  snapshot.forEach(
    action(doc => {
      const data = doc.data();
      data.technologies = data.technologies || [];
      console.log(`roles ${doc.id}`, data);
      store.jobs[doc.id] = data;
    }),
  );
});

const store = new Store();
export default store;
