// Used to separate long string from main data (prevent cluttering)

const descriptions = {
    abbey: "A large, elevated abbey situated on a hill fills the centre of the map, flanked by four routes allowing passage from the north and south. Hills and ravines provide significant protection against artillery fire on the edges of the map while also funneling attackers into narrow paths and preventing easy access to other flanks. The central abbey is a contested hotspot, so a majority of players can be expected to clash between the buildings, while the hills and surrounding forests make ideal ambushing grounds for TDs or SPGs to conceal themselves and fire upon others in the abbey.",
    berlin: "A recreation of the Reichstag assault during the final days of War in Europe.",
    cliff: "Starting in the north and south, both teams are connected through a valley on the extreme west of the map and a less direct route across the eastern plateau. Large boulders and a small town provide cover for those waiting outside the bottlenecked valley, with less cover offered for plateau-goers as they harass skirmishers below. Both flanks of the map must be accounted for; though seizing the central elevated area provides control over all other routes, it is not an easily defensible position and falls quickly to coordinated flank attacks.",
    empires_border: "This map was originally exclusive to the Chinese server, but after receiving positive feedback from its home audience, it received an HD update and was released globally in update 1.2. Teams begin in opposite corners of the map, with routes between the two bases surrounded by imposing mountains and uneven terrain that limit vision and movement across the map. Various regions boast various altitudes and allow for different tactics.",
    ensk: "A labyrinth of city blocks and suburban areas span this map, with railroad tracks separating the two areas. Plan your tactics to take advantage of defensive choke points and cover open areas with your vehicles. Artillery is great for deterring enemy breakthroughs, but remains almost defenseless when exposed to enemy vehicles attacking from cover.",
    fishermans_bay: "The map is a combination of open spaces and irregular terrain. Meandering narrow streets of the seaport on the flank can be surprisingly advantageous. Sloping hills covered with bushes offer excellent ambush opportunities. this is a hard map, and can be quite boring too. A lot of light and fast medium tanks head into the central ridge of the map and have a standoff, while some heavies head to the town and others head around to a small gully that runs along the edge of the map. Other mediums and especially TDs head here too, and they can do very well.",
    fjords: "Huge mountains and narrow valleys offer great advantages in a battle. You can engage in a fire duel across the gulf or enter a close quarter battle at the nearest port town or flank and capture enemy base. This is a tricky map to play, and there are two main combat zones. A huge hill in the north ends of being a vital strategic point, if you do not successfully protect or take this then you will lose, there is no question of it. The other main point of combat is down the other side of the map, where heavies slug it out for a while.",
    highway: "The diverse landscape of this map makes it peculiar and complex, and also encourages a wide range of tactics. Multiple defilades are favorable for surprise attacks, while the city blocks are advantageous for close combat. The long stretch of road provides optimal mobility but it's exposed and open to artillery.",
    himmelsdorf: "Literally translated as \"sky village\" from German, this labyrinth of streets and squares are a large hindrance for artillery and tank destroyers, but ideal for speedy breakthrough and bypass by medium and light vehicles. The castle is obviously a point of domination on the map, with either side vowing to claim the higher advantage over their enemies. However the hills are steep and can be slow on the advance but deadly on the descent.",
    karelia: "Swamps, rocks, and cliffs determine major avenues of approach on this map. This map, with sparse protection and no buildings, gives the combat advantage to artillery. Concentrate your attacks along the path of your main advance, while conducting delaying and defensive actions along the rest of your front lines. This is a bit of a strange map, and can be hard to play, especially for beginners. There is one main piece of advice to give, however. Unless you are a fast scout and you know what you are doing, or it is late game and your team has secured the area, DO NOT cross the central swamp area. It is a death trap, particularly for slow-moving or low-tiered tanks.",
    lakeville: "An isolated mountain valley on one flank and city blocks on the other allow you to employ either urban or rural tactics. The large valley offers the sole contest point as either side struggle through the bottleneck. A small mountain trail winds along, next to the water side but offer little to no cover from snipers attacking from the town on the other side. Lights can use the town to dart around enemy survelliance but run the risk of being shotgunned by cunning SPGs using it to conceal themselves from enemy fire.",
    live_oaks: "In the centre of the map there is a large bog lake. A railway bridge and a fording side on the one flank allow to defend the area using scarce forces, and to concentrate main forces on the other flank. This is a hard map, as victory depends on whether your team secured both flanks, or alternatively, secured one while holding off the enemy on the other. Which side to go on is entirely choice, and you see tanks of all kinds going into the city and the bridge. This is a good fun map, but it can be frustrating, especially if you are slow moving.",
    malinovka: "Initial staging areas are separated by a wide open field, ideal for artillery and defensive operations. Make use of flanking maneuvers and natural defenses like woods, hills, and farmhouses, as these can be decisive. Another option is a well-coordinated high-speed combined arms attack across the field which could bring victory, but at the risk of a bloody loss. Colloquially also known as \"Campinovka\" for the tendency of most players to just sit behind cover on their side of the starting field and snipe each other.",
    mines: "A flat hilltop in the center of this map provides the obvious central point of contest on this map. Nestled in the canyon northeast of the hill is the small village of Pagorki; offering a tempting route with plenty of cover, but one that is exposed if the enemy controls the hill. West of the hill, surrounded by shallow water, is a small island which offers good cover while providing a large fire zone. While the island is protected from the hill, it is, for the most part, vulnerable to flanking attacks or fire from multiple angles. The island cover is solid, but not particularly large. Watch for the plateau, to the north of the map, which is often offering a good vantage point for TDs and Artillery; Especially being a viewpoint over the battlefield around it.",
    minsk: "As we all know, Minsk is a city that is close to the heart of Wargaming. After all, the company was founded in the Belarusian capital. The new map creates the city’s center at the beginning of the 1970s. Though some things have been adjusted for the sake of gameplay, if you’ve visited Minsk, landmarks will be instantly recognizable. If not, just take in the scenery of this virtual city and dive into the past!",
    mountain_pass: "A large map with many turns and rough ground. The bridge near the center features natural choke points on both sides, and provides a good sniping position against opponents in the north passes if held. There are small positions for artillery near the bases, though artillery may have difficulty due to the terrain. Heavies generally choose the side that has a more open view of the shallow lake, and not many people end up going down the other side, so it has some flanking opportunities. the bridge is an area to be wary of, not just because of other tanks, but because of the fact that it is so easy to kill yourself by accidentally driving off it.",
    murovanka: "A small town dominates the centre of the map, with a large forest providing concealment in the east and high ground to the west. The forest provides effective concealment, but lacks cover from fire; whereas the town has plentiful cover, but lacks concealment. Murovanka is a hard map to play, and quite unpredictable. If it is Encounter, then there will be chaos around the capture circle, but otherwise the fighting is even on both sides. In a lower team game I have seen successful flanking maneuvers by fast scouts, who can cause chaos at the back.",
    overlord: "New map as of patch 9.7. Appears to be limited to tiers 6-10. A relatively flat beachhead leads up to fields surrounded by hedgerows. Teams start up by the hedgerows, so the beach is only a corridor for flanking.",
    paris: "A French map introduced to random battles in patch 9.16. The map features a large, open area in the north with bushes located near the endpoints of the central buildings, a bush-covered hill on either side, and a small mound at the center of the far north end. Several avenues on either side of the map lead down to the center of the map, which does not have much in the way of cover, but can allow for spotting & sniping down said avenues if used correctly. The south end of the map consists of a city area (again, with avenues leading to the center) and a smaller, semi-open area with several buildings and rubble mounds for cover, a bridge, and two different levels of terrain elevation (as a result of the bridge and its ending points) around the south end.",
    pearl_river: "Rugged terrain is favorable for various battle tactics; ambushes, unexpected flanking maneuvers, and close encounters. Moving along the riverbed allows you to swiftly approach the enemy base and get into action. Go through the middle will let you the possibility to flank the north and south. However, do not leave your rear undefended! This map was removed from Random Battle Mode in Patch 0.9.10 before reintroduced in Patch 1.9.1.",
    pilsen: "A new, Czech-inspired map introduced in patch 9.13 to coincide with the release of the Czechoslovakian medium tank branch. The map features several smaller buildings on the left flank with corridors positioned along either side of them, a large, empty factory building in the center, and some more open terrain on the right flank, featuring slight hills and a small scattering of houses for cover.",
    prokhorovka: "Generally open, but hilly, terrain around a vital railroad, with groups of trees providing shelter for tank destroyers. On the offensive, watch your own flanks while striking against the enemy flanks. Artillery has free reign, with the only real hindrance being the train cars themselves, but the open terrain makes them very vulnerable to raids by light vehicles",
    province: "Hills on the periphery of the map are covered with numerous houses and winding streets advantageous for surprise attacks. An open area between the bases is favorable for daring strikes. This map was removed from Random Battle Mode in Patch 9.10, but has returned in Update 1.0.1 with high definition redesigned graphics for battle tiers IV to VII.",
    redshire: "A rolling area, dominated by a couple of hills. The village of Redshire gives places to hide from hill to its northeast. Artillery will play a powerful role on this map. At the beginning of the game, many light tanks will rush the central capture circle (in encounter). This should be stopped as soon as possible, as it can create some serious problems later. Many mediums and some heavies head to the castle, this can be a crucial control point but generally ends up as a stalemate. the other side of the map is generally dominated by heavies, and is also crucial. This map is quite hard to play, but it can be very fun.",
    ruinberg: "Concentric city streets, along with dense forests and bushes in the overgrown park allow for hidden maneuvers and redeployment of your troops. Although artillery fire is of limited use in the city, the debris provides effective cover for your troops. many lights and mediums head to the tiny town on the main road, this is generally a standoff until the late-game. Heavies of course go to battle in the city, and this is the deciding factor of the battle. if you ca get some tanks around the back side of the church then you can create alot of chaos.",
    serene_coast: "This coastal area is bounded by ocean and mountains. A railroad crosses the territory from north to south. Small hills on the western flank are favorable for a swift attack. A straight road connecting the bases passes through a small town, which often becomes a contested piece of terrain. There is also a low ground beside the town, witch could use for flanking the west and the middle. The bases are protected by the hills from direct attacks. However, the flanks of the bases are insecure and must be protected.",
    siegfried_line: "A wonderful map combining the best of both worlds. The west side is open fields with little cover, excellent for quick flanks around the side for those looking for an early victory. To the east, the town offers concealment and cover for those brave enough to enter its confines. Most of the fighting will happen in the town. Unless you are a light tank or know you are not going to be spotted DO NOT go out into the central field. Also, DO NOT go down the strip behind the city, there will be death on swift wings waiting for you there. Successful manouvers have been made over the hills on the north of the map, and these can be very game-changing if successful. Overall, this is a fun map that if you play well you can really play well.",
    steppes: "A seemingly endless open expanse of fields and hills, scattered through this farmland-esque map. Open fields, varying ditches, and small hills and rises litter this map, allowing for some prime spots to lay ambushes. Long, open fields are great for those who prefer long-distance combat, with little cover available to your target. Just remember; This works both ways. This map generally ends with one team taking one flank, and one taking the other. It is important that both are taken. No matter how tempting it is, DO NOT go down the central road until the late game, it is guaranteed suicide.",
    studzianki: "Not based on any historical location in particular, but inspired by the great battle near Studzianki, this map combines open spaces with some brawling spots. The location encompasses large fields, lots of vegetation, small village houses centered around a tall church. Dead center of the map is a small brick factory that will become a important point of interest during the course of battle.",
    tundra: "A mountain in the east offers the possibility of dominating from the high ground, while the central part of the map offers a wide range of tactical advantages. The village in the west could offer some linear combat for heavy tanks. Heavy tanks generally end up around a large rocky hill to the west, fighting along a gully there. The bridge in the middle can be good place for lightning maneuvers into the enemy base, but these should be done with caution. The other main point of conflict is the hill in the East, where many tanks go and fight around a couple of small rocks. This can be a very dangerous place for people who are not aware of what is going on around them. The map has many, many sniping positions that can be used well, and Spgs generally hang out at the back. This is a very good and fun map, but it can be challenging too.",
    westfield: "A wonderfully lush area, Westfield features forests, fields, farmland, and multiple villages throughout the map. Included is a large war-damaged bridge crossing the eastern valley. Plentiful ridges give ambush positions along nearly every route, and large fields can leave a tank vulnerable when moving between positions. it is not recommended to go down the central valley unless you are a scout or it is the very late game, as it is a pretty useless area. Heavy tanks, Strong Mediums and some Tank Destroyers en up fighting on the hills next to the small town. Fast mediums and Fast Tank Destroyers can have a good game by going over to the other side of the valley, although they amy need scouts over here to perform well. The Bridge on center of this map is connected until 6.4 patch.",
}

export default descriptions