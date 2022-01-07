import { useMemo, Suspense } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import SettingIcon from './setting-icon.component';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';
import LoadingSmall from './../../loading-small/loading-small.component';

const AccountCompany = lazy(() =>
  pMinDelay(import('./account-company.component'))
);

const AccountInfo = lazy(() => pMinDelay(import('./account-info.component')));

const AccountPassword = lazy(() =>
  pMinDelay(import('./account-password.component'))
);

const AccountSetting = () => {
  const location = useLocation();
  let arr = location?.pathname?.split('/');

  let params = arr?.[arr.length - 1];

  const SettingComponent = useMemo(() => {
    switch (params) {
      case 'company':
        return AccountCompany;
      case 'info':
        return AccountInfo;
      case 'password':
        return AccountPassword;
      default:
        return null;
    }
  }, [params]);

  const title = useMemo(() => {
    switch (params) {
      case 'company':
        return 'Thông tin công ty';
      case 'info':
        return 'Cập nhật thông tin cá nhân';
      case 'password':
        return 'Đổi mật khẩu';
      default:
        return null;
    }
  }, [params]);

  if (params === 'setting') return <Redirect to="/company/setting/info" />;

  return (
    <div className="flex bg-white p-4 flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-2">
      <div className="max-w-xs flex-grow space-y-4 p-2">
        <SettingIcon
          icon="lock"
          text="Đổi mật khẩu"
          url={`/company/setting/password`}
          active={'password' === params}
        />
        <SettingIcon
          icon="user"
          text="Thông tin cá nhân"
          url={`/company/setting/info`}
          active={'info' === params}
        />
        <SettingIcon
          icon="company"
          text="Thông tin công ty"
          url={`/company/setting/company`}
          active={'company' === params}
        />
      </div>

      <div className="flex-grow px-4">
        <div className="my-2 font-medium">{title}</div>
        <Suspense fallback={<LoadingSmall />}>
          {SettingComponent && <SettingComponent />}
        </Suspense>
      </div>
    </div>
  );
};

export default AccountSetting;
