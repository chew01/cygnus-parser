import jobs from '../constants/job';
import expEarned from '../constants/exp';

export function convertJobs(jobId: number, jobDetail: number) {
  const fullJobId = `${jobId}${jobDetail}`;
  return jobs[fullJobId];
}

export function convertExpPercentage(level: number, exp: bigint): number {
  if (level === 300) return 0;
  const levelDifference = expEarned[level + 1] - expEarned[level];
  const percentageBigint = (BigInt(exp) * BigInt(100000)) / levelDifference;
  return Number(percentageBigint) / 100000;
}
