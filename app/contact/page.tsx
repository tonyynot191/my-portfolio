import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact | Tony",
  description: "Get in touch with Tony.",
};

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-3">Contact</h1>
      <p className="text-gray-400 mb-10">
        Have a project in mind, or just want to say hi? Send me a message.
      </p>
      <ContactForm />
    </div>
  );
}