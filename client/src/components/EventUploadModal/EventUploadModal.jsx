import { useState } from "react";
import APP_API from "../../utils/api";

const EventUploadModal = ({ isOpen, onClose }) => {
  const initialFormData = {
    title: "",
    description: "",
    country: "",
    province: "",
    city: "",
    address: "",
    date: "", // 该字段应以YYYY-MM-DD格式提交
  };

  const [formData, setFormData] = useState(initialFormData);
  const [hasError, setHasError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.title || !formData.date) {
      // 确保必填字段已填写
      setHasError(true); // 如果有字段为空，标记为有错误
    } else {
      try {
        const response = await APP_API.createEvent(formData);
        if (response.status === 201) {
          onClose(); // 成功创建事件后，关闭模态窗口
          setFormData(initialFormData); // 重置表单字段
          setHasError(false); // 重置错误状态
        } else {
          // 处理其他响应状态码
          setHasError(true);
        }
      } catch (error) {
        console.error("Failed to create event:", error);
        setHasError(true);
      }
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-stone-100 p-4 rounded-lg w-full max-w-md mx-auto"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className=""
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className=""
        />
        <input
          type="text"
          name="date"
          placeholder="YYYY-MM-DD"
          value={formData.date}
          onChange={handleChange}
          className=""
        />
        {/* 为剩余的字段重复上面的模式 */}
        {hasError && (
          <div className="text-red-500">Please fill in all fields.</div>
        )}
        <button type="submit" className="mt-2">
          Create Event
        </button>
      </form>
      <button onClick={onClose} className="mt-2">
        &times; Close
      </button>
    </div>
  ) : null;
};

export default EventUploadModal;
