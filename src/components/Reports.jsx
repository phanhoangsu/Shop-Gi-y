/**
 * Logic chính:
 * 1. Quản lý state:
 *    - dateRange: Khoảng thời gian báo cáo (7/30/365 ngày)
 * 
 * 2. Xử lý dữ liệu:
 *    - Lọc dữ liệu theo dateRange
 *    - Tính toán doanh thu theo ngày
 *    - Tính toán doanh thu theo danh mục
 *    - Tính các chỉ số KPI:
 *      + Tổng doanh thu
 *      + Tổng đơn hàng
 *      + Khách hàng mới
 *      + Tỷ lệ chuyển đổi
 * 
 * 3. Xuất báo cáo:
 *    - Format dữ liệu sang CSV
 *    - Tạo file và download
 */
import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaDownload, FaCalendar } from "react-icons/fa";

const Reports = ({ orders, customers }) => {
  // State quản lý khoảng thời gian
  const [dateRange, setDateRange] = useState("week");

  /**
   * Format số tiền sang định dạng tiền tệ USD
   */
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  /**
   * Lọc dữ liệu theo khoảng thời gian đã chọn
   * Hỗ trợ: tuần (7), tháng (30), năm (365)
   */
  const filterDataByRange = (data) => {
    const now = new Date();
    let days;
    switch (dateRange) {
      case "week":
        days = 7;
        break;
      case "month":
        days = 30;
        break;
      case "year":
        days = 365;
        break;
      default:
        days = 7;
    }
    const startDate = new Date(now.setDate(now.getDate() - days));
    return data.filter((item) => new Date(item.date) >= startDate);
  };

  // Xử lý dữ liệu doanh thu và đơn hàng theo ngày
  const filteredOrders = filterDataByRange(orders);
  const salesData = filteredOrders.reduce((acc, order) => {
    const date = new Date(order.date).toLocaleDateString("en-US", {
      weekday: "short",
    });
    const existing = acc.find((item) => item.name === date);
    if (existing) {
      existing.sales += order.total;
      existing.orders += 1;
    } else {
      acc.push({ name: date, sales: order.total, orders: 1 });
    }
    return acc;
  }, []);

  // Xử lý dữ liệu doanh thu theo danh mục
  const categoryData = filteredOrders.reduce((acc, order) => {
    order.cartItems.forEach((item) => {
      const category = item.category || "Không xác định";
      const existing = acc.find((c) => c.name === category);
      if (existing) {
        existing.value += item.quantity * item.price;
      } else {
        acc.push({ name: category, value: item.quantity * item.price });
      }
    });
    return acc;
  }, []);

  // Màu sắc cho biểu đồ tròn
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Tính toán các chỉ số thống kê tổng quan
  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );
  const totalOrders = filteredOrders.length;
  const newCustomers = customers.filter(
    (c) =>
      new Date(c.joinDate) >=
      new Date(new Date().setDate(new Date().getDate() - 7))
  ).length;
  const conversionRate = totalOrders / (customers.length || 1);

  /**
   * Xuất dữ liệu báo cáo dạng CSV
   * Bao gồm: thống kê tổng quan, dữ liệu theo ngày và theo danh mục
   */
  const downloadReport = () => {
    const csvContent = [
      ["Thống kê", "Giá trị"],
      ["Tổng doanh thu", formatCurrency(totalRevenue)],
      ["Tổng đơn hàng", totalOrders],
      ["Khách hàng mới", newCustomers],
      ["Tỷ lệ chuyển đổi", `${(conversionRate * 100).toFixed(2)}%`],
      ["", ""],
      ["Ngày", "Doanh thu", "Số đơn hàng"],
      ...salesData.map((d) => [d.name, formatCurrency(d.sales), d.orders]),
      ["", ""],
      ["Danh mục", "Doanh thu"],
      ...categoryData.map((d) => [d.name, formatCurrency(d.value)]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `report_${dateRange}_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="week">7 ngày qua</option>
            <option value="month">30 ngày qua</option>
            <option value="year">365 ngày qua</option>
          </select>
          <button
            onClick={downloadReport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FaDownload className="mr-2" />
            Tải báo cáo
          </button>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Tổng doanh thu</div>
          <div className="text-2xl font-bold text-gray-800">
            {formatCurrency(totalRevenue)}
          </div>
          <div className="text-sm text-green-600">+12.5% so với tuần trước</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Tổng đơn hàng</div>
          <div className="text-2xl font-bold text-gray-800">{totalOrders}</div>
          <div className="text-sm text-green-600">+5.2% so với tuần trước</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Khách hàng mới</div>
          <div className="text-2xl font-bold text-gray-800">{newCustomers}</div>
          <div className="text-sm text-green-600">+8.1% so với tuần trước</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Tỷ lệ chuyển đổi</div>
          <div className="text-2xl font-bold text-gray-800">
            {(conversionRate * 100).toFixed(2)}%
          </div>
          <div className="text-sm text-red-600">-1.2% so với tuần trước</div>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biểu đồ doanh thu */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Doanh thu
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  name="Doanh thu"
                  stroke="#3B82F6"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ đơn hàng */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Đơn hàng</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" name="Số đơn hàng" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ danh mục */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Phân bố danh mục
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
