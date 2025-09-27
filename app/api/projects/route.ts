
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

// À configurer dans Vercel et en local
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO; // format: "utilisateur/nom-repo"
const GITHUB_FILE_PATH = process.env.GITHUB_FILE_PATH || "projects.json";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;

export async function GET() {
  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects: Project[] = await response.json();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects from GitHub:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // 1. Récupérer la liste actuelle
    const getRes = await fetch(GITHUB_API_URL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw"
      }
    });
    if (!getRes.ok) throw new Error("Impossible de lire projects.json sur GitHub");
    const projects: Project[] = await getRes.json();

    // 2. Ajouter le nouveau projet
    const newProject: Omit<Project, "id"> = await request.json();
    const maxId = projects.reduce((max, p) => Math.max(max, p.id), 0);
    const createdProject: Project = { ...newProject, id: maxId + 1 };
    const updatedProjects = [...projects, createdProject];

    // 3. Récupérer le SHA du fichier pour le commit
    const metaRes = await fetch(GITHUB_API_URL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json"
      }
    });
    const meta = await metaRes.json();
    const sha = meta.sha;

    // 4. Mettre à jour le fichier sur GitHub
    const putRes = await fetch(GITHUB_API_URL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Ajout d'un projet via l'admin portfolio",
        content: Buffer.from(JSON.stringify(updatedProjects, null, 2)).toString("base64"),
        sha,
        branch: GITHUB_BRANCH
      })
    });
    if (!putRes.ok) throw new Error("Impossible de mettre à jour projects.json sur GitHub");
    return NextResponse.json(createdProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project in GitHub:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // 1. Récupérer la liste actuelle
    const getRes = await fetch(GITHUB_API_URL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw"
      }
    });
    if (!getRes.ok) throw new Error("Impossible de lire projects.json sur GitHub");
    const projects: Project[] = await getRes.json();

    // 2. Modifier le projet
    const updatedProject: Project = await request.json();
    const updatedProjects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);

    // 3. Récupérer le SHA du fichier pour le commit
    const metaRes = await fetch(GITHUB_API_URL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json"
      }
    });
    const meta = await metaRes.json();
    const sha = meta.sha;

    // 4. Mettre à jour le fichier sur GitHub
    const putRes = await fetch(GITHUB_API_URL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Modification d'un projet via l'admin portfolio",
        content: Buffer.from(JSON.stringify(updatedProjects, null, 2)).toString("base64"),
        sha,
        branch: GITHUB_BRANCH
      })
    });
    if (!putRes.ok) throw new Error("Impossible de mettre à jour projects.json sur GitHub");
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project in GitHub:", error);
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
