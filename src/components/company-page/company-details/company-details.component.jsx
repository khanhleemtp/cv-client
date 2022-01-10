import { useEffect } from 'react';
import {
  GlobeIcon,
  OfficeBuildingIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';

import { Link } from 'react-router-dom';
import Button from './../../button/button.component';
import EditorPreview from './../../editor-preview/editor-preview.component';
import { loadCompanyStart } from '../../../redux/company/company.action';
import { createStructuredSelector } from 'reselect';
import {
  selectCompany,
  selectSingleLoadingCompany,
} from '../../../redux/company/company.selectors';
import { connect } from 'react-redux';

const CompanyDetails = ({ loadCompany, company, ...props }) => {
  console.log(props?.match.params.companyId);

  let companyId = props?.match?.params?.companyId;

  useEffect(() => {
    loadCompany(companyId);
    return () => {};
  }, [companyId, loadCompany]);

  return (
    <div className="container mx-auto max-w-6xl">
      {/* Cover */}
      <div className="h-80 bg-white relative flex items-end p-4">
        <img
          src={company?.logo}
          alt="cover"
          className="h-1/3 md:h-full w-full object-cover absolute inset-0"
        />
        <div className="items-end relative w-full flex flex-wrap space-y-1 md:space-y-4 md:space-x-2">
          <div className="p-1 rounded-lg bg-white shadow-lg ring-1">
            <img
              src={company?.logo}
              alt="cover"
              className="object-contain h-32 w-32"
            />
          </div>
          <div className="bg-white text-gray-600 p-4 md:space-y-4 flex-grow truncate">
            <div className="font-medium text-lg md:text-2xl truncate">
              {company?.name}
            </div>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
              <div className="flex items-center space-x-2">
                <GlobeIcon className="w-6 h-6" />
                <Link
                  to={{ pathname: 'http://cmcglobal.com.vn' }}
                  target="_blank"
                >
                  {company?.website}
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <OfficeBuildingIcon className="w-6 h-6" />
                <div> {company?.size} nhân viên</div>
              </div>
              <div></div>
            </div>
          </div>
          <div className="">
            <Button text="Theo dõi công ty" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 my-2 gap-2">
        <div className="col-span-6 md:col-span-4 bg-white p-6 space-y-4">
          <div className="divide-x-4 flex divide-indigo-400">
            <div className=""></div>
            <div className="pl-3 text-xl">Giới thiệu công ty</div>
          </div>

          <EditorPreview element={company?.descriptions} />
        </div>
        <div className="col-span-6 md:col-span-2 bg-white p-6">
          <div className="divide-x-4 flex divide-indigo-400">
            <div className=""></div>
            <div className="pl-3 text-xl">Địa chỉ</div>
          </div>
          {company?.address?.map((add) => (
            <div className="flex items-center space-x-2 mt-2">
              <LocationMarkerIcon className="w-8 h-8" />
              <div>{add}</div>
            </div>
          ))}
          <div className="divide-x-4 flex divide-indigo-400 my-2">
            <div className=""></div>
            <div className="pl-3 text-xl">Khu vực</div>
          </div>
          <div className="flex space-x-2 my-2 cursor-pointer">
            {company?.area?.map((add) => (
              <div className="p-2 bg-gray-200 rounded-full truncate">
                <div>{add}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-6 md:col-span-4 bg-white p-6 space-y-4">
          <div className="divide-x-4 flex divide-indigo-400">
            <div className=""></div>
            <div className="pl-3 text-xl">Tuyển dụng</div>
          </div>
          <div>
            Bibabo là hệ sinh thái giáo dục tiên phong tại Việt Nam, đồng hành
            cùng con từ khi còn là một bào thai đến khi con vững bước trưởng
            thành. Được thành lập từ năm 2015, Bibabo đã có những bước chuyển
            mình mạnh mẽ, trở thành nền tảng mua sắm dạng mạng xã hội dành riêng
            cho Mẹ & Bé với kho thông tin, kiến thức khổng lồ chính xác - dễ tra
            cứu. Đồng thời tại Bibabo, mẹ sẽ có những trải nghiệm mua sắm online
            tuyệt vời dễ dàng, tiện lợi. Hệ sinh thái bao gồm: -Nền tảng giáo
            dục trực tuyến: giúp các mẹ vững tin hơn trên hành trình đồng hành
            cùng con nhờ những kiến thức bổ ích đến từ các khóa học trực tuyến,
            điển hình như: "Thai Giáo 280 ngày yêu thương", "Giáo dục sớm cho
            trẻ từ 0-12 tháng", "Chinh phục tiếng Anh", "Cùng con học Toán",
            v/v. -Mua sắm: Trải nghiệm mua sắm tại gian hàng chính hãng của
            Bibabo trên ứng dụng online và hệ thống cửa hàng offline. Đặc biệt,
            Bibabo đã hợp tác với các nhà sản xuất có kinh nghiệm lâu năm nghiên
            cứu và phát triển thành công các thương hiệu dành riêng cho mẹ bầu
            như: Mỹ phẩm dành cho mẹ bầu Lagumi; thời trang bầu Lynafa và máy
            hút sữa Rozabi -Cộng đồng: Khám phá cộng đồng Mẹ & Bé qua tâm sự,
            chia sẻ kinh nghiệm làm mẹ, kết nối tư vấn giải đáp cùng các chuyên
            gia, và có trải nghiệm mua sắm dễ dàng hơn. Hiện nay, Bibabo có gần
            4 triệu thành viên hoạt động trên 63 tỉnh thành, 1 bang tại Mỹ và là
            nền tảng lớn tại Việt Nam cung cấp dịch vụ này. Với tư tưởng không
            ngừng học hỏi, sáng tạo, Bibabo định hướng trở thành nền tảng mua
            sắm dạng mạng xã hội - Social Commerce đa quốc gia với hơn 10 triệu
            người dùng tại Việt Nam và hướng tới người dùng trên thế giới.
            Bibabo mong muốn sẽ là lựa chọn tốt nhất cho mọi gia đình! Hãy cùng
            chúng tôi trải nghiệm Bibabo: Website: https://edu.bibabo.vn/ App:
            Bibabo 20
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadCompany: (id) => dispatch(loadCompanyStart(id)),
});

const mapStateToProps = createStructuredSelector({
  company: selectCompany,
  loading: selectSingleLoadingCompany,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
