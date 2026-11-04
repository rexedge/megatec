import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { ProjectForm } from "../project-form";

export const metadata: Metadata = { title: "Add a project" };

export default async function NewProjectPage() {
  await requireStaff();
  return (
    <>
      <PageHeader
        title="Add a project"
        intro="It goes at the end of the list; move it up afterwards if you like."
        back={{ href: "/admin/projects", label: "Projects" }}
      />
      <ProjectForm
        id={null}
        values={{
          name: "",
          location: "",
          description: "",
          categories: [],
          image: null,
          focus: "center",
          onHome: false,
          onProjectsPage: true,
          published: true,
        }}
      />
    </>
  );
}
