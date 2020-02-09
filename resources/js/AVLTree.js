// Code taken from https://github.com/gwtw/js-avl-tree
// Modified to work with local js


var Node = function (key, val) {
    this.left = null;
    this.right = null;
    this.height = null;
    this.key = key;
    this.val = val;
};

Node.prototype.rightRotation = function () {
    var other = this.left;
    this.left = other.right;
    other.right = this;
    this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
    other.height = Math.max(other.leftHeight(), this.height) + 1;
    return other;
};

Node.prototype.leftRotation = function () { 
    var other = this.right;
    this.right = other.left;
    other.left = this;
    this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
    other.height = Math.max(other.rightHeight(), this.height) + 1;
    return other;
};

Node.prototype.rightHeight = function () {
    if(!this.right){
        return -1;
    }
    return this.right.height;
};

Node.prototype.leftHeight = function () {
    if(!this.left){
        return -1;
    }  
    return this.left.height;
};


var AvlTree = function () {
    this._root = null;
    this._size = 0;

};

AvlTree.prototype.root = function () {
    return this._root;
};

AvlTree.prototype._compare = function (a, b) {
    if (a > b) {
        return 1;
    }
    if (a < b){
        return -1;
    }
    return 0;
};

AvlTree.prototype.insert = function (key, val) {
    this._root = this._insert(key, val, this._root);
    this._size++;
};

AvlTree.prototype._insert = function (key, val, root) {
    if (root === null) {
        return new Node(key, val);
    }

    if(this._compare(key, root.key) < 0) {
        root.left = this._insert(key, val, root.left);
    }
    else if(this._compare(key, root.key) > 0) {
        root.right = this._insert(key, val, root.right);
    }
    else
    {
        this._size--;
        return root;
    }


    root.height = Math.max(root.leftHeight(), root.rightHeight()) + 1;
    var balance = getBalance(root);

    if(balance === Balance.UNBALANCED_LEFT) {
        if (this._compare(key, root.left.key) < 0) {
            root = root.rightRotation();
        } else {
            root.left = root.left.leftRotation();
            return root.rightRotation();
        }
    }

    if(balance === Balance.UNBALANCED_RIGHT) {
        if(this._compare(key, root.right.key) > 0) {
            root = root.leftRotation();
        } else {
            root.right = root.right.rightRotation();
            return root.leftRotation();
        }
    }
    return root;
};

AvlTree.prototype.delete = function (key) {
    this._root = this._delete(key, this._root);
    this._size--;
}

AvlTree.prototype._delete = function (key, root) {
    if(root === null){
        this._size++;
        return root;
    }

    if(this._compare(key, root.key) < 0){
        root.left = this._delete(key, root.left);
    } else if (this._compare(key, root.key) > 0) {
        root.right = this._delete(key, root.right);
    } else {
        if (!root.left && !root.right) {
            root = null;
        } else if (!root.left && root.right) {
            root = root.right;
        } else if (root.left && !root.right) {
            root = root.left;
        } else {
            var successor = minValNode(root.right);
            root.key = successor.key;
            root.val = successor.val;
            root.right = this._delete(successor.key, root.right);
        }

    }

    if(root === null) {
        return root;
    }

    root.height = Math.max(root.leftHeight(), root.rightHeight()) + 1;
    var balance = getBalance(root);

    if(balance === Balance.UNBALANCED_LEFT) {
        // LL
        if (getBalance(root.left) === Balance.BALANCED ||
            getBalance(root.left) === Balance.SLIGHTLY_UNBALANCED_LEFT) {
            return root.rightRotation();
        }
        // LR
        if (getBalance(root.left) === Balance.SLIGHTLY_UNBALANCED_RIGHT) {
            root.left = root.left.rotateLeft();
            return root.rotateRight();
        }
    }

    if (balance === Balance.UNBALANCED_RIGHT) {
        // RR
        if (getBalance(root.right) === Balance.BALANCED ||
            getBalance(root.right) === Balance.SLIGHTLY_UNBALANCED_RIGHT) {
            return root.rotateLeft();
        }
        // RL
        if (getBalance(root.right) === Balance.SLIGHTLY_UNBALANCED_LEFT) {
            root.right = root.right.rotateRight();
            return root.rotateLeft();
        }
    }
    
    return root;
};


AvlTree.prototype.get = function (key) {
    if (this._root === null) {
        return null;
    }
    
    return this._get(key, this._root).val;
};

AvlTree.prototype._get = function (key, root) {
    var result = this._compare(key, root.key);
    
    if (result === 0) {
        return root;
    }
    
    if (result < 0) {
        if (!root.left) {
            return null;
        }
        return this._get(key, root.left);
    }
    
    if(!root.right) {
        return null;
    }
    return this._get(key, root.right);
};

AvlTree.prototype.contains = function (key) {
    if (this._root === null) {
        return false;
    }
    
    return !!this._get(key, this._root);
};

AvlTree.prototype.minimum = function () {
    return minValNode(this._root).key;
};

function minValNode(root) {
    var current = root;
    while (current.left) {
        current = current.left;
    }
    return current;
}

AvlTree.prototype.maximum = function () {
    return maxValNode(this._root).key;
};

function maxValNode(root) {
    var current = root;
    while(current.right) {
        current = current.right;
    }
    return current;
}

AvlTree.prototype.size = function () {
    return this._size;
};

AvlTree.prototype.isEmpty = function () {
    return this._size === 0;
};


var Balance = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

function getBalance(node) {
    var heightDifference = node.leftHeight() - node.rightHeight();
    switch (heightDifference) {
        case -2: return Balance.UNBALANCED_RIGHT;
        case -1: return Balance.SLIGHTLY_UNBALANCED_RIGHT;
        case 1: return Balance.SLIGHTLY_UNBALANCED_LEFT;
        case 2: return Balance.UNBALANCED_LEFT;
        default: return Balance.BALANCED;
    }
}
