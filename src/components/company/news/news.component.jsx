import React from 'react';
import LineChart from '../../line-chart/line-char.component';
import CvCard from '../cv-card/cv-card.component.component';
// import { useForm, useWatch } from 'react-hook-form';
// import AppEditor from './../../editor/editor.component';
// import EditorPreview from '../../editor-preview/editor-preview.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../../redux/user/user.selectors';
import { connect } from 'react-redux';

const News = ({ user }) => {
  // const { handleSubmit, control } = useForm({
  //   mode: 'onChange',
  //   defaultValues: {
  //     content: '',
  //   },
  // });

  // const handleSubmitOnClick = (data) => {
  //   alert(JSON.stringify(data));
  // };

  // const abc = useWatch({ control, name: 'content' });
  return (
    <div className="flex flex-col md:flex-row">
      <div className="bg-white p-4 max-w-2xl flex-grow">
        <div className="font-medium text-lg">Hiệu quả tuyển dụng</div>
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-2xl gap-4 my-4">
          <CvCard title="Chiến dịch đang mở" icon="flag" count={1} bg="1" />
          <CvCard title="Cv tiếp nhận" icon="add" count={1} bg="2" />
          <CvCard
            title="Tin tuyển dụng hiển thị"
            icon="report"
            count={1}
            bg="3"
          />
          <CvCard title="CV ứng tuyển mới" icon="text" count={1} bg="0" />
        </div>
        {/* <form onSubmit={handleSubmit(handleSubmitOnClick)}>
        <AppEditor control={control} name="content" />
        <button type="submit">Submit</button>
      </form> */}
        {/* <EditorPreview element={abc} /> */}
        <LineChart />
      </div>
      <div className="bg-white shadow-sm flex-grow h-40 my-2 md:mx-2 md:my-0 p-4 bg-none md:bg-resume-img bg-right bg-cover bg-no-repeat">
        <div className="font-medium">Xin chào, {user?.name} 😁</div>
        <div>
          <div>Mã NTD: {user?.id} </div>
          <div>Email: {user?.email}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(News);
