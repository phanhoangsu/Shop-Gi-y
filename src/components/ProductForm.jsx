import React, { useState, useRef, useEffect } from "react";
import {
  FaBox,
  FaImage,
  FaPalette,
  FaRuler,
  FaDollarSign,
  FaTag,
  FaSave,
  FaTrash,
  FaUndo,
  FaInfoCircle,
  FaUpload,
  FaLink,
  FaCamera,
  FaSearch,
  FaQrcode,
  FaCloudUploadAlt,
  FaTimesCircle,
  FaCheckCircle,
  FaArrowsAlt,
  FaStar,
} from "react-icons/fa";

const MAX_IMAGES = 5;

const ProductForm = ({
  formData,
  handleInputChange,
  handleSizeChange,
  handleSubmit,
  handleReset,
  loading,
  availableSizes,
}) => {
  const [previewImages, setPreviewImages] = useState(formData.images || []);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [uploadMethod, setUploadMethod] = useState("url");
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState({});
  const [cameraStream, setCameraStream] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [imageValidation, setImageValidation] = useState({
    size: true,
    format: true,
  });
  const [draggedImage, setDraggedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(""); // Thêm state để lưu thông báo lỗi

  useEffect(() => {
    setPreviewImages(formData.images || []);
  }, [formData.images]);

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  const validateForm = () => {
    if (!formData.name) return "Vui lòng nhập tên sản phẩm!";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      return "Vui lòng nhập giá sản phẩm hợp lệ (lớn hơn 0)!";
    if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0)
      return "Vui lòng nhập số lượng tồn kho hợp lệ (lớn hơn hoặc bằng 0)!";
    if (!formData.img) return "Vui lòng nhập URL hình ảnh!";
    if (formData.colors.length === 0)
      return "Vui lòng nhập ít nhất một màu sắc!";
    if (formData.sizes.length === 0)
      return "Vui lòng chọn ít nhất một kích thước!";
    if (!formData.description) return "Vui lòng nhập mô tả sản phẩm!";
    return null;
  };

  const handleImageChange = (e) => {
    const value = e.target.value;
    if (value) {
      const updatedImages = [...formData.images, value];
      handleInputChange({
        target: { name: "images", value: updatedImages },
      });
      handleInputChange({ target: { name: "img", value: value } });
    }
    e.target.value = "";
  };

  const handleFileUpload = (files) => {
    if (!files || files.length === 0) return;

    const remainingSlots = MAX_IMAGES - formData.images.length;
    if (remainingSlots <= 0) {
      alert(`Chỉ được phép tải lên tối đa ${MAX_IMAGES} ảnh`);
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    const updatedImages = [...formData.images];

    const processFile = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    };

    Promise.all(filesToProcess.map(processFile)).then((results) => {
      const newImages = [...updatedImages, ...results];
      handleInputChange({ target: { name: "images", value: newImages } });
      if (!formData.img) {
        handleInputChange({ target: { name: "img", value: results[0] } });
      }
    });
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    handleInputChange({ target: { name: "images", value: updatedImages } });
    handleInputChange({
      target: { name: "img", value: updatedImages[0] || "" },
    });
    setImageError((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  };

  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            handleFileUpload([file]);
            break;
          }
        }
      }
    };
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      videoRef.current.srcObject = stream;
      setCameraStream(stream);
      setIsCameraActive(true);
    } catch (err) {
      console.error("Lỗi khi khởi động camera:", err);
      alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg", 0.8);
      const updatedImages = [...formData.images, imageData];
      handleInputChange({ target: { name: "images", value: updatedImages } });
      handleInputChange({ target: { name: "img", value: imageData } });
      stopCamera();
    }
  };

  const handleDragStart = (e, index) => setDraggedImage(index);

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedImage === null) return;
    const newImages = [...formData.images];
    const draggedItem = newImages[draggedImage];
    newImages.splice(draggedImage, 1);
    newImages.splice(index, 0, draggedItem);
    handleInputChange({ target: { name: "images", value: newImages } });
    handleInputChange({ target: { name: "img", value: newImages[0] || "" } });
    setDraggedImage(index);
  };

  const handleDragEnd = () => setDraggedImage(null);

  const handleFormSubmit = (action) => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    handleSubmit(action);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
          <FaTimesCircle className="mr-2" />
          {error}
        </div>
      )}
      <div className="flex items-center mb-6">
        <FaTag className="text-blue-500 text-xl mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">
          {formData._id ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh mục
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
              <option value="kids">Trẻ em</option>
            </select>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              placeholder="Nhập tên sản phẩm"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá ($)
              </label>
              <div className="relative">
                <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="price"
                  placeholder="Nhập giá"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2.5 pl-9 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số lượng
              </label>
              <div className="relative">
                <FaBox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="stock"
                  placeholder="Nhập số lượng"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full p-2.5 pl-9 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="form-group space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hình ảnh sản phẩm
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setUploadMethod("url")}
                className={`flex items-center px-3 py-1.5 rounded ${
                  uploadMethod === "url"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaLink className="mr-1" /> URL
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod("file")}
                className={`flex items-center px-3 py-1.5 rounded ${
                  uploadMethod === "file"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaUpload className="mr-1" /> Tải lên
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod("camera")}
                className={`flex items-center px-3 py-1.5 rounded ${
                  uploadMethod === "camera"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaCamera className="mr-1" /> Chụp ảnh
              </button>
            </div>
            <div className="relative">
              {uploadMethod === "url" && (
                <div className="relative">
                  <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="img"
                    placeholder="Nhập URL hình ảnh hoặc dán (Ctrl+V) ảnh vào đây"
                    value={formData.img}
                    onChange={handleImageChange}
                    className="w-full p-2.5 pl-9 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
              {uploadMethod === "file" && (
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-blue-500 bg-blue-50 scale-102"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    accept="image/*"
                  />
                  <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-600">
                    Kéo thả ảnh vào đây,{" "}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                      chọn file
                    </button>{" "}
                    hoặc dán (Ctrl+V)
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Hỗ trợ: PNG, JPG, GIF (tối đa 5MB)
                  </p>
                </div>
              )}
              {uploadMethod === "camera" && (
                <div className="space-y-3">
                  <div className="relative border-2 border-dashed rounded-lg overflow-hidden">
                    {isCameraActive ? (
                      <div className="relative">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-[300px] object-cover rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                          <div className="flex justify-center space-x-4">
                            <button
                              type="button"
                              onClick={captureImage}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                            >
                              <FaCamera className="mr-2" /> Chụp ảnh
                            </button>
                            <button
                              type="button"
                              onClick={stopCamera}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
                            >
                              <FaTimesCircle className="mr-2" /> Hủy
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <FaCamera className="mx-auto text-3xl text-gray-400 mb-2" />
                        <button
                          type="button"
                          onClick={startCamera}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center mx-auto"
                        >
                          <FaCamera className="mr-2" /> Mở camera
                        </button>
                      </div>
                    )}
                  </div>
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Ảnh sản phẩm ({formData.images.length})
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`relative group cursor-move ${
                      draggedImage === index ? "opacity-50" : ""
                    }`}
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                      {imageError[index] ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <FaImage className="mx-auto text-3xl text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Lỗi tải ảnh</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={() =>
                              setImageError((prev) => ({
                                ...prev,
                                [index]: true,
                              }))
                            }
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => setSelectedImage(image)}
                              className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 mr-2"
                            >
                              <FaSearch className="text-lg" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <FaTrash className="text-lg" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Ảnh phóng to"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100"
              >
                <FaTimesCircle className="text-xl" />
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Màu sắc
            </label>
            <div className="relative">
              <FaPalette className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Nhập màu sắc và nhấn Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    const newColors = [
                      ...formData.colors,
                      e.target.value.trim(),
                    ];
                    handleInputChange({
                      target: { name: "colors", value: newColors },
                    });
                    e.target.value = "";
                    e.preventDefault();
                  }
                }}
                className="w-full p-2.5 pl-9 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {formData.colors.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                  >
                    {color}
                    <button
                      type="button"
                      onClick={() => {
                        const newColors = formData.colors.filter(
                          (_, i) => i !== index
                        );
                        handleInputChange({
                          target: { name: "colors", value: newColors },
                        });
                      }}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <FaTimesCircle />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kích cỡ
            </label>
            <div className="relative">
              <FaRuler className="absolute left-3 top-3 text-gray-400" />
              <div className="grid grid-cols-5 gap-2 p-2 pl-9 bg-gray-50 border border-gray-300 rounded-lg max-h-32 overflow-y-auto">
                {availableSizes.map((size) => (
                  <label
                    key={size}
                    className={`flex items-center justify-center p-2 rounded cursor-pointer transition-colors ${
                      formData.sizes.includes(size)
                        ? "bg-blue-500 text-white"
                        : "bg-white hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={size}
                      checked={formData.sizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                      className="hidden"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
            {formData.sizes.length > 0 && (
              <div className="mt-2">
                <span className="text-sm text-gray-600">
                  Đã chọn: {formData.sizes.join(", ")}
                </span>
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả sản phẩm
            </label>
            <div className="relative">
              <FaInfoCircle className="absolute left-3 top-3 text-gray-400" />
              <textarea
                name="description"
                placeholder="Nhập mô tả sản phẩm"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2.5 pl-9 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={() => handleFormSubmit("add")}
          disabled={loading || formData._id}
          className={`flex items-center px-4 py-2 rounded-lg text-white ${
            loading || formData._id
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          <FaSave className="mr-2" />
          {loading ? "Đang thêm..." : "Thêm sản phẩm"}
        </button>
        <button
          onClick={() => handleFormSubmit("update")}
          disabled={loading || !formData._id}
          className={`flex items-center px-4 py-2 rounded-lg text-white ${
            loading || !formData._id
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } transition-colors`}
        >
          <FaSave className="mr-2" />
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
        <button
          onClick={() => handleFormSubmit("delete")}
          disabled={loading || !formData._id}
          className={`flex items-center px-4 py-2 rounded-lg text-white ${
            loading || !formData._id
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } transition-colors`}
        >
          <FaTrash className="mr-2" />
          {loading ? "Đang xóa..." : "Xóa"}
        </button>
        <button
          onClick={handleReset}
          disabled={loading}
          className={`flex items-center px-4 py-2 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700"
          } transition-colors`}
        >
          <FaUndo className="mr-2" /> Làm mới
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
