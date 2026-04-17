import NavClient from "./NavClient";
import { getGeneralLayout } from "@/sanity/queries/GeneralLayout";
import { urlFor } from "@/sanity/lib/image";

export default async function Navbar() {
  const layout = await getGeneralLayout();
  const brandName = layout?.brandName ?? "Punta Cana Wedding Packages";

  const logoUrl = layout?.logo?.asset
    ? urlFor(layout.logo.asset).height(100).width(100).url()
    : null;
  const logoAlt = layout?.logo?.alt ?? brandName;

  return (
    <NavClient brandName={brandName} logoUrl={logoUrl} logoAlt={logoAlt} />
  );
}
