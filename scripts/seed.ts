/**
 * Loads the site's built-in content (lib/content/seed) into the database:
 * 4 categories, 12 sub-categories, 41 products, 8 part groups, 84 spare parts,
 * the projects, testimonials and client logos.
 *
 *   pnpm db:seed            into an empty database
 *   pnpm db:seed --reset    empty the content tables first (wipes every admin edit)
 *
 * It refuses to touch a database that already has content unless --reset is given,
 * so it can never overwrite MEGA-TEC's edits by accident.
 */
import { db } from "@/lib/db";
import {
  SEED_CATEGORIES,
  SEED_CLIENT_LOGOS,
  SEED_PART_GROUPS,
  SEED_PROJECTS,
  SEED_SPARE_PARTS,
  SEED_TESTIMONIALS,
} from "@/lib/content/seed";

async function main() {
  if (!db) throw new Error("DATABASE_URL is not set (see .env.local)");
  const reset = process.argv.includes("--reset");

  const existing = await db.category.count();
  if (existing > 0 && !reset) {
    console.log(
      `The database already has content (${existing} categories). Nothing changed.\n` +
        "Run `pnpm db:seed --reset` to replace it with the built-in content."
    );
    return;
  }

  await db.$transaction(
    async (tx) => {
      if (reset) {
        await tx.$executeRaw`
          truncate table products, subcategories, categories, spare_parts, part_groups,
            projects, testimonials, client_logos restart identity cascade
        `;
      }

      for (const [c, category] of SEED_CATEGORIES.entries()) {
        await tx.category.create({
          data: {
            slug: category.slug,
            name: category.name,
            menuDescription: category.menuDescription,
            icon: category.icon,
            title: category.title,
            meta: category.meta,
            headline: category.headline,
            intro: category.intro,
            cta: category.cta,
            bullets: category.bullets,
            sortOrder: c,
            subcategories: {
              create: category.subs.map((sub, s) => ({
                slug: sub.slug,
                name: sub.name,
                title: sub.title,
                meta: sub.meta,
                h1: sub.h1,
                intro: sub.intro,
                formHeading: sub.form,
                filters: sub.filters,
                sortOrder: s,
                products: {
                  create: sub.products.map((product, p) => ({
                    slug: product.id,
                    name: product.name,
                    blurb: product.blurb,
                    bestSeller: product.best,
                    tag: product.tag,
                    badge: product.badge,
                    cells: product.cells,
                    description: product.description,
                    extras: product.extras,
                    warranty: product.warranty,
                    image: product.image,
                    sheet: product.sheet,
                    sortOrder: p,
                  })),
                },
              })),
            },
          },
        });
      }

      for (const [g, group] of SEED_PART_GROUPS.entries()) {
        await tx.partGroup.create({
          data: {
            name: group.name,
            label: group.label,
            sortOrder: g,
            parts: {
              create: SEED_SPARE_PARTS.map((part, p) => ({ part, p }))
                .filter(({ part }) => part.group === group.name)
                .map(({ part, p }) => ({
                  number: part.n,
                  name: part.name,
                  fit: part.fit,
                  image: part.image,
                  href: part.href ?? null,
                  sortOrder: p,
                })),
            },
          },
        });
      }
      const placed = await tx.sparePart.count();
      if (placed !== SEED_SPARE_PARTS.length) {
        throw new Error(`Only ${placed} of ${SEED_SPARE_PARTS.length} parts matched a group`);
      }

      await tx.project.createMany({
        data: SEED_PROJECTS.map((project, p) => ({
          name: project.name,
          location: project.location,
          categories: project.categories,
          description: project.description,
          image: project.image ?? null,
          imagePosition: project.imagePosition ?? null,
          onHome: project.onHome,
          onProjectsPage: project.onProjectsPage,
          sortOrder: p,
        })),
      });

      await tx.testimonial.createMany({
        data: SEED_TESTIMONIALS.map((t, i) => ({
          quote: t.quote,
          company: t.company ?? null,
          sortOrder: i,
        })),
      });

      await tx.clientLogo.createMany({
        data: SEED_CLIENT_LOGOS.map((logo, i) => ({
          name: logo.name,
          image: logo.src,
          width: logo.width,
          height: logo.height,
          sortOrder: i,
        })),
      });
    },
    { timeout: 60_000 }
  );

  const products = SEED_CATEGORIES.flatMap((c) => c.subs).flatMap((s) => s.products).length;
  console.log(
    `Seeded ${SEED_CATEGORIES.length} categories, ${products} products, ` +
      `${SEED_SPARE_PARTS.length} spare parts, ${SEED_PROJECTS.length} projects, ` +
      `${SEED_TESTIMONIALS.length} testimonials and ${SEED_CLIENT_LOGOS.length} client logos.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db?.$disconnect());
