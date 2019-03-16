import { decorate, observable, action } from 'mobx';
import db from './api/firebase';

function divideSeries(n) {
  return Math.log(Math.E, n) + 0.5772156649;
}

class Store {
  applicants = {};
  jobs = {};
  technologiesRelevant(githubId, jobId) {
    const applicant = this.applicants[githubId];
    const job = this.jobs[jobId];
    return job.technologies.filter(jobTech =>
      applicant.technologies.some(applicantTech => applicantTech.name === jobTech.name),
    );
  }
  tehnologyScore(technologies) {
    return (
      technologies.reduce((total, tech, index) => total + tech.score / (index + 1), 0) /
      divideSeries(technologies.length)
    );
  }
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
