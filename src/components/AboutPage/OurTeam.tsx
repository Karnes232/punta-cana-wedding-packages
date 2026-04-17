import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { localized } from "@/sanity/lib/localize";
import { urlFor } from "@/sanity/lib/image";
import type { AboutPageQueryResult } from "@/sanity/queries/AboutPage";

type Props = {
  data: AboutPageQueryResult | null;
  locale: string;
};

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#EBF4FC]">
      <span className="text-3xl font-semibold text-[#5B9FD9]">{initials}</span>
    </div>
  );
}

export default async function OurTeam({ data, locale }: Props) {
  const t = await getTranslations("about.team");

  const heading = localized(data?.teamTitle, locale) ?? t("heading");
  const members = data?.teamMembers ?? [];

  if (members.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => {
            const photoUrl = member.photo?.asset
              ? urlFor(member.photo.asset)
                  .width(400)
                  .height(533)
                  .fit("crop")
                  .auto("format")
                  .url()
              : null;
            const photoAlt = member.photo?.alt ?? member.name;
            const role = localized(member.role, locale);
            const bio = localized(member.bio, locale);

            return (
              <div
                key={member._key}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl bg-[#F5F5F5]">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={photoAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <InitialsAvatar name={member.name} />
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="text-base font-semibold text-[#1A1A1A]">
                    {member.name}
                  </p>
                  {role && (
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-[#5B9FD9]">
                      {role}
                    </p>
                  )}
                  {bio && (
                    <p className="mt-3 text-sm leading-relaxed text-[#666666]">
                      {bio}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
