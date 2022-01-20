import React from 'react';
import NavContainer from '../../components/nav-container/nav-container.component';
import { createStructuredSelector } from 'reselect';
import {
  selectListCvCurrentUser,
  selectCurrentUser,
} from './../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/button/button.component';

import ListJobSuggest from '../../components/list-job-suggest/list-job-suggest.component';

const SuggestJob = ({ listCv, user }) => {
  if (!listCv || listCv?.length === 0 || user?.role === 'employer')
    return (
      <div>
        <NavContainer>
          <div className="flex items-center justify-center flex-wrap md:space-x-2 p-4">
            <div>Tạo CV ngay để được gợi ý</div>
            <Link to="/list-cv">
              <Button text="Tạo CV ngay" />
            </Link>
          </div>
        </NavContainer>
      </div>
    );

  return (
    <NavContainer>
      <ListJobSuggest resume={listCv?.[0]} />
    </NavContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  listCv: selectListCvCurrentUser,
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(SuggestJob);
