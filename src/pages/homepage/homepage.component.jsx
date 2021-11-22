import React from 'react';
import NavContainer from './../../components/nav-container/nav-container.component';
import { AcademicCapIcon } from '@heroicons/react/solid';
import JobCard from '../../components/job-card/job-card.component';
import postsData from './posts';
import styles from './homepage.module.css';
import Button from '../../components/button/button.component';

const Homepage = () => {
  return (
    <NavContainer>
      <div>
        <h2>Homepage</h2>

        <div>
          <main className={styles.section}>
            <section className={styles.containerList}>
              <div className={styles.layout}>
                {postsData.map((element, index) => (
                  <JobCard
                    key={index}
                    title={element.title}
                    likes={element.likes}
                    order={index + 1}
                    image={element.image}
                  />
                ))}
              </div>
            </section>
          </main>

          <Button onClick={() => console.log('Hello')} text="LD Khánh" margin />
          <Button
            text="LD Khánh"
            margin
            type="outline"
            leftIcon={AcademicCapIcon}
          />
          <Button
            text="LD Khánh"
            margin
            size="small"
            rightIcon={AcademicCapIcon}
          />
          <Button text="LD Khánh" margin size="large" icon={AcademicCapIcon} />
          <Button icon={AcademicCapIcon} />
          <Button text="LD Khánh" margin type="link" />
        </div>
        <div className="p-4">
          <Button text="LD Khánh" full />
        </div>
      </div>
    </NavContainer>
  );
};

export default Homepage;
