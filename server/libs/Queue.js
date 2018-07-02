import kue from 'kue-scheduler';
import configs from '../config'
import {emitToAllPlayers, emitToSocketID} from "../socket";

let instance = null;

export default class Queue {
  constructor() {
    this.time = Date.now();
    this.queue = kue.createQueue(configs.kue);
  }

  initUI() {
    // queue = kue.createQueue(kueConfigs);
    this.queueUI = kue.app;
    this.queueUI.set('title', 'Kue Service');
    this.queueUI.listen(configs.kueUI.port, function () {
      console.log('Queue listening on port:', configs.kueUI.port);
    });

    this.queue.process('emit', 10, async (job, done) => {
      try {
        let to = job.data.to;
        if (to) {
          emitToSocketID(to, job.data.event, job.data.data);
        } else {
          emitToAllPlayers(job.data.event, job.data.data);
        }

        return done(null);
      } catch (err) {
        console.log('err on job emit:', err);
        return done(err);
      }
    });
  }

  static getInstance() {
    if (!instance) {
      instance = new Queue();
    }
    return instance;
  }

  getTime() {
    return this.time;
  }

  getQueue() {
    return this.queue;
  }

  pushJob(jobTitle, data) {
    this.queue.create(jobTitle, data).removeOnComplete(true).save();
  }
}
