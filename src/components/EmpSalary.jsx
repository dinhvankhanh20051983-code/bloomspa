function EmpSalary({ user }) {
  const salary = 8000000;
  const commission = 1200000;
  const total = salary + commission;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">💰 Lương & Thưởng</h2>
      <div className="bg-white rounded-3xl p-8 shadow">
        <div className="flex justify-between mb-8">
          <div>Lương cứng</div>
          <div className="font-semibold">{salary.toLocaleString('vi-VN')}đ</div>
        </div>
        <div className="flex justify-between mb-8">
          <div>Thưởng hoa hồng</div>
          <div className="font-semibold text-green-600">+{commission.toLocaleString('vi-VN')}đ</div>
        </div>
        <div className="border-t pt-8 flex justify-between text-xl font-bold">
          <div>Tổng thực nhận</div>
          <div className="text-[#7c5cbf]">{total.toLocaleString('vi-VN')}đ</div>
        </div>
      </div>
    </div>
  );
}

export default EmpSalary;