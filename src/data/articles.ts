export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  brand: 'bib' | 'redemption';
  readTime: string;
}

export const storiesArticles: Article[] = [
  {
    id: 'coffee-bourbon',
    title: 'Coffee, Bourbon, and the Rituals That Connect Us',
    excerpt: 'At the turn of the twentieth century, two rituals bookended the American day. Fresh-roasted coffee warmed early mornings—fuel for the work ahead. Smooth bourbon brought people together at day\'s end.',
    brand: 'bib',
    readTime: '8 min read',
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

**Celebrating Tradition Year-Round**

Special occasions are full of rituals—some meaningful, some simple. The morning coffee before a busy day. The evening drink after the guests have gone. The moments between chaos and connection.

Bib & Tucker's portfolio offers something for each of those moments. Gold Roast for when morning and evening feel like they should meet in the middle. The Classic Six for celebrations that deserve something smooth and sophisticated. Double Char for quiet evenings by the fire. The Tennessee Ten for the moments worth remembering.

All of them built on the same philosophy the distillery has held since the beginning: bold and refined come together. Crafted to share. Aged to perfection.`,
  },
  {
    id: 'tennessee-bourbon-dressed-to-impress',
    title: 'Bib & Tucker is Tennessee Bourbon Dressed to Impress',
    excerpt: 'A unique bottle attracts the eye: sturdy shape, dark label, typography from a centuries-old general store. Before you know what\'s inside, the bottle is already telling a bigger story.',
    brand: 'bib',
    readTime: '6 min read',
    content: `We've all been there, right? Standing in the liquor store with no fixed goal in mind, looking to feel excited about a new whiskey discovery. Every now and then, a unique bottle like Bib & Tucker attracts our attention for that very reason: its sturdy shape, the dark, neat label, and the typography that feels pulled from a centuries-old general store. Before you even know what's inside, the bottle is already telling a bigger story; life on the dusty highways, oak barrels aging in metal rickhouses, a bottle passed around the campfire to ward off the night, and a sense of familiarity that echoes the spirit of the American heartland.

While Scotch often relies on grand-looking boxes better suited to display cabinets than busy back bars, American whiskey tends to favor a more practical aesthetic: bottles to grab and take with you wherever the road leads. Too often, American whiskey defaults to tall, standard cylindrical bottles in clear glass; functional, utilitarian, but rarely distinctive enough to leave a lasting impression. Bib & Tucker catches the eye for being diametrically opposite. The flask-shaped bottle has a deep amber hue, embossed with the elaborate design of the Bib & Tucker logo with flowing elaborations around the typeface giving it a premium feel, delivering turn-of-the-century Americana with understated sophistication. Those extravagant flourishes on the ampersand get me every time. The bottle feels good in the hand, and it's satisfyingly easy to tug free the stubby little cork for another pour. The stripped back label, unobtrusive and discrete, wraps around the bottle's curves giving away nothing but the bare essentials. Bib & Tucker, only formed in 2014, became part of the Deutsch Family Wine & Spirits portfolio in 2017, but you can almost see the name swinging on a blade sign outside a high-end boutique in centuries past, catering to society's most fashionable citizens. The brand name actually comes from the phrase "in your best bib and tucker," an idiom for dressing in your most elegant clothes for a special occasion or formal event. It's about putting effort into your appearance and giving consideration to how one presents oneself in company. Dress to impress, in other words. Bib & Tucker, it seems, is always in its finest attire.

**Tennessee Bourbon: Small Batch, Six Years or Older**

On closer inspection, this is small batch bourbon whiskey, made in Tennessee, yet every bottle in the range, from The Classic Six and beyond, carries an age statement of 6 years or older; that's a rare thing. Finding mainstream Tennessee whiskey or Kentucky bourbon on a label is commonplace, but Tennessee bourbon? Bourbon can be made anywhere in the U.S., as long as the distillers follow the rules, but Tennessee whiskey takes it one step further. Every drop is mellowed through sugar maple charcoal before barreling, known as the Lincoln County Process, to give it that signature smoothness. Obviously, it can only be made in the great state of Tennessee, where the landscape is a source of a plentiful supply of limestone-filtered water for whiskey making.

At the distillery, Bib & Tucker is double distilled through a column still and a traditional copper pot still from a high rye mashbill of 70% local corn, 26% rye, and 4% malted barley. The corn delivers full-bodied flavors of vanilla and caramel, but it never gets too sweet because rye makes up more than a quarter of the mashbill. That's more than most bourbon made in Tennessee, and that grain adds character, bringing a bold spiciness to the palate. It's matured in carefully selected new American white oak barrels, toasted and charred, which Bib & Tucker fill at a lower-than-average barrel entry proof. That's instrumental to Bib & Tucker's soft and rounded flavors, as the spirit interacts with the oak staves through the seasons, weathering every condition from the sultry heat of July to the biting cold of January's winter storms. The spirit expands and contracts actively inside the barrel, extracting flavor and color over at least six years as the spirit matures, enriching the flavors drawn from the toasted and charred new American white oak. Unlike most bourbon from Tennessee, Bib & Tucker is not chill-filtered and bottled at 46% or 92 proof. Without chill filtration, whiskeys bottled below 46% can turn hazy when ice is added. Bib & Tucker takes two key steps to enhance the mouthfeel of the whiskey in your glass: the Lincoln County Process and deliberately avoiding chill filtration. Together, these techniques preserve and enrich the bourbon's texture, delivering a more authentic and satisfying taste experience.

**The Heart of the Range: Classic Six, Tennessee Ten, and Beyond**

At the heart of the range is Bib & Tucker The Classic Six, their flagship six year old Tennessee bourbon, an age statement that sets it apart from many Kentucky bourbons. Aromas of vanilla, sweet hay, brown sugar, caramel, and mace rise invitingly from the glass. On the palate, the silky, smooth mouthfeel unwraps layers of dark sweetness with pecan pie, vanilla essence, rich fruit, candied ginger, and soft oak, leading to a long, complex finish highlighting distinctive chestnut notes. Stepping up the age ladder, Bib & Tucker The Tennessee Ten opens with aromas of vanilla, roasted corn, pipe tobacco, and leather. After ten years in oak casks, the palate is velvety smooth, revealing buttered corn, peanut, and vanilla flavors followed by deeper layers of cocoa powder, dark chocolate, berry fruits, and hints of Americano. It closes with a warm, spicy finish with lingering cedar notes. If you're lucky, you might spot a bottle of Bib & Tucker 12 year old Small Batch, a rare release, often the preserve of the liquor store private barrel pick selected to offer to loyal customers. Each batch is unique, but those fortunate enough to find it should expect the combination of greater age and the Bib & Tucker signature style to place it in the wheelhouse of vanilla, maple syrup, aged oak, leather, and dark chocolate flavors, supported by an array of attractive wood spices.

**Double Char and Gold Roast: New Flavor Frontiers**

Now that Bib & Tucker has established itself within the ranks of aged Tennessee bourbons, two further innovations have expanded their range to showcase their creative flair. Bib & Tucker Double Char Bourbon was launched in 2023, and puts 6 year old mature liquid used for The Classic Six into a sugar maple smoked barrel subjected to a heavy char, a nod to the Lincoln County Process, for a finishing period of 5 months. Carrying a 6 year old age statement and bottled at 44%, it revels in aromas of salted caramel, oak char, and baking spices, accented with subtle smoky notes. The palate is rich and toasty, revealing flavors of vanilla pod, cinnamon-dusted chocolate doughnuts, and barbecued corn cobs, with a dry finish of blackened oak, cassia quills, and dark vanilla. This was followed by Bib & Tucker Gold Roast Bourbon in 2025, joining this decade's trend for coffee-infused whiskeys. Partnering with Muletown Coffee Roasters based in Columbia, TN, Bib & Tucker 6 year old bourbon is infused with cold-steeped, custom-roasted Arabica coffee beans that Muletown source from the Agalta region of Honduras. It's deeply aromatic, with notes of freshly brewed coffee and dark molasses, underscored by sweet corn and gentle baking spices. Layers of sweet vanilla, firm oak, and milk chocolate yield to a finish of vanilla, oak shavings, toasted spices, and dark roast coffee. It's a perfect balance of the bean and the grain, and a worthy celebration of the heritage of coffee and bourbon traditions.

So next time you're standing in the liquor store, looking for a bottle that promises something a little different, Bib & Tucker might just be the one to stop and explore in more depth. Fortunately, the 6 year old Tennessee bourbon inside proves the bottle isn't just dressed up for show. Like the saying that inspired its name, Bib & Tucker reminds us that good whiskey never goes out of fashion.`,
  },
  {
    id: 'rye-revival',
    title: 'America\'s Original Spirit: How Rye Whiskey Lost a Century—and Found Its Way Back',
    excerpt: 'Before there was bourbon, there was rye. The story of rye whiskey begins with America\'s story. Now, for the first time in a century, rye is back at the forefront.',
    brand: 'redemption',
    readTime: '10 min read',
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

**What It Means for Every Occasion**

From New Year's toasts to quiet evenings, Redemption fits the moment. Fresh starts, celebrations, or simply the turn of a page—there's something fitting about a spirit that embodies second chances and revival.

Redemption isn't just a name on a label. It's a reminder that what was lost can be found again. That traditions worth keeping don't disappear forever—they wait for someone to bring them back. That a spirit strong enough to help found a nation is strong enough to survive a century in the shadows and emerge again.

Whether it's the rye-kissed bourbon with its smooth balance of sweet and spice, the High Rye for those who want bolder character, or the 95% rye that brings pre-Prohibition America into the modern glass—each expression offers something worth raising, any time of year.

This is the Rye Revival.`,
  },
];
