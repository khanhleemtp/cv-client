const EmailCheckList = ({
  lists = [
    {
      title: 'Email thông báo hệ thống',
      checkedLists: [
        'Cập nhật quan trọng',
        'Thông báo nhà tuyển dụng xem CV',
        'Thông báo tính năng mới từ hệ thống',
        'Thông báo khác từ hệ thống',
      ],
    },
    {
      title: 'Email nhận cơ hội việc làm',
      checkedLists: [
        'Thông báo việc làm phù hợp',
        'Thông báo NTD gửi lời phỏng vấn/ Ứng tuyển',
      ],
    },
  ],
}) => {
  return (
    <ol className="list-decimal px-4">
      {lists?.map((item) => (
        <li key={item?.title}>
          <p className="text-lg">{item?.title}</p>
          {item?.checkedLists.map((i) => (
            <label className="flex my-2 items-center" key={i}>
              <input type="checkbox" className="mr-1 form-checkbox" />
              {i}
            </label>
          ))}
        </li>
      ))}
    </ol>
  );
};

export default EmailCheckList;
