import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { knownVideos, type Category, type Video } from '../data/videos';

const CONTENT = path.join(process.cwd(), 'public', 'content');
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);
const VIDEO_EXT = new Set(['.mp4', '.mov', '.webm']);
const categories: Category[] = ['Watchlists', 'Movie Breakdowns', 'Original Stories'];

const slugify = (value: string) =>
  value.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const fileUrl = (folder: string, filename: string) =>
  `/content/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;

export function getLibraryVideos(): Video[] {
  if (!fs.existsSync(CONTENT)) return [];
  const folders = fs.readdirSync(CONTENT, { withFileTypes: true })
    .filter(item => item.isDirectory()).map(item => item.name);
  const result: Video[] = [];

  for (const folder of folders) {
    const directory = path.join(CONTENT, folder);
    const files = fs.readdirSync(directory, { withFileTypes: true })
      .filter(item => item.isFile()).map(item => item.name);
    const known = knownVideos.find(item =>
      item.folder.toLocaleLowerCase() === folder.toLocaleLowerCase() ||
      item.title.toLocaleLowerCase() === folder.toLocaleLowerCase()
    );
    const images = files.filter(f => IMAGE_EXT.has(path.extname(f).toLowerCase()));
    const coverName = images.find(f => path.parse(f).name.toLowerCase() === folder.toLowerCase())
      ?? images.find(f => /cover|poster|thumbnail/i.test(f))
      ?? images[0];
    const videos = files.filter(f => VIDEO_EXT.has(path.extname(f).toLowerCase()));
    const videoName = videos.find(f => f.toLowerCase() === 'result.mp4')
      ?? videos.find(f => f.toLowerCase() === 'result.webm')
      ?? videos.find(f => f.toLowerCase() === 'result.mov')
      ?? videos[0];

    let category: Category = known?.category ?? 'Original Stories';
    const categoryFile = files.find(f => f.toLowerCase() === 'category.txt');
    if (categoryFile) {
      const value = fs.readFileSync(path.join(directory, categoryFile), 'utf8').trim();
      if (categories.includes(value as Category)) category = value as Category;
    }
    const tiktokFile = files.find(f => f.toLowerCase() === 'tiktok.txt');
    const tiktokText = tiktokFile
      ? fs.readFileSync(path.join(directory, tiktokFile), 'utf8').trim() : '';
    const tiktokId = tiktokText.match(/(?:\/video\/)?(\d{15,22})/)?.[1] ?? known?.id;
    result.push({
      title: known?.title ?? folder,
      slug: known?.slug ?? slugify(folder),
      folder, category, id: tiktokId, featured: known?.featured,
      cover: coverName ? fileUrl(folder, coverName) : null,
      source: videoName ? fileUrl(folder, videoName) : null,
    });
  }
  return result.sort((a, b) =>
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
    (knownVideos.findIndex(v => v.slug === a.slug) === -1 ? 999 : knownVideos.findIndex(v => v.slug === a.slug)) -
    (knownVideos.findIndex(v => v.slug === b.slug) === -1 ? 999 : knownVideos.findIndex(v => v.slug === b.slug))
  );
}
