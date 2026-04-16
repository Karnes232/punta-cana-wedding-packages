import { getGeneralLayout } from '@/sanity/queries/GeneralLayout';
import { localized } from '@/sanity/lib/localize';
import type { ContactPageQueryResult } from '@/sanity/queries/ContactPage';
import ContactForm from './ContactForm';

type Props = {
  data: ContactPageQueryResult;
  locale: string;
};

export default async function ContactSection({ data, locale }: Props) {
  const layout = await getGeneralLayout();
  const phone = layout?.phoneNumber ?? null;
  const email = layout?.email ?? null;
  const introText = localized(data?.introText, locale) ?? null;

  return <ContactForm phone={phone} email={email} introText={introText} />;
}
