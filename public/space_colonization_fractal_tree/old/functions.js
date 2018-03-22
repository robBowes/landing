/*
 * - Look at the branches
 * - If there is a leaf between the max and min of the branch bend the branch towards the leaf and remove the leaf from the array
 * - If the branch was bent, add a branch in the direction of it's parent
 * - If there is no leaf between the max and min, add a branch to the end if there is no next in the direction of it's parent
 * - repeat
 */
let growRoot = (tree, unreachedleaves, count) => {
    count++;
    if (count > 100) return console.log('count reached');
    if (tree.branches.length > 50) return console.log('branches reached');
    tree.branches.map((branch, index, array) => {
        let leavesNearBranch = tree.leaves.filter((leaf, index) => {
            let distance = p5.Vector.dist(leaf.pos, branch.pos);
            if (distance > tree.MIN_DIST && distance < tree.MAX_DIST) return true;
            return false;
        });
        if (leavesNearBranch.length > 0) {
            //console.log(leavesNearBranch);
            console.log(unreachedleaves.length);
            let pull = leavesNearBranch.map(leaf => leaf.pos).reduce((a, b) => p5.Vector.add(a, b));
            pull = p5.Vector.div(pull, leavesNearBranch.length)
            let newDirection = p5.Vector.sub(pull, branch.pos);
            newDirection.setMag(5);
            // branch.dir.add(newDirection);
            let newBranch = new Branch({
                'dir': newDirection,
                'parent': branch,
                'pos': p5.Vector.add(branch.pos, newDirection),
            });
            // branch.reset();
            branch.next = newBranch;
            tree.branches.push(newBranch);

            unreachedleaves = unreachedleaves.filter((leaf) => {
                let distance = p5.Vector.dist(leaf.pos, branch.pos);
                console.log(distance > tree.MAX_DIST);
                return (distance > tree.MAX_DIST)
            });
            // console.log(unreachedleaves);
        } else {
            if (branch.next) return branch;
            let pull = unreachedleaves.map(leaf => leaf.pos).reduce((a, b) => p5.Vector.add(a, b));
            pull = p5.Vector.div(pull, unreachedleaves.length)
            let newDirection = p5.Vector.sub(pull, branch.pos);
            newDirection.setMag(5);
            let nextBranch = new Branch({
                'pos': p5.Vector.add(branch.pos, newDirection),
                'parent': branch,
                'dir': newDirection,
                'next': null,
            });
            branch.next = nextBranch;
            tree.branches.push(nextBranch);
            branch.reset();
        }
        return branch;
    });
    return growRoot(tree, unreachedleaves, count);
};
