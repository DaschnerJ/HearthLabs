/**
 * 
 */

function isTree(tree) {
  return tree == "alder" || tree == "appletree" || tree == "ash" || tree == "aspen" || tree == "baywillow" || tree == "beech" || tree == "birch" ||
  tree == "birdcherrytree" || tree == "buckthorn" || tree == "cedar" || tree == "cherry" || tree == "chestnuttree" || tree == "conkertree" || 
  tree == "corkoak" || tree == "crabappletree" || tree == "cypress" || tree == "elm" || tree == "fir" || tree == "goldenchain" || tree == "hazel" ||
  tree == "hornbeam" || tree == "juniper" || tree == "kingsoak" || tree == "larch" || tree == "laurel" || tree == "linden" || tree == "maple" ||
  tree == "mulberry" || tree == "oak" || tree == "olivetree" || tree == "peatree" || tree == "pine" || tree == "planetree" || tree == "plumtree" ||
  tree == "poplar" || tree == " rowan" || tree == "sallow" || tree == "spruce" || tree == "sweetgum" || tree == "walnuttree" || tree == "whitebeam" ||
  tree == "willow" || tree == "yew"; // etc
}

function isLog(log) {
	return log.name.endsWith('log');
}

