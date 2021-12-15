import { connect } from 'react-redux';
import NavContainer from '../../components/nav-container/nav-container.component';
import { createStructuredSelector } from 'reselect';
import { selectUserResumes } from '../../redux/user/user.selectors';
import Button from './../../components/button/button.component';
import {
  StarIcon,
  EyeIcon,
  DownloadIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/solid';
import moment from 'moment';
import PDFViewer from './../../components/pdf-preview/pdf-preview.component';
import CvPdfTemplate from './../../components/CvBuilderPdf/CvPdfTemplate';
import TitlImage from '../../components/tilt-image/tilt-image.component';

const CvListPage = ({ cvs }) => {
  return (
    <NavContainer>
      <div className="container mx-auto max-w-4xl">
        <div className="py-6 text-xl">Chào mừng 🚀 LD Khánh đã trở lại 😃 </div>
        {cvs?.length === 0 ? (
          <div>Bạn chưa có CV nào</div>
        ) : (
          cvs?.map((cv) => (
            <div
              key={cv._id}
              className="bg-white px-6 py-8 flex justify-around items-center flex-wrap shadow-2xl"
            >
              <div className="hidden md:block">
                <TitlImage>
                  <div className="w-40 h-full flex items-center justify-center cursor-pointer">
                    {cv && (
                      <PDFViewer>
                        <CvPdfTemplate
                          sections={cv?.sections}
                          header={cv?.header}
                          style={cv?.style}
                          title={cv?.title}
                        />
                      </PDFViewer>
                    )}
                  </div>
                </TitlImage>
              </div>
              <div className="flex flex-col max-w-lg">
                <div className="flex justify-between items-center md:my-4 mx-4">
                  <div className="text-indigo-500 font-semibold text-lg">
                    {cv.title}
                  </div>
                  <div className="text-sm">
                    {moment(cv?.updatedAt).format('HH:SS-DD/MM/YYYY')}
                  </div>
                </div>

                <div className="flex">
                  <div className="flex items-center flex-wrap">
                    <Button
                      text="Đặt CV chính"
                      leftIcon={StarIcon}
                      size="small"
                      className="bg-gray-200 text-gray-500 hover:bg-gray-300 m-1"
                    />
                    <Button
                      text="Xem thử"
                      leftIcon={EyeIcon}
                      size="small"
                      className="bg-gray-200 text-gray-500 hover:bg-gray-300 m-1"
                    />
                    <Button
                      text="Tải xuống"
                      leftIcon={DownloadIcon}
                      size="small"
                      className="bg-gray-200 text-gray-500 hover:bg-gray-300 m-1"
                    />
                    <Button
                      text="Sửa"
                      leftIcon={PencilIcon}
                      size="small"
                      className="bg-gray-200 text-gray-500 hover:bg-gray-300 m-1"
                    />
                    <Button
                      text="Xóa"
                      leftIcon={TrashIcon}
                      size="small"
                      className="bg-gray-200 text-gray-500 hover:bg-gray-300 m-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </NavContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cvs: selectUserResumes,
});

export default connect(mapStateToProps)(CvListPage);
