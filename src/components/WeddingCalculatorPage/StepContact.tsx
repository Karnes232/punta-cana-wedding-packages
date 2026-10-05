"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import StepWrapper from "./StepWrapper";
import type {
  CalculatorAction,
  CalculatorState,
  ContactInfo,
} from "./useCalculatorState";

type Props = {
  stepNumber: number;
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
};

const inputClass =
  "w-full rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 text-sm text-[#1A1A1A] shadow-sm transition-colors duration-200 focus:border-[#5B9FD9] focus:outline-none focus:ring-2 focus:ring-[#5B9FD9]/20";

export function validateContact(contact: ContactInfo) {
  return {
    name: !contact.name.trim(),
    email: !contact.email.trim().match(/^[^@]+@[^@]+\.[^@]+$/),
    phone: !contact.whatsapp.trim() && !contact.phone.trim(),
  };
}

export default function StepContact({ stepNumber, state, dispatch }: Props) {
  const t = useTranslations("weddingCalculator.steps.contact");
  const [showErrors, setShowErrors] = useState(false);

  const { contact } = state;
  const invalid = validateContact(contact);

  const setField =
    (field: keyof ContactInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "SET_CONTACT", contact: { [field]: e.target.value } });

  const handleContinue = () => {
    if (invalid.name || invalid.email || invalid.phone) {
      setShowErrors(true);
      return;
    }
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <StepWrapper
      stepNumber={stepNumber}
      title={t("title")}
      onContinue={handleContinue}
    >
      <p className="mb-6 text-sm leading-relaxed text-[#666666]">{t("help")}</p>

      <div className="max-w-lg space-y-5">
        {/* Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#333333]">
            {t("name")}
          </label>
          <input
            type="text"
            autoComplete="name"
            value={contact.name}
            onChange={setField("name")}
            placeholder={t("namePlaceholder")}
            className={inputClass}
          />
          {showErrors && invalid.name && (
            <p className="mt-1 text-xs text-red-500">{t("nameRequired")}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#333333]">
            {t("email")}
          </label>
          <input
            type="email"
            autoComplete="email"
            value={contact.email}
            onChange={setField("email")}
            placeholder={t("emailPlaceholder")}
            className={inputClass}
          />
          {showErrors && invalid.email && (
            <p className="mt-1 text-xs text-red-500">{t("emailRequired")}</p>
          )}
        </div>

        {/* WhatsApp + Phone (at least one required) */}
        <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#333333]">
                {t("whatsapp")}
              </label>
              <input
                type="tel"
                value={contact.whatsapp}
                onChange={setField("whatsapp")}
                placeholder={t("whatsappPlaceholder")}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#333333]">
                {t("phone")}
              </label>
              <input
                type="tel"
                autoComplete="tel"
                value={contact.phone}
                onChange={setField("phone")}
                placeholder={t("phonePlaceholder")}
                className={inputClass}
              />
            </div>
          </div>
          {showErrors && invalid.phone ? (
            <p className="mt-1 text-xs text-red-500">{t("phoneRequired")}</p>
          ) : (
            <p className="mt-1 text-xs text-[#999999]">{t("phoneHint")}</p>
          )}
        </div>

        <p className="text-xs text-[#888888]">
          {t("savedNote")}{" "}
          <Link
            href="/privacy-policy"
            className="underline transition-colors duration-200 hover:text-[#5B9FD9]"
          >
            {t("privacyLink")}
          </Link>
        </p>
      </div>
    </StepWrapper>
  );
}
