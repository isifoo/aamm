// eat. shared Google Maps logic, used by the page (index.html) and the weekly scan (scan.mjs).
export const box = (s, w, n, e) => ({ low:{latitude:s, longitude:w}, high:{latitude:n, longitude:e} });
// Neighborhood boxes are approximate rectangles (south, west, north, east).
export const ZONES = {
  williamsburg: { name:'Williamsburg',        boro:'Brooklyn',  b:box(40.6990,-73.9690,40.7230,-73.9330) },
  greenpoint:   { name:'Greenpoint',          boro:'Brooklyn',  b:box(40.7205,-73.9620,40.7395,-73.9370) },
  bushwick:     { name:'Bushwick',            boro:'Brooklyn',  b:box(40.6820,-73.9380,40.7110,-73.9050) },
  dumbo:        { name:'DUMBO & Brooklyn Heights', boro:'Brooklyn', b:box(40.6900,-73.9990,40.7060,-73.9800) },
  fortgreene:   { name:'Fort Greene & Clinton Hill', boro:'Brooklyn', b:box(40.6820,-73.9790,40.6990,-73.9560) },
  parkslope:    { name:'Park Slope',          boro:'Brooklyn',  b:box(40.6600,-73.9900,40.6850,-73.9690) },
  midtown:      { name:'Midtown',             boro:'Manhattan', b:box(40.7460,-73.9960,40.7650,-73.9680) },
  chelsea:      { name:'Chelsea & Flatiron',  boro:'Manhattan', b:box(40.7380,-74.0080,40.7480,-73.9850) },
  eastvillage:  { name:'East Village',        boro:'Manhattan', b:box(40.7210,-73.9920,40.7330,-73.9750) },
  westvillage:  { name:'West Village',        boro:'Manhattan', b:box(40.7290,-74.0110,40.7400,-73.9990) },
  les:          { name:'Lower East Side',     boro:'Manhattan', b:box(40.7120,-73.9940,40.7240,-73.9780) },
  soho:         { name:'SoHo & Nolita',       boro:'Manhattan', b:box(40.7180,-74.0050,40.7280,-73.9930) },
  fidi:         { name:'FiDi & Tribeca',      boro:'Manhattan', b:box(40.7010,-74.0160,40.7210,-74.0030) },
  ues:          { name:'Upper East Side',     boro:'Manhattan', b:box(40.7640,-73.9700,40.7880,-73.9450) },
  uws:          { name:'Upper West Side',     boro:'Manhattan', b:box(40.7700,-73.9890,40.8010,-73.9640) },
  harlem:       { name:'Harlem',              boro:'Manhattan', b:box(40.8000,-73.9550,40.8250,-73.9350) },
  astoria:      { name:'Astoria',             boro:'Queens',    b:box(40.7550,-73.9350,40.7780,-73.9050) },
  lic:          { name:'Long Island City',    boro:'Queens',    b:box(40.7380,-73.9600,40.7550,-73.9350) },
};
export const QUERIES = ['restaurants','pizza','italian restaurant','sushi','ramen','japanese restaurant','mexican restaurant','tacos',
  'thai restaurant','chinese restaurant','korean restaurant','indian restaurant','vietnamese restaurant','mediterranean restaurant',
  'middle eastern restaurant','greek restaurant','french restaurant','spanish tapas','latin american restaurant','american restaurant',
  'new american restaurant','burgers','steakhouse','bbq','seafood','oysters','brunch','breakfast','diner','bakery','cafe',
  'bagels deli','sandwiches','vegan restaurant','dessert','wine bar','cocktail bar with food','caribbean restaurant','african restaurant'];
export const FIELDS = ['id','displayName','formattedAddress','rating','userRatingCount','primaryType','types','priceLevel',
  'googleMapsUri','location','businessStatus','currentOpeningHours.openNow'].map(f => 'places.' + f).join(',') + ',nextPageToken';
export const FOOD_TYPES = /restaurant|food|cafe|coffee|bakery|bar|pub|diner|deli|meal|bagel|dessert|ice_cream|pizza|sandwich|steak|brunch|breakfast|tea_house|juice|confectionery/;

