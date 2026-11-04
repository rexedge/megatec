import type { Metadata } from "next";
import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Content" };

/** The admin's home: what the site holds, section by section. The editors follow. */
export default async function AdminHome() {
  const { user } = await requireStaff();
  const database = db!;
  const [products, subcategories, parts, projects, testimonials, logos] = await Promise.all([
    database.product.count(),
    database.subcategory.count(),
    database.sparePart.count(),
    database.project.count(),
    database.testimonial.count(),
    database.clientLogo.count(),
  ]);

  // A section with an href has its editor; the rest are on their way.
  const sections: { title: string; detail: string; href?: string }[] = [
    { title: "Products", detail: `${products} products in ${subcategories} sub-categories` },
    { title: "Spare parts", detail: `${parts} parts in 8 groups` },
    { title: "Projects", detail: `${projects} projects` },
    { title: "Testimonials", detail: `${testimonials} quotes on the homepage`, href: "/admin/testimonials" },
    { title: "Client logos", detail: `${logos} logos` },
  ];

  return (
    <>
      <h1 className="text-ink text-3xl font-semibold tracking-tight">Hello, {user.name.split(" ")[0]}</h1>
      <p className="text-body mt-2">Everything the website shows that you can change here.</p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <li key={section.title}>
            {section.href ? (
              <Link
                href={section.href}
                className="border-border/70 hover:border-sea group block h-full rounded-2xl border bg-white p-5 transition-colors"
              >
                <p className="text-ink group-hover:text-sea text-lg font-semibold tracking-tight transition-colors">
                  {section.title}
                </p>
                <p className="text-body mt-1 text-sm">{section.detail}</p>
                <p className="text-sea mt-4 text-sm font-semibold">Edit →</p>
              </Link>
            ) : (
              <div className="border-border/70 h-full rounded-2xl border bg-white p-5">
                <p className="text-ink text-lg font-semibold tracking-tight">{section.title}</p>
                <p className="text-body mt-1 text-sm">{section.detail}</p>
                <p className="text-body/70 mt-4 text-xs font-medium tracking-wide uppercase">Editor coming next</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
