import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { DollarSign, Calendar, Award } from 'lucide-react';

export default function EmpSalary() {
  const [salaryData, setSalaryData] = useState({
    base_salary: 0,
    commission: 0,
    total_earned: 0,
    this_month: 0
  });

  useEffect(() => {
    fetchSalary();
  }, []);

  const fetchSalary = async () => {
    // Demo data - sau này sẽ lấy theo employee_id từ localStorage
    setSalaryData({
      base_salary: 8000000,
      commission: 2450000,
      total_earned: 10450000,
      this_month: 3200000
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-3">
        <DollarSign className="w-8 h-8" />
        Lương & Thưởng
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lương cơ bản */}
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Lương cơ bản</p>
              <p className="text-4xl font-bold text-purple-700 mt-2">
                {salaryData.base_salary.toLocaleString('vi-VN')}đ
              </p>
            </div>
            <Award className="w-12 h-12 text-purple-300" />
          </div>
        </div>

        {/* Hoa hồng tháng này */}
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Hoa hồng tháng này</p>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {salaryData.this_month.toLocaleString('vi-VN')}đ
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-green-400" />
          </div>
        </div>
      </div>

      {/* Tổng thu nhập */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-3xl p-8 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-purple-200">Tổng thu nhập</p>
            <p className="text-5xl font-bold mt-2">
              {salaryData.total_earned.toLocaleString('vi-VN')}đ
            </p>
          </div>
          <div className="text-right">
            <Calendar className="w-10 h-10 opacity-70" />
            <p className="text-sm opacity-70 mt-1">Tháng này</p>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-400">
        Bảng lương chi tiết sẽ được cập nhật theo từng ca làm
      </div>
    </div>
  );
}