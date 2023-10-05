import { Formik } from "formik";
import * as Yup from "yup";

function Form() {
  return (
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(50, "Must be 50 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        message: Yup.string()
          .min(10, "Must be 10 characters or more")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          resetForm();
        }, 2000);
      }}
    >
      {(formik) => (
        <form className="w-full max-w-sm my-6" onSubmit={formik.handleSubmit}>
          <h2 className="mb-3 text-2xl font-bold">Contact us</h2>
          <div className="w-full form-control">
            <label className="label">
              <span className="label-text ">Name</span>
            </label>
            <input
              type="text"
              placeholder="What is your name?"
              className={`w-full input input-bordered ${
                formik.touched.name && formik.errors.name ? "input-error" : null
              }`}
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <label className="label">
                <span className="label-text-alt text-error">
                  {formik.errors.name}
                </span>
              </label>
            ) : null}
          </div>
          <div className="w-full form-control">
            <label className="label">
              <span className="label-text ">Email</span>
            </label>
            <input
              type="text"
              placeholder="What is your email?"
              className={`w-full input input-bordered ${
                formik.touched.email && formik.errors.email
                  ? "input-error"
                  : null
              }`}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <label className="label">
                <span className="label-text-alt text-error">
                  {formik.errors.email}
                </span>
              </label>
            ) : null}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              className={`h-24 textarea textarea-bordered ${
                formik.touched.message && formik.errors.message
                  ? "textarea-error"
                  : null
              }`}
              placeholder="How can we help you?"
              {...formik.getFieldProps("message")}
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <label className="label">
                <span className="label-text-alt text-error">
                  {formik.errors.message}
                </span>
              </label>
            ) : null}
          </div>
          <div className="form-control">
            <button
              className="mt-4 btn"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <span class="loading loading-spinner loading-md"></span>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Form;
