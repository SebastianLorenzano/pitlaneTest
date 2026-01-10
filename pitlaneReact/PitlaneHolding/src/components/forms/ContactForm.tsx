import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FormBase from "./FormBase";
import type { Field } from "./FormBase";
import { sendContactForm } from "../../api/apiContact";
import Modal from "./Modal";

const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error" | "warning">("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalErrors, setModalErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const fields: Field[] = [
      {
        name: "name",
        label: t("contact.fields.name"),
        type: "text",
        required: true,
        placeholder: t("contact.placeholders.name")
      },
      {
        name: "email",
        label: t("contact.fields.email"),
        type: "email",
        required: true,
        placeholder: t("contact.placeholders.email")
      },
      {
        name: "number",
        label: t("contact.fields.number"),
        type: "tel",
        placeholder: t("contact.placeholders.number")
      },
      {
        name: "company",
        label: t("contact.fields.company"),
        type: "text",
        placeholder: t("contact.placeholders.company")
      },
      {
        name: "message",
        label: t("contact.fields.message"),
        type: "textarea",
        rows: 5,
        placeholder: t("contact.placeholders.message")
      }
    ];

  async function handleSubmit(data: Record<string, string>) {
    if (isSubmitting || isSent) return;

    setIsSubmitting(true);

    try {
      const result = await sendContactForm(data);

      if (result.status === "SUCCESS") {
        setIsSent(true);
        setIsSubmitting(false);
        setModalType("success");
        setModalTitle(t("contact.modal.successTitle"));
        setModalMessage(t("contact.modal.successMessage"));
        setModalOpen(true);
        return;
      }

      // Backend responded but failed
      setIsSubmitting(false);
      setModalType("error");
      setModalTitle(t("contact.modal.errorTitle"));
      setModalMessage(result.message || t("contact.modal.errorMessage"));
      setModalOpen(true);

    } catch (err: any) {
      setIsSubmitting(false);

      if (err.errors) {
        setModalErrors(err.errors);
        setModalType("warning");
        setModalTitle(t("contact.modal.validationTitle"));
        setModalMessage(t("contact.modal.validationMessage"));
      } else {
        setModalType("error");
        setModalTitle(t("contact.modal.unexpectedTitle"));
        setModalMessage(t("contact.modal.unexpectedMessage"));
      }

      setModalOpen(true);
    }
  }

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-xl">
          <FormBase
            title={t("contact.title")}
            fields={fields}
            onSubmit={handleSubmit}
            disabled={isSubmitting || isSent}
            isSubmitting={isSubmitting}
            isSent={isSent}
          />
        </div>
      </div>

      <Modal
        open={modalOpen}
        title={modalTitle}
        message={modalMessage}
        errors={modalErrors}
        type={modalType}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default ContactForm;
