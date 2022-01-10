import React from 'react';
import NavContainer from './../../components/nav-container/nav-container.component';
import JobCard from '../../components/job-card/job-card.component';
import postsData from './posts';

const Homepage = () => {
  return (
    <NavContainer>
      <h2>Homepage</h2>

      <div className="container mx-auto max-w-5xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {postsData.map((element, index) => (
            <JobCard key={index} />
          ))}
        </div>
      </div>
    </NavContainer>
  );
};

export default Homepage;
