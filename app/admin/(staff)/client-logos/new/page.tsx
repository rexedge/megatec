import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { LogoForm } from "../logo-form";

export const metadata: Metadata = { title: "Add a logo" };

export default async function NewLogoPage() {
  await requireStaff();
  return (
    <>
      <PageHeader
        title="Add a logo"
        intro="It goes at the end of the row; move it along afterwards if you like."
        back={{ href: "/admin/client-logos", label: "Client logos" }}
      />
      <LogoForm id={null} values={{ name: "", image: null, width: 0, height: 0, published: true }} />
    </>
  );
}
