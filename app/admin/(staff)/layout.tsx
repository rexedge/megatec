import Image from "next/image";
import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { SignOutButton } from "./sign-out-button";

/**
 * The signed-in admin: a bar with the sections and the person signed in. Each page and
 * action below checks the session itself (requireStaff); this check only decides
 * whether to draw the bar.
 */
export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireStaff();

  return (
    <>
      <header className="border-border/70 border-b bg-white">
        <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2 sm:px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/logo-wordart.png" alt="MEGA-TEC" width={600} height={192} className="h-7 w-auto" />
            <span className="text-body text-sm font-medium">Admin</span>
          </Link>
          <nav className="flex flex-1 items-center gap-4 text-sm font-medium">
            <Link href="/admin" className="text-body hover:text-ink">
              Content
            </Link>
            {user.role === "admin" && (
              <Link href="/admin/staff" className="text-body hover:text-ink">
                Staff
              </Link>
            )}
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-body hover:text-ink">
              View site ↗
            </a>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-body hidden sm:inline">{user.name}</span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </>
  );
}
