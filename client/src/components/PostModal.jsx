import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { blogService } from "../api/blogService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const PostSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Unsupported file type", (value) => {
      return value && ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type);
    }),
});

export default function PostModal({ isOpen, onClose, onPostCreated }) {
  const [imagePreview, setImagePreview] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const form = new FormData();
      form.append("title", values.title);
      form.append("content", values.content);
      form.append("category", values.category);
      form.append("image", values.image);
      const token = localStorage.getItem("token");
      const newPost = await blogService.createPost(form, token);
      toast.success("Blog Posted Successfully!")

      console.log("Created post returned from blogService:", newPost);

      onPostCreated?.(newPost);

      resetForm();
      setImagePreview(null);
      onClose();
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error);
      toast.error("Failed to post blog");    

    } finally {
      setSubmitting(false);
    }
  };


  return (
    <dialog open className="modal modal-open">
      <div className="modal-box w-full max-w-lg">
        <h3 className="font-bold text-2xl mb-4">Create New Post</h3>

        <Formik
          initialValues={{ title: "", content: "", category: "", image: null }}
          validationSchema={PostSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="title"
                  placeholder="Title"
                  className="input input-bordered w-full"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="content"
                  placeholder="Content"
                  className="textarea textarea-bordered w-full"
                />
                <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  name="category"
                  placeholder="Category"
                  className="input input-bordered w-full"
                />
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("image", file);

                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setImagePreview(reader.result);
                      reader.readAsDataURL(file);
                    } else {
                      setImagePreview(null);
                    }
                  }}
                />
                <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded border"
                  />
                </div>
              )}

              <div className="modal-action">
                <button type="button" onClick={() => { setImagePreview(null); onClose(); }} className="btn btn-ghost">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-main"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
}
