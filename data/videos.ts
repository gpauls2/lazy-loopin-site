export type Category = 'Watchlists' | 'Movie Breakdowns' | 'Original Stories';
export type Video = {
  title: string;
  slug: string;
  id?: string;
  category: Category;
  featured?: boolean;
  cover: string | null;
  source: string | null;
  folder: string;
};
type Known = Pick<Video, 'title' | 'slug' | 'id' | 'category' | 'featured'> & { folder: string };
export const knownVideos: Known[] = [
  { title:'Top 5 Most Anticipated Movies Still Coming in 2026',slug:'top-5-most-anticipated-movies-still-coming-in-2026',id:'7683202201497537813',category:'Watchlists',folder:'Top 5 Most Anticipated Movies Still Coming in 2026'},
  { title:'The Odyssey in 2 Minutes — The War Followed Him Home',slug:'the-odyssey-in-2-minutes-the-war-followed-him-home',id:'7683202892056055060',category:'Movie Breakdowns',folder:'THE ODYSSEY IN 2 MINUTES THE WAR FOLLOWED HIM HOME'},
  { title:'Parasite in 2 Minutes — The House Wasn’t Empty',slug:'parasite-in-2-minutes-the-house-wasnt-empty',id:'7683203488708381972',category:'Movie Breakdowns',folder:'Parasite in 2 Minutes The House Wasn’t Empty'},
  { title:'Top 5 Most Thrilling Korean Dramas to Watch in 2026',slug:'top-5-most-thrilling-korean-dramas-to-watch-in-2026',id:'7684105129787739412',category:'Watchlists',folder:'Top 5 Most Thrilling Korean Dramas to Watch in 2026'},
  { title:'If You Liked Stranger Things, Watch These 5 Series Next',slug:'if-you-liked-stranger-things-watch-these-5-series-next',id:'7684634675893062932',category:'Watchlists',folder:'If You Liked Stranger Things, Watch These 5 Series Next'},
  { title:'Top 5 Japanese Action-Comedy Movies You Need to Watch',slug:'top-5-japanese-action-comedy-movies-you-need-to-watch',id:'7685002322090429717',category:'Watchlists',folder:'Top 5 Japanese Action-Comedy Movies You Need to Watch'},
  { title:'Take Charge of My Heart',slug:'take-charge-of-my-heart',id:'7685723944632012052',category:'Original Stories',folder:'Take Charge of My Heart'},
  { title:'Top 5 Comedy Series',slug:'top-5-comedy-series',id:'7686113973866941717',category:'Watchlists',folder:'Top 5 Comedy Series'},
  { title:'Final Interview 2026',slug:'final-interview-2026',id:'7686517649668345108',category:'Original Stories',featured:true,folder:'Final Interview 2026'},
  { title:'Trauman Show',slug:'trauman-show',id:'7687214153605467413',category:'Original Stories',folder:'Trauman Show'},
  { title:'Ready Player One',slug:'ready-player-one',id:'7691948758132608257',category:'Movie Breakdowns',folder:'Ready Player One'},
  { title:'The Prestige Ending Explained — Who Was the Real Monster?',slug:'the-prestige-ending-explained-who-was-the-real-monster',id:'7692021089144163605',category:'Movie Breakdowns',folder:'The Prestige Ending Explained Who Was the Real Monster'},
  { title:'7 Hidden Clues in Shutter Island That Reveal the Truth',slug:'7-hidden-clues-in-shutter-island-that-reveal-the-truth',id:'7692397178173607189',category:'Movie Breakdowns',folder:'7 Hidden Clues in Shutter Island That Reveal the Truth'},
  { title:'Top 5 Thai Rom-Coms',slug:'top-5-thai-rom-coms',id:'7700149909583842561',category:'Watchlists',folder:'TOP 5 THAI ROM-COMS'},
  { title:'Freaks (2018)',slug:'freaks-2018',id:'7700151508389629185',category:'Movie Breakdowns',folder:'Freaks 2018'},
];
export const tiktokLink = (id: string) => `https://www.tiktok.com/@lazyloopin/video/${id}`;
