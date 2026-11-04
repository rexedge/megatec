import Link from "next/link";
import { Panel } from "@/components/admin/fields";

/**
 * Inside the admin, an item that is not there (deleted by someone else, or a mistyped
 * address) gets this instead of the public site's 404 page, under the admin's own bar.
 */
export default function AdminNotFound() {
  return (
    <Panel className="mx-auto mt-6 max-w-lg p-8 text-center">
      <h1 className="text-ink text-2xl font-semibold tracking-tight">This isn&rsquo;t here</h1>
      <p className="text-body mt-2">
        It may have been deleted, or the address is mistyped. Everything that is here is listed under Content.
      </p>
      <Link
        href="/admin"
        className="bg-ink hover:bg-ink/90 mt-6 inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition-colors"
      >
        Back to Content
      </Link>
    </Panel>
  );
}