export const GENRES = {
  pizza:['Pizza','🍕'], sushi:['Sushi','🍣'], ramen:['Ramen','🍜'], japanese:['Japanese','🍱'], italian:['Italian','🍝'],
  mexican:['Mexican','🌮'], thai:['Thai','🌶️'], chinese:['Chinese','🥟'], korean:['Korean','🍲'], indian:['Indian','🍛'],
  vietnamese:['Vietnamese','🥢'], asian:['Asian','🥡'], mediterranean:['Mediterranean','🫒'], middle_eastern:['Middle Eastern','🧆'],
  greek:['Greek','🥙'], french:['French','🥐'], spanish:['Spanish','🥘'], latin:['Latin','🫓'], caribbean:['Caribbean','🌴'],
  african:['African','🍲'], seafood:['Seafood','🦪'], steak:['Steakhouse','🥩'], bbq:['BBQ','🍖'], burgers:['Burgers','🍔'],
  american:['American','🍗'], brunch:['Brunch','🥞'], diner:['Diner','🍳'], vegan:['Vegan','🥗'], sandwich:['Sandwiches','🥪'],
  deli:['Bagels & Deli','🥯'], bakery:['Bakery','🥖'], cafe:['Café','☕'], dessert:['Dessert','🍦'], bar:['Bars','🍸'],
  wine:['Wine Bar','🍷'], fast:['Fast Food','🍟'], other:['Other','🍽️']
};
export const TYPE_MAP = [
  [/pizza/,'pizza'],[/sushi/,'sushi'],[/ramen/,'ramen'],[/japanese|izakaya|yakitori|tonkatsu/,'japanese'],[/italian|pasta/,'italian'],
  [/mexican|taco|burrito|tex_mex/,'mexican'],[/thai/,'thai'],[/chinese|dim_sum|dumpling|sichuan|szechuan|cantonese|taiwanese|hot_pot|noodle/,'chinese'],
  [/korean/,'korean'],[/indian|pakistani|nepal|bangladeshi|sri_lankan|himalayan/,'indian'],[/vietnamese|pho/,'vietnamese'],
  [/asian|filipino|indonesian|malaysian|burmese|fusion/,'asian'],[/mediterranean/,'mediterranean'],
  [/middle_eastern|lebanese|turkish|israeli|falafel|persian|afghan|kebab|shawarma|moroccan/,'middle_eastern'],[/greek/,'greek'],
  [/french|bistro|creperie/,'french'],[/spanish|tapas|basque/,'spanish'],
  [/latin|peruvian|brazilian|argentin|colombian|cuban|salvadoran|venezuelan|south_american|puerto_rican|dominican|arepa/,'latin'],
  [/caribbean|jamaican|haitian/,'caribbean'],[/african|ethiopian|nigerian|senegalese/,'african'],
  [/seafood|oyster|fish/,'seafood'],[/steak/,'steak'],[/barbecue|bbq/,'bbq'],[/hamburger|burger/,'burgers'],
  [/brunch|breakfast/,'brunch'],[/diner/,'diner'],[/vegan|vegetarian|salad/,'vegan'],[/bagel|deli/,'deli'],[/sandwich/,'sandwich'],
  [/bakery|pastry|patisserie/,'bakery'],[/cafe|coffee|tea_house|juice/,'cafe'],[/dessert|ice_cream|confection|donut|chocolate|candy/,'dessert'],
  [/wine_bar/,'wine'],[/bar|pub|cocktail|lounge|beer|brewery|gastropub/,'bar'],[/fast_food|chicken|hot_dog/,'fast'],[/american|new_american|soul_food|southern/,'american']
];
export const PRICE = {PRICE_LEVEL_FREE:'Free',PRICE_LEVEL_INEXPENSIVE:'$',PRICE_LEVEL_MODERATE:'$$',PRICE_LEVEL_EXPENSIVE:'$$$',PRICE_LEVEL_VERY_EXPENSIVE:'$$$$'};


export function genreFromTypes(primary, types){
  const list = [primary, ...(types||[])].filter(Boolean);
  for (const t of list) for (const [re, g] of TYPE_MAP) if (re.test(t)) return g;
  return 'other';
}

// Turn a Places API (New) result into an eat. place, or null if it is closed or not food.
export function fromGoogle(g){
  if (!g || !g.id || g.businessStatus === 'CLOSED_PERMANENTLY') return null;
  const types = g.types || [];
  if (!FOOD_TYPES.test([g.primaryType, ...types].join(' '))) return null;
  return {
    id:g.id, name:g.displayName?.text || 'Unnamed', address:g.formattedAddress || '',
    rating:g.rating ?? null, userRatingCount:g.userRatingCount || 0, priceLevel:g.priceLevel, primaryType:g.primaryType,
    genre:genreFromTypes(g.primaryType, types), googleMapsUri:g.googleMapsUri,
    location:g.location, openNow:g.currentOpeningHours?.openNow, source:'google'
  };
}

// One Text Search (New) request. Throws an Error carrying Google's error object as .google.
export async function searchText(key, textQuery, bounds, pageToken, { restrict = true, headers = {} } = {}){
  const body = { textQuery, pageSize:20 };
  if (bounds) body[restrict ? 'locationRestriction' : 'locationBias'] = { rectangle: bounds };
  if (pageToken) body.pageToken = pageToken;
  let res;
  try {
    res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method:'POST', headers:{ 'Content-Type':'application/json', 'X-Goog-Api-Key':key, 'X-Goog-FieldMask':FIELDS, ...headers }, body:JSON.stringify(body)
    });
  } catch { throw new Error('No connection to Google Maps'); }
  const j = await res.json().catch(() => ({}));
  if (!res.ok) { const e = new Error(j.error?.message || `Google Maps error ${res.status}`); e.google = j.error; e.status = res.status; throw e; }
  return j;
}

// Run every cuisine query (up to 3 pages each) inside a box. Stops before maxCalls requests.
export async function scanArea(key, bounds, { maxCalls = 150, headers, onProgress } = {}){
  const found = {}; let calls = 0;
  for (let i = 0; i < QUERIES.length; i++) {
    let token = null, page = 0;
    do {
      if (calls >= maxCalls) return { found, calls, capped:true };
      if (onProgress) onProgress(QUERIES[i], i / QUERIES.length, Object.keys(found).length);
      const r = await searchText(key, QUERIES[i], bounds, token, { headers });
      calls++;
      (r.places || []).forEach(g => { const p = fromGoogle(g); if (p) found[p.id] = p; });
      token = r.nextPageToken; page++;
    } while (token && page < 3);
  }
  return { found, calls, capped:false };
}
