'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  brand: 'bib' | 'redemption' | 'both';
  category: 'history' | 'craft' | 'culture';
  readTime: string;
}

const articles: Article[] = [
  {
    id: 'coffee-bourbon-rituals',
    title: 'Coffee, Bourbon, and the Rituals That Connect Us',
    excerpt: 'At the turn of the twentieth century, two rituals bookended the American day. Fresh-roasted coffee warmed early mornings—fuel for the work ahead. Smooth bourbon brought people together at day\'s end—a reward for the work behind.',
    content: `At the turn of the twentieth century, two rituals bookended the American day. Fresh-roasted coffee warmed early mornings—fuel for the work ahead. Smooth bourbon brought people together at day's end—a reward for the work behind. Cities were growing. Skyscrapers were going up. Railroad tracks were going down. New inventions were changing how people gathered and celebrated. And through it all, these two rituals held steady.

It was an era where all bourbon was small batch. Great accomplishments were celebrated with toasts—from East Coast tycoons closing deals to West Coast cowboys finishing cattle drives.

Bib & Tucker, a Tennessee distillery that draws its name and aesthetic from this period, has spent years crafting bourbons that honor tradition. Gold Roast Bourbon bridges morning coffee and evening bourbon—rituals.

**Gold Roast: An Experiment in Connection**

The idea behind Gold Roast Bourbon started with partnership. Bib & Tucker approached a local Tennessee roaster with an unusual request: develop a custom blend of premium Arabica beans specifically designed to complement bourbon. Not coffee-flavored whiskey. Something that required patience and precision.

Those beans are steeped directly in Bib & Tucker's cask strength six-year whiskey, allowing them to slowly release their oils and aromatics into the spirit. Then comes the careful work of blending—calibrating the final batch so that coffee enhances rather than overwhelms.

Bottled at 92 proof, inviting aromas of freshly brewed coffee and rich molasses rise, complemented by subtle notes of sweet corn and spice. On the palate, smooth layers of vanilla and young oak blend with milk chocolate. The finish is medium-long, highlighted by lingering oak and vanilla, accented by just a hint of dark roast coffee and brown spice.

The distillery's goal is simple: Gold Roast Bourbon is here to reenergize real connection. Whether enjoyed neat, on the rocks, or in an elevated Old Fashioned, it's designed for the moments when slowing down matters.

**The Craft Behind the Bottle**

Understanding Gold Roast means understanding the foundation it's built on. Bib & Tucker ages all its bourbon in the rolling hills of Tennessee, where climate does much of the heavy lifting. Heat and humidity in summer, cold in winter—these shifts put barrels through constant expansion and contraction, creating more contact between spirit and wood. Over a minimum of six years, this develops into bourbon with depth that doesn't sacrifice smoothness.

The barrels themselves receive careful attention. Bib & Tucker uses new American white oak, selected and thoroughly dried to reduce the tannins that can make younger bourbons harsh. Before filling, the bourbon is filtered through sugar maple charcoal—the Lincoln County Process that distinguishes Tennessee whiskey from its Kentucky cousins.

Toasting and charring the barrels brings out the wood's natural sugars, which caramelize and concentrate, adding rich color and flavor as the whiskey ages. Too little time in the barrel creates aggression—a bite where there should be a smolder. Too much time lets tannins dominate, losing the complexity that good bourbon is known for.

The mash bill combines corn, rye, and barley—each grain with a job to do. Corn adds caramel and vanilla. Rye brings spice and boldness. Barley rounds everything out, adding refinement and smoothness. Today, each barrel laid down for aging is sourced from corn grown within 90 miles of the distillery.

**The Portfolio: Expressions of the Same Philosophy**

Gold Roast is the newest member of a portfolio built on a consistent principle: bold and refined can coexist.

The Classic Six, Bib & Tucker's flagship expression, established the house style. Aged a minimum of six years, it leads with vanilla and sweet hay on the nose, accented by sandalwood and mace. The palate is smooth and balanced, with a hint of pecan pie sweetness. The finish—what the distillery calls their "signature chestnut finish"—is complex and long-lasting.

Double Char explores what fire can add to bourbon. Inspired by the turn of the century, when food was cooked on open flame, this expression is aged twice: first for six years in new white American oak, then for a minimum of five months in a second heavily charred and smoked new barrel. That second barrel is smoked with sugar maple, paying homage to the Lincoln County Process.

The result is a bourbon with a touch of smoke on the nose—toasted oak and dulce de leche, cinnamon and clove. On the palate, vanilla and sugar maple are surrounded by what the distillery describes as "white smoke," with hints of sweet corn and toasted cinnamon. The finish is medium to long, with oak, white smoke, and vanilla.

The Tennessee Ten takes a different path: patience. Aged for a full decade and deliberately not chill-filtered, it offers greater depth of flavor than standard practice allows. The nose reveals vanilla layered with sweet roasted corn, toasted oak, and pipe tobacco. The palate has a velvety entry with balanced sweetness, evolving into a warm, slightly dry mid-palate touched with cocoa. The finish enrobes the senses with spicy cedar and kettle corn.

**Celebrating Holidays and Tradition**

The holidays are full of rituals—some meaningful, some obligatory. The morning coffee rushed before wrapping gifts. The evening drink after the guests have gone. The moments between chaos and connection.

Bib & Tucker's portfolio offers something for each of those moments. Gold Roast for when morning and evening feel like they should meet in the middle. The Classic Six for celebrations that deserve something smooth and sophisticated. Double Char for quiet evenings by the fire. The Tennessee Ten for the moments worth remembering.

All of them built on the same philosophy the distillery has held since the beginning: bold and refined come together. Crafted to share. Aged to perfection.`,
    brand: 'bib',
    category: 'culture',
    readTime: '8 min read',
  },
  {
    id: 'rye-revival',
    title: 'America\'s Original Spirit: How Rye Whiskey Lost a Century—and Found Its Way Back',
    excerpt: 'Before there was bourbon, there was rye. The story of rye whiskey begins with America\'s story. When colonists arrived in the New World with a taste for distilled spirits, they found hardy rye grain abundant across the colonies.',
    content: `Before there was bourbon, there was rye.

The story of rye whiskey begins with America's story. When colonists arrived in the New World with a taste for distilled spirits, they found hardy rye grain abundant across the colonies. By the late 1600s, small rye distilleries were appearing throughout the Eastern seaboard. The whiskey they produced was full-bodied and bold—a spirit that matched the character of the rough-hewn pioneers who were busy founding a nation.

In rye whiskey, early Americans found something that felt like them: strong, resilient, and absent of false notes. As the colonies grew, so did the love for this uniquely American spirit.

Then came 1773, when the Sons of Liberty threw a tea party in Boston Harbor and changed history. As Americans rejected all things British—including rum and gin—bold American rye whiskey filled the void. Distilleries sprang up across colonial America. From the early 1800s through the Roaring Twenties, no other spirit came close in popularity. Through the Industrial Revolution, the Civil War, and World War I, generation after generation made rye their drink of choice.

And then, almost overnight, it nearly disappeared.

**The Lost Century**

Prohibition didn't just interrupt the production of rye whiskey—it broke the chain of tradition. A love for rye that had been woven into the fabric of American life for over a century was undone by the Eighteenth Amendment.

By the time Prohibition ended in 1933, the landscape had shifted. Bourbon's biggest advantage was corn subsidies that made it cheaper to produce. Kentucky, with its abundant corn crops, ramped up production quickly. Old World spirits like Scotch, vodka, and gin flooded into America. Before rye had a chance to reopen its distilleries, new love affairs had begun with whatever was most readily available.

Crowded out by these forces, rye fell into a state of perpetual decline. Where it had once been an American rite of passage, new generations grew up without ever knowing it existed. For nearly a hundred years, America's original whiskey remained in the shadows.

**The Revival**

Now, for the first time in a century, rye is back at the forefront of the American whiskey conversation—coveted by aficionados and bartenders alike. Ask any bartender worth their shaker, and they'll tell you nothing can replace it. The bold, spicy character that made it America's favorite spirit before Prohibition is exactly what a new generation is discovering.

Redemption Whiskey has positioned itself at the center of this revival. Their approach is straightforward: recreate the classic American whiskey that ruled glasses before Prohibition, using recipes inspired by pre-Prohibition traditions that bring forth truly distinctive "rye-forward" notes.

The name itself carries meaning. This isn't just whiskey—it's a second chance for a spirit that nearly vanished from American culture. A comeback story of perseverance, resilience, and the enduring nature of integrity.

**The Master Blender: Whiskey with Soul**

Behind Redemption's portfolio is Alan Kennedy, the brand's Master Blender. Originally from Nashville, Tennessee, and now based in Lexington, Kentucky, Kennedy brings a path to whiskey-making that's anything but conventional.

His journey began in culinary school, where he trained as a classical pastry chef and became a certified sommelier. That foundation—understanding how flavors build and balance—shapes his approach to blending. When Kennedy moved to Kentucky, he trained under revered distillers and blenders, learning everything from hand-picking grains to filling and rolling barrels to the meticulous art of blending.

What sets Kennedy apart is his philosophy. He discovered it wasn't just the science of whiskey-making that intrigued him, but the sensorial artistry. He began focusing on creating whiskeys that had what he calls "soul"—relying on his senses, the feeling one gets on a hot summer day, the memory a certain scent evokes. Kennedy blends from the heart, creating whiskeys that recall a memory or feeling and sharing them with the world.

His goal: ensuring that every sip delivers the highest quality and maximum flavor, while bringing new releases that take inspiration from the past while reimagining rye for today.

**The Bourbon: Rye-Forward by Design**

Redemption's bourbon embodies this philosophy. At 88 proof with a rye content of 21%, it's distinguished by its subtle rye-forward flavor—a light but distinct hint of spice that sets it apart from sweeter, corn-heavy bourbons.

The mash bill tells the story: 75% corn, 21% rye, 4% malted barley. That rye percentage gives the bourbon its character. On the nose, caramel arrives with just a touch of spice and hints of over-ripe banana. The palate reveals toffee, kola nut, and baking spice, with nuanced anise and black pepper. The finish is smooth, with a sweet and spicy balance between corn and cracked pepper.

It's a bourbon designed to be easy drinking but never boring—equally at home on the rocks or mixed into a classic cocktail.

**High Rye Bourbon: When "High" Means Something**

For those who want even more rye character without leaving bourbon behind, Redemption's High Rye Bourbon pushes the boundaries. At 36% rye content—significantly higher than comparable bourbons—it delivers a unique combination of flavors: subtly sweet but punctuated by rich notes of rye spice.

The nose offers light vanilla, red berry fruitiness, and a slight hint of oak. The palate is spicy, woody, and minty, with fennel-like notes of light licorice and black pepper from the rye. The finish is long and smooth, with a nice spice that lingers.

This is bold bourbon for those who know what they're looking for.

**The Rye: 95% and Uncompromising**

Redemption's signature rye represents the purest expression of the brand's mission. With a rye content of 95%—well past the 51% required for the category—it recreates the classic American whiskey that ruled glasses before Prohibition.

The nose is big and spicy: toasted oak, vegetal notes, allspice and anise. The palate reveals beautiful rye spice with light floral and citrus notes alongside dark spices and black pepper. The finish offers a slight mint character that makes it ideal for sipping or mixing in a classic cocktail.

This isn't a compromise or a nod to history—it's a full commitment to what American rye was meant to be.

**What It Means for the Holidays**

New Year's Eve has always been about fresh starts—resolutions, new beginnings, the turning of a page. There's something fitting about toasting that moment with a spirit that embodies the same idea.

Redemption isn't just a name on a label. It's a reminder that what was lost can be found again. That traditions worth keeping don't disappear forever—they wait for someone to bring them back. That a spirit strong enough to help found a nation is strong enough to survive a century in the shadows and emerge again.

Whether it's the rye-kissed bourbon with its smooth balance of sweet and spice, the High Rye for those who want bolder character, or the 95% rye that brings pre-Prohibition America into the modern glass—each expression offers something worth raising to the new year ahead.

This is the Rye Revival.`,
    brand: 'redemption',
    category: 'history',
    readTime: '10 min read',
  },
];

