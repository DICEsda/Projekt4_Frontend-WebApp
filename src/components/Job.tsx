// src/components/JobList.tsx
import { Link } from 'react-router-dom';
export interface Job {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
  }

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <div className="w-full rounded-lg border-2 border-gray-200 p-5">
      <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl lg:text-4xl text-accent">
        Your Jobs
      </h2>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Link 
              key={job.id} 
              to={`/jobs/${job.id}`}
              className="block hover:bg-gray-100 transition-colors duration-200 rounded-lg p-3"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  {job.startDate} - {job.endDate || 'Present'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}