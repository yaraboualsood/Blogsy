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
        .test("fileType", "Unsupported file type", (value) => {
            if (!value) return true;
            if (typeof value === "string") return true;
            return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type);
        }),
});

export default function EditPostModal({ isOpen, onClose, post, onPostUpdated }) {
    const [imagePreview, setImagePreview] = useState(post?.image || null);

    if (!isOpen || !post) return null;

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const form = new FormData();
            form.append("title", values.title);
            form.append("content", values.content);
            form.append("category", values.category);
            if (values.image && typeof values.image !== "string") {
                form.append("image", values.image);
            }

            const updatedPost = await blogService.updatePost(post._id, form);
            onPostUpdated(updatedPost); // Now receiving the post directly
            onClose();
        } catch (error) {
            toast.error("Failed to update post");
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <dialog open className="modal modal-open">
            <div className="modal-box w-full max-w-lg">
                <h3 className="font-bold text-2xl mb-4">Edit Post</h3>

                <Formik
                    initialValues={{
                        title: post.title,
                        content: post.content,
                        category: post.category,
                        image: post.image
                    }}
                    validationSchema={PostSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
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
                                <button type="button" onClick={onClose} className="btn btn-ghost">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-main"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Updating..." : "Update Post"}
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