export default function ArticlesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <>
      <section
        id="articles"
        ref={ref}
        className="relative py-16 md:py-24"
        style={{ background: '#FAF7F2' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4" style={{ color: '#2D2926' }}>
              Featured Stories
            </h2>
            <p className="text-lg md:text-xl font-light" style={{ color: '#78716C' }}>
              Discover the heritage, craftsmanship, and stories behind American whiskey
            </p>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedArticle(article)}
              >
                {/* Article Header */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        background: article.brand === 'bib' ? 'rgba(200, 90, 54, 0.15)' : 'rgba(253, 148, 25, 0.15)',
                        color: article.brand === 'bib' ? '#C85A36' : '#FD9419',
                      }}
                    >
                      {article.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs" style={{ color: '#8B8B8B' }}>
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-tight group-hover:opacity-80 transition-opacity" style={{ color: '#2D2926' }}>
                    {article.title}
                  </h3>

                  <p className="text-base leading-relaxed mb-6" style={{ color: '#78716C' }}>
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: article.brand === 'bib' ? '#C85A36' : '#FD9419' }}>
                    <span>Read Full Story</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  const paragraphs = article.content.split('\n\n').filter(p => p.trim());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="min-h-screen flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b" style={{ borderColor: '#E5E3DD' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    background: article.brand === 'bib' ? 'rgba(200, 90, 54, 0.15)' : 'rgba(253, 148, 25, 0.15)',
                    color: article.brand === 'bib' ? '#C85A36' : '#FD9419',
                  }}
                >
                  {article.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}
                </span>
                <span className="text-xs" style={{ color: '#8B8B8B' }}>
                  {article.readTime}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight" style={{ color: '#2D2926' }}>
              {article.title}
            </h2>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 max-h-[70vh] overflow-y-auto">
            <div className="prose prose-lg max-w-none" style={{ color: '#4A4A4A' }}>
              {paragraphs.map((paragraph, index) => {
                const isHeading = paragraph.startsWith('**') && paragraph.endsWith('**');
                if (isHeading) {
                  const headingText = paragraph.replace(/\*\*/g, '');
                  return (
                    <h3 key={index} className="text-2xl font-serif font-bold mt-8 mb-4" style={{ color: '#2D2926' }}>
                      {headingText}
                    </h3>
                  );
                }
                return (
                  <p key={index} className="mb-6 leading-relaxed text-base md:text-lg">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
