import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { TestimonialForm } from "../testimonial-form";

export const metadata: Metadata = { title: "Add a quote" };

export default async function NewTestimonialPage() {
  await requireStaff();
  return (
    <>
      <PageHeader
        title="Add a quote"
        intro="It goes at the end of the homepage's testimonials; move it up the list afterwards if you like."
        back={{ href: "/admin/testimonials", label: "Testimonials" }}
      />
      <TestimonialForm id={null} values={{ quote: "", company: "", published: true }} />
    </>
  );
}
