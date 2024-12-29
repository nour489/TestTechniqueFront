import React, { useState, useEffect } from "react";
import axios from "axios";

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [editingIndex, setEditingIndex] = useState(null);
  const [courseData, setCourseData] = useState({
    title: "",
    price: "",
    image: null,
    imagePreview: null, // Add imagePreview field to store the preview URL
  });
  const [deletingIndex, setDeletingIndex] = useState(null);

  // Fetch courses from the API on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/item/courses").then((response) => {
      setCourses(response.data);
    });
  }, []);

  // Fetch courses from the API on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/item/courses").then((response) => {
      setCourses(response.data);
    });
  }, [isModalOpen, isDeleteModalOpen]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        // Generate a preview URL for the uploaded image
        const imagePreviewUrl = URL.createObjectURL(file);
        setCourseData({
          ...courseData,
          image: file,
          imagePreview: imagePreviewUrl, // Update the preview URL
        });
      }
    } else {
      setCourseData({ ...courseData, [name]: value });
    }
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setCourseData({ title: "", price: "", image: null, imagePreview: null });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (index) => {
    setModalMode("edit");
    setEditingIndex(index);
    const course = courses[index];
    setCourseData({
      title: course.title,
      price: course.price,
      image: null, // Start with null so it doesn't override the existing image
      imagePreview: course.image || null, // Use the course's existing image URL (if any)
    });
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (index) => {
    setDeletingIndex(index);
    setIsDeleteModalOpen(true);
  };

  const handleSaveCourse = () => {
    if (modalMode === "add") {
      // Add a new course via POST API
      const formData = new FormData();
      formData.append("title", courseData.title);
      formData.append("price", parseInt(courseData.price));
      if (courseData.image) {
        formData.append("image", courseData.image);
      }

      axios
        .post("http://localhost:5000/item/courses", formData)
        .then((response) => {
          let newItem = response.data;
          newItem.price = newItem.price + " DT/Month";
          setCourses([...courses, newItem]);
          setIsModalOpen(false);
          setCourseData({
            title: "",
            price: "",
            image: null,
            imagePreview: null,
          });
        })
        .catch((error) => {
          console.error("There was an error adding the course:", error);
        });
    } else if (modalMode === "edit") {
      // Update the existing course via PUT API
      const updatedCourse = { ...courseData };
      updatedCourse.price = parseInt(updatedCourse.price);
      const formData = new FormData();
      formData.append("title", courseData.title);
      formData.append("price", parseInt(courseData.price));
      if (courseData.image) {
        formData.append("image", courseData.image);
      }
      axios
        .put(
          `http://localhost:5000/item/courses/${courses[editingIndex]._id}`,
          formData
        )
        .then((response) => {
          console.log(response.data.item);
          const updatedCourses = [...courses];
          const updatedItem = response.data.item;
          updatedItem.price = updatedItem.price + " DT/Month";
          updatedCourses[editingIndex] = updatedItem;
          setCourses(updatedCourses);
          setIsModalOpen(false);
          setCourseData({
            title: "",
            price: "",
            image: null,
            imagePreview: null,
          });
          setEditingIndex(null);
        })
        .catch((error) => {
          console.error("There was an error updating the course:", error);
        });
    }
  };

  const handleDeleteCourse = () => {
    axios
      .delete(
        `http://localhost:5000/item/courses/${courses[deletingIndex]._id}`
      )
      .then(() => {
        const updatedCourses = courses.filter(
          (_, index) => index !== deletingIndex
        );
        setCourses(updatedCourses);
        setIsDeleteModalOpen(false);
        setDeletingIndex(null);
      })
      .catch((error) => {
        console.error("There was an error deleting the course:", error);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Courses Table</h2>
      <button
        style={{
          padding: "10px 20px",
          background: "orange",
          border: "none",
          color: "#fff",
          borderRadius: "5px",
          float: "right",
          cursor: "pointer",
        }}
        onClick={handleOpenAddModal}
      >
        Add New Item
      </button>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "50px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Title</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Price</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                {course.title}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                {course.price}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{ marginRight: "10px", cursor: "pointer" }}
                  title="Edit Course"
                  onClick={() => handleOpenEditModal(index)}
                >
                  ✏️
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  title="Delete Course"
                  onClick={() => handleOpenDeleteModal(index)}
                >
                  🗑️
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Item Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "30px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          <h2>{modalMode === "add" ? "Add New Item" : "Edit Item"}</h2>
          <div style={{ marginBottom: "15px" }}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={courseData.price}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
            {/* Display image preview */}
            {courseData.imagePreview && (
              <div style={{ marginTop: "15px" }}>
                <img
                  src={courseData.imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "5px",
                    maxHeight: "200px",
                  }}
                />
              </div>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handleSaveCourse}
              style={{
                padding: "10px 20px",
                background: "green",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Save
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                padding: "10px 20px",
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "30px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          <h2>Are you sure you want to delete this item?</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handleDeleteCourse}
              style={{
                padding: "10px 20px",
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              style={{
                padding: "10px 20px",
                background: "gray",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              No, Cancel
            </button>
          </div>
        </div>
      )}

      {/* Overlay for modals */}
      {(isModalOpen || isDeleteModalOpen) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
          onClick={() => {
            setIsModalOpen(false);
            setIsDeleteModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default CoursesTable;
