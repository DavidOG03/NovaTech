import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";
import { Chat } from "react-iconly";

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
      "You can find your invoices and billing history under Profile > Account Settings > Billing.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can use the contact form below, or reach us by email or live chat.",
  },
];

const CustomerSupport: React.FC = () => {
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportFormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<SupportFormData> = (data) => {
    console.log("Support request submitted:", data);
    setFormStatus({ submitting: true, success: false, error: false });

    emailjs
      .send(
        "service_tbha9vf",
        "template_8toimsl",
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        "1lo5s4O9sOSYeI011",
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        toast.success("Your request has been successfully submitted");
        setFormStatus({ submitting: false, success: true, error: false });
        reset();
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setFormStatus({ submitting: false, success: false, error: true });
      });
  };

  return (
    <div className="min-h-screen bg-color py-20">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-accent-secondary">
            Customer Support
          </h1>
          <p className="text-dim mt-2">
            We're here to help. Browse our FAQs or reach out directly.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-color rounded-lg p-4 space-y-4">
          <h2 className="text-xl font-semibold text-accent-secondary">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="border-b border-b-dim/25 py-3 last:border-b-0 cursor-pointer"
            >
              <summary className="font-medium text-dim">{faq.question}</summary>
              <p className="text-dim mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-color rounded-lg p-4">
          <h2 className="text-xl text-accent-secondary font-semibold mb-4">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name")}
                className="w-full border border-dim/25 focus:border-accent-light text-accent-secondary rounded px-3 py-2 bg-card"
              />
              {errors.name && (
                <p className="text-important text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Your Email"
                {...register("email")}
                className="w-full border border-dim/25 focus:border-accent-light text-accent-secondary rounded px-3 py-2 bg-card"
              />
              {errors.email && (
                <p className="text-important text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <textarea
                placeholder="How can we help?"
                rows={4}
                {...register("message")}
                className="w-full border border-dim/25 focus:border-accent-light text-accent-secondary rounded px-3 py-2 bg-card"
              ></textarea>
              {errors.message && (
                <p className="text-important text-sm">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-accent-light text-white px-4 py-2 rounded hover:bg-accent-light/75 cursor-pointer"
            >
              {formStatus.submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Support Info */}
        <div className="bg-color rounded-lg p-4">
          <h2 className="text-xl text-accent-secondary font-semibold mb-4">
            Other Ways to Reach Us
          </h2>
          <ul className="space-y-2 text-dim">
            {/* <li>
              📞 Phone: <span className="font-medium">+234 915 3884 943</span>
            </li> */}
            <li className="flex gap-2">
              <Mail /> Email:{" "}
              <a
                href="mailto:davidogdev@gmail.com"
                className="text-accent-light hover:underline"
              >
                davidogdev@gmail.com
              </a>
            </li>
            <li className="flex gap-2">
              <Chat /> Live Chat: Available 9am – 6pm (Mon – Fri)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
