import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for form validation
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type SupportFormData = z.infer<typeof schema>;

const faqs = [
  {
    question: "How can I reset my password?",
    answer:
      "Click on 'Forgot password?' at the sign-in screen and follow the instructions sent to your email.",
  },
  {
    question: "Where can I view my billing history?",
    answer:
      "You can find your invoices and billing history under Account Settings > Billing.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can use the contact form below, or reach us by phone or live chat.",
  },
];

const CustomerSupport: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportFormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<SupportFormData> = (data) => {
    console.log("Support request submitted:", data);
    reset();
    alert("Your message has been sent. We'll get back to you soon!");
  };

  return (
    <div className="min-h-screen bg-grey py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">Customer Support</h1>
          <p className="text-light-black mt-2">
            We're here to help. Browse our FAQs or reach out directly.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-black">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="border-b border-b-grey py-3 last:border-b-0 cursor-pointer"
            >
              <summary className="font-medium text-light-black">
                {faq.question}
              </summary>
              <p className="text-light-black mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl text-black font-semibold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name")}
                className="w-full border text-black rounded px-3 py-2 bg-grey"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Your Email"
                {...register("email")}
                className="w-full border text-black rounded px-3 py-2 bg-grey"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <textarea
                placeholder="How can we help?"
                rows={4}
                {...register("message")}
                className="w-full border text-black rounded px-3 py-2 bg-grey"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-pink text-white px-4 py-2 rounded hover:bg-pink/75"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Support Info */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl text-black font-semibold mb-4">
            Other Ways to Reach Us
          </h2>
          <ul className="space-y-2 text-light-black">
            {/* <li>
              📞 Phone: <span className="font-medium">+234 915 3884 943</span>
            </li> */}
            <li>
              📧 Email:{" "}
              <a
                href="mailto:support@example.com"
                className="text-pink hover:underline"
              >
                daveedog2003@gmail.com
              </a>
            </li>
            <li>💬 Live Chat: Available 9am – 6pm (Mon – Fri)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
