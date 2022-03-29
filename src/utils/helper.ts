import jobs from '../constants/job';

function convertJobs(jobId: number, jobDetail: number) {
  const fullJobId = `${jobId}${jobDetail}`;
  return jobs[fullJobId];
}

export default convertJobs;
