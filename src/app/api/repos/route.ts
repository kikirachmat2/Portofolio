import { NextResponse } from 'next/server';
import { fallbackCodingProjects, CodingProject } from '@/data/coding-projects';

export const revalidate = 60; // Cache for 60 seconds, then revalidate in the background

export async function GET() {
  try {
    const headers = {
      'User-Agent': 'KikiPortfolio/1.0',
      Accept: 'application/vnd.github.v3+json',
    };

    // 1. Fetch user's public repos from kikirachmat2
    const userReposPromise = fetch(
      'https://api.github.com/users/kikirachmat2/repos?sort=updated&direction=desc&per_page=30',
      { headers, next: { revalidate: 60 } }
    );

    // 2. Fetch external featured repo (acongai/Acong-AI)
    const acongRepoPromise = fetch(
      'https://api.github.com/repos/acongai/Acong-AI',
      { headers, next: { revalidate: 60 } }
    );

    const [userRes, acongRes] = await Promise.allSettled([userReposPromise, acongRepoPromise]);

    let rawRepos: any[] = [];

    if (userRes.status === 'fulfilled' && userRes.value.ok) {
      const data = await userRes.value.json();
      if (Array.isArray(data)) {
        rawRepos = data;
      }
    }

    if (acongRes.status === 'fulfilled' && acongRes.value.ok) {
      const acongData = await acongRes.value.json();
      if (acongData && acongData.name) {
        // Add Acong-AI to the list if not already present
        if (!rawRepos.some(r => r.name.toLowerCase() === 'acong-ai')) {
          rawRepos.unshift(acongData);
        }
      }
    }

    if (rawRepos.length === 0) {
      // Fallback if GitHub is unreachable
      return NextResponse.json(fallbackCodingProjects);
    }

    // Filter out forks and portfolio itself
    const filtered = rawRepos.filter((r: any) => 
      !r.fork &&
      r.name.toLowerCase() !== 'portofolio' &&
      r.name.toLowerCase() !== 'portfolio'
    );

    // Map each repo directly to CodingProject, syncing GitHub About description & website
    const projects: CodingProject[] = filtered.map((r: any) => {
      // Custom display name mapping if needed (e.g. Acong-AI -> Acong Chat)
      let displayName = r.name;
      if (r.name.toLowerCase() === 'acong-ai') {
        displayName = 'Acong Chat';
      }

      const fallback = fallbackCodingProjects.find(
        f => f.name.toLowerCase() === r.name.toLowerCase() ||
             (f.name.toLowerCase() === 'acong chat' && r.name.toLowerCase() === 'acong-ai')
      );

      return {
        name: displayName,
        // Live sync with GitHub repo About description:
        description: r.description?.trim() || fallback?.description || 'Repository project by Fikri Mulya Rachmat.',
        language: r.language || fallback?.language || 'Code',
        html_url: r.html_url || fallback?.html_url,
        homepage: (r.homepage && r.homepage.trim() !== '') ? r.homepage.trim() : (fallback?.homepage || null),
        updated_at: r.updated_at || fallback?.updated_at,
        tags: r.topics?.length ? r.topics : (fallback?.tags || [r.language || 'Code'])
      };
    });

    // Sort by updated_at desc (newest update first)
    projects.sort((a, b) => {
      const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
      const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
      return dateB - dateA;
    });

    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      }
    });
  } catch (err) {
    // If any error occurs, smoothly return fallback data
    return NextResponse.json(fallbackCodingProjects);
  }
}
