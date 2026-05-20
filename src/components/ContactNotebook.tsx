"use client";

import React, { useState } from "react";
import NotebookCell from "./NotebookCell";
import emailjs from "@emailjs/browser";

const ContactNotebook = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const serviceId =
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "your_service_id";
      const templateId =
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "your_template_id";
      const autoReplyTemplateId =
        process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID ||
        "your_autoreply_template_id";
      const publicKey =
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key";

      // Template params for notification email
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "sahilmodic819@gmail.com",
      };

      // Template params for auto-reply to user
      const autoReplyParams = {
        to_email: formData.email,
        from_name: formData.name,
        subject: formData.subject,
        message: formData.message,
      };

      // Send notification email first (priority)
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // Then send auto-reply email to user
      try {
        await emailjs.send(
          serviceId,
          autoReplyTemplateId,
          autoReplyParams,
          publicKey,
        );
      } catch (autoReplyError) {
        // Log auto-reply errors but don't fail the whole submission
        console.warn("Auto-reply email failed:", autoReplyError);
        console.warn("Auto-reply params:", autoReplyParams);
        console.warn(
          "Make sure your EmailJS auto-reply template has 'To Email' set to: {{to_email}}",
        );
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send notification email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" aria-label="Contact">
      {/* Markdown Cell - Contact Header */}
      <NotebookCell type="markdown" executionCount={null}>
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Get in Touch
        </h2>
        <p
          className="text-sm sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Interested in collaboration or have a question? Let's connect!
        </p>
      </NotebookCell>

      {/* Code Cell - Contact Information */}
      <NotebookCell type="code" executionCount={9}>
        {`# Contact information
    contact = {
      "email": "sahilmodic819@gmail.com",
      "linkedin": "linkedin.com/in/sahil-modi819",
      "github": "github.com/sahil-modi",
      "location": "Mumbai, Maharashtra, India",
      "availability": "Open to opportunities"
    }

    # Display contact methods
    for platform, info in contact.items():
      print(f"{platform.title()}: {info}")`}
      </NotebookCell>

      {/* Output Cell - Contact Info */}
      <NotebookCell type="output" executionCount={9}>
        <div
          className="space-y-3 code-font text-xs sm:text-sm"
          style={{ color: "var(--text-primary)" }}
        >
          <div className="flex flex-wrap items-center gap-1 sm:gap-3">
            <span>Email: </span>
            <a
              href="mailto:sahilmodic819@gmail.com"
              style={{ color: "var(--link-color)" }}
              className="hover:underline break-all"
            >
              sahilmodic819@gmail.com
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-1 sm:gap-3">
            <span>LinkedIn: </span>
            <a
              href="https://linkedin.com/in/sahil-modi819"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--link-color)" }}
              className="hover:underline break-all"
            >
              linkedin.com/in/sahil-modi819
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-1 sm:gap-3">
            <span>GitHub: </span>
            <a
              href="https://github.com/sahil-modi"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--link-color)" }}
              className="hover:underline break-all"
            >
              github.com/sahil-modi
            </a>
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <span>Location: Mumbai, Maharashtra, India</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 sm:gap-3">
            <span>
              Availability:
              <span style={{ color: "var(--success)" }}>
                &nbsp;Open to opportunities
              </span>
            </span>
          </div>
        </div>
      </NotebookCell>

      {/* Code Cell - Contact Form */}
      <NotebookCell type="code" executionCount={10}>
        {`# Send a message
def send_message(name, email, subject, message):
    """
    Submit a contact form message
    """
    return {
        "status": "pending",
        "name": name,
        "email": email,
        "subject": subject,
        "message": message
    }

# Example usage
# result = send_message("Your Name", "email@example.com", "Subject", "Hello!")`}
      </NotebookCell>

      {/* Output Cell - Contact Form */}
      <NotebookCell type="output" executionCount={10}>
        <div className="space-y-4 w-full max-w-2xl">
          {/* Status Messages */}
          {submitStatus === "success" && (
            <div
              className="p-3 rounded"
              style={{ backgroundColor: "var(--success)", color: "#ffffff" }}
            >
              ✓ Message sent successfully! I'll get back to you soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div
              className="p-3 rounded"
              style={{ backgroundColor: "#dc2626", color: "#ffffff" }}
            >
              ✗ Failed to send message. Please try again or email me directly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded border code-font text-sm"
                style={{
                  backgroundColor: "var(--code-bg)",
                  borderColor: "var(--cell-border)",
                  color: "var(--text-primary)",
                }}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded border code-font text-sm"
                style={{
                  backgroundColor: "var(--code-bg)",
                  borderColor: "var(--cell-border)",
                  color: "var(--text-primary)",
                }}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded border code-font text-sm"
                style={{
                  backgroundColor: "var(--code-bg)",
                  borderColor: "var(--cell-border)",
                  color: "var(--text-primary)",
                }}
                placeholder="What is this about?"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-2 rounded border code-font text-sm resize-none"
                style={{
                  backgroundColor: "var(--code-bg)",
                  borderColor: "var(--cell-border)",
                  color: "var(--text-primary)",
                }}
                placeholder="Your message here..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded font-medium transition-colors disabled:opacity-50 hover:cursor-pointer"
              style={{
                backgroundColor: "var(--button-primary)",
                color: "#ffffff",
              }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </NotebookCell>
    </section>
  );
};

export default ContactNotebook;
