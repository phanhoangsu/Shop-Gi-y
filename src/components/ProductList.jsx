import React, { useMemo, useState } from "react";
import {
  FaSync,
  FaEdit,
  FaTag,
  FaBox,
  FaPalette,
  FaRuler,
  FaInfoCircle,
  FaChartBar,
  FaSearch,
  FaTrash,
} from "react-icons/fa";

const ProductList = ({
  products,
  handleEdit,
  handleDelete,
  selectedProducts,
  setSelectedProducts,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  handleBulkAction,
  setCurrentView,
}) => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [stockRange, setStockRange] = useState({ min: "", max: "" });

  const searchedProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPriceRange =
        (!priceRange.min || product.price >= Number(priceRange.min)) &&
        (!priceRange.max || product.price <= Number(priceRange.max));
      const matchesStockRange =
        (!stockRange.min || product.stock >= Number(stockRange.min)) &&
        (!stockRange.max || product.stock <= Number(stockRange.max));

      return matchesSearch && matchesPriceRange && matchesStockRange;
    });
  }, [products, searchTerm, priceRange, stockRange]);

  const stats = useMemo(() => {
    const totalValue = searchedProducts.reduce(
      (sum, product) =>
        sum + (Number(product.price) * Number(product.stock) || 0),
      0
    );
    const totalStock = searchedProducts.reduce(
      (sum, product) => sum + (Number(product.stock) || 0),
      0
    );
    const avgPrice = searchedProducts.length
      ? (
          searchedProducts.reduce(
            (sum, product) => sum + (Number(product.price) || 0),
            0
          ) / searchedProducts.length
        ).toFixed(2)
      : 0;

    return { totalValue, totalStock, avgPrice };
  }, [searchedProducts]);

  const renderSizeBadges = (sizes) => {
    if (!sizes || sizes.length === 0) return "Không có";
    return (
      <div className="flex flex-wrap gap-1 items-center">
        <FaRuler className="text-orange-500 mr-2" />
        {sizes
          .sort((a, b) => a - b)
          .map((size) => (
            <span
              key={size}
              className="inline-flex items-center justify-center h-6 w-8 rounded bg-orange-100 text-orange-800 text-xs font-medium hover:bg-orange-200 transition-colors"
            >
              {size}
            </span>
          ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
              <option value="kids">Trẻ em</option>
            </select>
            <select
              value={filters.stock}
              onChange={(e) =>
                setFilters({ ...filters, stock: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">Tất cả tồn kho</option>
              <option value="low">Sắp hết hàng {"<10"}</option>
              <option value="out">Hết hàng</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction("delete")}
              disabled={selectedProducts.length === 0}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTrash className="inline-block mr-2" />
              Xóa đã chọn
            </button>
            <button
              onClick={() => setCurrentView("form")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedProducts(products.map((p) => p._id));
                    } else {
                      setSelectedProducts([]);
                    }
                  }}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-4 py-3 text-left">Sản phẩm</th>
              <th className="px-4 py-3 text-left">Danh mục</th>
              <th className="px-4 py-3 text-left">Giá</th>
              <th className="px-4 py-3 text-left">Tồn kho</th>
              <th className="px-4 py-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {searchedProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts([...selectedProducts, product._id]);
                      } else {
                        setSelectedProducts(
                          selectedProducts.filter((id) => id !== product._id)
                        );
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.colors.join(", ")}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-3">${product.price}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.stock === 0
                        ? "bg-red-100 text-red-800"
                        : product.stock < 10
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
