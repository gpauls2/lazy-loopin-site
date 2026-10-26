import Library from '../components/Library';
import { getLibraryVideos } from '../lib/getLibraryVideos';

export const dynamic = 'force-dynamic';

export default function Home() {
  return <Library videos={getLibraryVideos()} />;
}
