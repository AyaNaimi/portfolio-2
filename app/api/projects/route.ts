import { NextResponse } from "next/server";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
}

const JSON_SERVER_URL = "http://localhost:3001/projects";

export async function GET() {
  try {
    const response = await fetch(JSON_SERVER_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects: Project[] = await response.json();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects from json-server:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProject: Omit<Project, "id"> = await request.json();
    const response = await fetch(JSON_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const createdProject: Project = await response.json();
    return NextResponse.json(createdProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project in json-server:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedProject: Project = await request.json();
    const response = await fetch(`${JSON_SERVER_URL}/${updatedProject.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProject),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: Project = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating project in json-server:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }
    const response = await fetch(`${JSON_SERVER_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project from json-server:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
