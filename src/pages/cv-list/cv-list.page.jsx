import { useEffect } from 'react';
import { connect } from 'react-redux';
import NavContainer from '../../components/nav-container/nav-container.component';
import { createStructuredSelector } from 'reselect';
import Button from './../../components/button/button.component';
import {
  EyeIcon,
  DownloadIcon,
  TrashIcon,
  PencilIcon,
  PlusSmIcon,
  ShareIcon,
} from '@heroicons/react/solid';
import moment from 'moment';
import PDFViewer from './../../components/pdf-preview/pdf-preview.component';
import CvPdfTemplate from './../../components/CvBuilderPdf/CvPdfTemplate';
import TitlImage from '../../components/tilt-image/tilt-image.component';
import { Link } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  selectListCvData,
  selectLoadingApi,
} from './../../redux/cv/cv.selectors';
import {
  loadListCvStart,
  deleteCvStart,
  createCvStart,
} from './../../redux/cv/cv.action';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import Loading from './../../components/loading/loading.component';

const CvListPage = ({ listCv, isLoading, loadListCv, deleteCv, createCv }) => {
  useEffect(() => {
    loadListCv();
  }, [loadListCv]);

  return isLoading ? (
    <Loading />
  ) : (
    <NavContainer>
      <div>
        <div className="text-sm md:text-lg bg-white rounded-b-2xl p-2 text-center flex items-center justify-between container mx-auto max-w-4xl mb-2">
          Chào mừng 🚀 bạn đã trở lại 😃
          <div className="flex justify-end">
            <Button
              text="Thêm CV"
              leftIcon={PlusSmIcon}
              size="small"
              className="my-2"
              onClick={createCv}
            />
          </div>
        </div>
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-8/12 md:mr-4">
            {listCv?.length === 0 ? (
              <div>Bạn chưa có CV nào</div>
            ) : (
              listCv?.map((cv) => (
                <div
                  key={cv._id}
                  className="bg-white p-2 md:px-6 md:py-8 flex justify-between items-center  shadow-inner mb-2 md:mb-4"
                >
                  <Link
                    to={`/builder/${cv?._id}`}
                    className="md:mr-6"
                    title="Sửa CV"
                  >
                    <TitlImage>
                      <div className="w-28 md:w-40 h-full flex items-center justify-center cursor-pointer">
                        {cv && (
                          <PDFViewer isOnePage>
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
                  </Link>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center my-4 md:my-8 mx-4">
                      <div className="text-indigo-500 font-semibold text-lg">
                        {cv.title}
                      </div>
                      <div className="text-sm">
                        {moment(cv?.updatedAt).format('HH:mm-DD/MM/YYYY')}
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex items-center flex-wrap">
                        <Link to={`/preview/${cv?._id}`}>
                          <Button
                            text="Xem thử"
                            leftIcon={EyeIcon}
                            size="small"
                            className="bg-gray-200 text-gray-500 hover:bg-gray-300 m-1"
                          />
                        </Link>

                        <PDFDownloadLink
                          document={
                            <CvPdfTemplate
                              sections={cv?.sections}
                              header={cv?.header}
                              style={cv?.style}
                              title={cv?.title}
                            />
                          }
                          fileName={`${cv?.title}.ld-cv.pdf`}
                        >
                          <Button
                            text="Đang tải"
                            leftIcon={DownloadIcon}
                            size="small"
                            className="bg-gray-200 text-gray-500 hover:bg-gray-300 m-1"
                          />
                        </PDFDownloadLink>
                        <CopyToClipboard
                          text={`${process.env.REACT_APP_STATIC}/preview/${cv?.id}`}
                          onCopy={() => toast.success('Sao chép thành công')}
                        >
                          <Button
                            text="Chia sẻ"
                            leftIcon={ShareIcon}
                            size="small"
                            className="bg-gray-200 text-gray-500 hover:bg-gray-300 m-1"
                          />
                        </CopyToClipboard>
                        <Link to={`/builder/${cv?._id}`}>
                          <Button
                            text="Sửa"
                            leftIcon={PencilIcon}
                            size="small"
                            className="bg-gray-200 text-gray-500 hover:bg-gray-300 m-1"
                          />
                        </Link>
                        <Button
                          text="Xóa"
                          leftIcon={TrashIcon}
                          size="small"
                          className="bg-gray-200 text-gray-500 hover:bg-gray-300 m-1"
                          onClick={() => deleteCv(cv?._id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="w-full md:w-4/12 bg-white rounded-sm shadow-lg">
            <div className="text-center">Hello World</div>
          </div>
        </div>
      </div>
    </NavContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  listCv: selectListCvData,
  isLoading: selectLoadingApi,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadListCv: () => dispatch(loadListCvStart()),
  deleteCv: (id) => dispatch(deleteCvStart(id)),
  createCv: () => dispatch(createCvStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CvListPage);
