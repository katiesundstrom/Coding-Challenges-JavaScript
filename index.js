/* Prompt
Given an array of strings containing domain names and visit counts, create a data structure that aggregates the visit counts with domains, absolute domains, and subdomains.

Example input: [“google.com,1000”, “gh.fullstack.edu,500”, “yahoo.com,50”, "fullstack.edu,200"]

Example ouput: {google.com: 1000, gh.fullstack.edu: 500, yahoo.com: 50, com: 1050, fullstack.edu: 700, edu: 700}
*/

/* Pseudocode:
initialize empty JS object representing dictionary
iterate over array. for each string:
- split string into array of two items: [domain, stringNum]
- check if obj[domain] exists
- if not, create it and assign it the value of the numeric version of stringNum
- if yes, add the numeric value to the value that already exists at that property
- while the domain still has periods in it, repeat this process having shifted off everything that comes before (and including) the earliest occuring period
*/

function subdomainVisitDict(domainVisits) {
  const dictionary = {};
  for (let i = 0; i < domainVisits.length; i++) {
    const numDomainArray = domainVisits[i].split(',');
    const domain = numDomainArray[0];
    const visits = Number(numDomainArray[1]);
    const subdomainArray = domain.split('.');
    while (subdomainArray.length >= 1) {
      const subdomain = subdomainArray.join('.');
      if (dictionary[subdomain]) {
        dictionary[subdomain] += visits;
      } else {
        dictionary[subdomain] = visits;
      }
      subdomainArray.shift();
    }
  }
  return dictionary;
}

subdomainVisitDict([
  'google.com,1000',
  'gh.fullstack.edu,500',
  'yahoo.com,50',
  'fullstack.edu,200',
]);

/* Big O of this Solution
O(n) time and space.
Lookup and insertion times 0(1)
*/

// later, refactor with JavaScript Map

// ---------------------------------------------------------------

/* Prompt
Given a collection of sorted numbers and a target sum, write a function that will return true or false indicating whether any pair of numbers in the array adds to that sum.

Example: [1, 2, 3, 4, 5], 5 => True

Questions:
Will the numbers be given to the function in an array?
Can I assume the numbers and the sum will always be integers? Positive?

Edge Cases:
What if array is empty?


Approach 1: Nested For Loops, O(n^2) time, O(1) space

Approach 2: Ratcheting (with a sorted array), O(n) time, O(1) space

*/

pairSum = (numArray, targetSum) => {
  let leftIndex = 0;
  let rightIndex = numArray.length - 1;
  while (leftIndex !== rightIndex) {
    let sum = numArray[leftIndex] + numArray[rightIndex];
    if (sum === targetSum) return true;
    else if (sum > targetSum) rightIndex--;
    else leftIndex++;
  }
  return false;
};

// What if the array is not sorted?
// Big O: O(n) time and O(n) space

pairSumUnsorted = (array, targetSum) => {
  let complementSet = new Set();
  for (let i = 0; i < array.length; i++) {
    if (complementSet.has(targetSum - array[i])) return true;
    else complementSet.add(array[i]);
  }
  return false;
};

// ---------------------------------------------------------------

// MULTIDIMSUM

/* Prompt
Given an array of numbers that may be nested multiple levels deep, return the sum of all of the numbers in the arrays.

Example: [1, [2, [3, 4]], 5] => 15

Questions:
Are all of the items in all of the arrays guaranteed to be numbers?

Edge Cases:
Empty array

Approach 1: Recursion
Big O: O(n^2) time, 0(1) space

! Approach 2: CAN WE IMPROVE THIS TIME COMPLEXITY?

*/

multiDimSum = array => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) return (sum += multiDimSum(array[i]));
    else sum += array[i];
  }
  return sum;
};

// ---------------------------------------------------------------

// List Looper

/* Prompt
Given a singly linked list, check if it has a loop.

Example: a -> b -> c -> a => true

Questions:

Edge Cases:

Optimized Approach: Tortoise and Hare
Big O: O(n) time, 0(1) space


*/

linkedListLoopCheck = head => {
  const tortoise = head;
  const hare = head.next.next;
  if (tortoise === hare) return true;
  else if (head.next.next.next) return linkedListLoopCheck(head.next);
  return false;
};

// ---------------------------------------------------------------

// ! IN PLACE ROTATION

/* Prompt
Rotate an image 90 degrees clockwise, in place.

Example:
[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
]
=>
[
  [6, 3, 0],
  [7, 4, 1],
  [8, 5, 2]
]

Questions:
How will I receive the image? Answer: Array of arrays. Matrix.
Will the image be square?

Edge Cases:
Empty matrix


Approach 1: NOT in place.
- iterate over outer array, shift off each first num, and push it onto i'th array in new matrix. repeat this process until original matrix empty.
- Iterate over final matrix, reversing each subarray.
- Return matrix
Big O: O(n) time, O(n) space

Approach 2: In place.
! Big O: O(n) time? O(1) space

*/

rotationNotInPlace = matrix => {
  const rotatedMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    if (i === 0) rotatedMatrix.push([]);
    rotatedMatrix[i].push(matrix[i].shift);
  }
  for (let i = 0; i < rotatedMatrix.length; i++) {
    rotatedMatrix[i].reverse;
  }
  return rotatedMatrix;
};

// inPlaceRotation = (matrix) => {
//   let firstMovedVal
//   let secondMovedVal

//   return matrix
// }

// ---------------------------------------------------------------

/*
Write a function reverseWords() that takes a message as an array of characters and reverses the order of the words in place.

When writing your function, assume the message contains only letters and spaces, and all words are separated by one space.

const message = [ 'c', 'a', 'k', 'e', ' ',
                'p', 'o', 'u', 'n', 'd', ' ',
                's', 't', 'e', 'a', 'l' ];

reverseWords(message);

console.log(message.join(''));
Prints: 'steal pound cake'

Approach:
reverse the entire array; spaces will be in place, and words will be backwards
reverse each word

Big O time:
Big O space:

*/

// helper function, reverseChars

reverseCharacters = (message, leftIdx, rightIdx) => {
  while (leftIdx < rightIdx) {
    let letter = message[leftIdx];
    message[leftIndex] = message[rightIdx];
    message[rightIdx] = letter;
    leftIdx++;
    rightIdx--;
  }
};

//! this function is not yet complete
reverseWords = message => {
  let startIdx = 0;
  for (let i = 0; i < message.length; i++) {
    if (message[i] === ' ') {
      reverseCharacters(message);
    }
  }
};

// ---------------------------------------------------------------
/*
write a function that takes a string of text and returns true if
the parentheses, brackets, and braces are balanced and false otherwise.

Example:
balanceParens('[](){}'); // true
balanceParens('[({})]');   // true
balanceParens('[(]{)}'); // false

O(n) time
O(n) space
*/

balancedBrackets = string => {
  let openBrackets = ['(', '{', '['];
  let closeBrackets = [')', '}', ']'];
  let bracketPairs = { ')': '(', '}': '{', ']': '[' };
  let stack = [];

  for (let i = 0; i < string.length; i++) {
    if (openBrackets.includes(string[i])) {
      stack.push(string[i]);
    }
    if (closeBrackets.includes(string[i])) {
      if (!stack.length || stack.pop() !== bracketPairs[string[i]]) {
        return false;
      }
    }
  }
  return stack.length === 0;
};

// ---------------------------------------------------------------
/*
Write a function to delete a node from a singly linked list. The function will take in the node to delete.
*/

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function deleteNode(nodeToDelete) {
  nodeToDelete.value = nodeToDelete.next.value;
  nodeToDelete.next = nodeToDelete.next.next;
}

// ---------------------------------------------------------------
/*
Write a function to reverse a linked list in place.
*/


// ---------------------------------------------------------------

/*
Write a function to complete a breadth first search of a binary tree.

*/

const breadthFirstSearch(node) {
  let queue = [this]

}

// ---------------------------------------------------------------

/*
You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.

Write a function getProductsOfAllIntsExceptAtIndex() that takes an array of integers and returns an array of the products.

Big O Time: O(n)
Big O Space: O(n)
*/

function getProductsOfAllIntsExceptAtIndex(intArray) {
  if (intArray.length < 2) {
    throw new error('Getting the product of numbers at other indices requires at least 2 numbers')
  }

    let products = [1]
    for (let i = 1; i < intArray.length; i++) {
      products[i] = products[i-1]*intArray[i-1]
    }

    let product = 1
    for(let i = intArray.length - 2; i >= 0; i--) {
      product *= intArray[i+1]
      products[i] = products[i]*product
    }

    return products;
  }

  // ---------------------------------------------------------------

/*
 Write a function to see if a binary tree ↴ is "superbalanced" (a new tree property we just made up).

A tree is "superbalanced" if the difference between the depths of any two leaf nodes ↴ is no greater than one.

Big O Time: O(n^2)
Big O Space: O(n)
*/

class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left  = null;
    this.right = null;
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
}

function isBalanced(treeRoot) {

  let queue = [[treeRoot, 0]]
  let leafDepthsArray = []

  while (queue.length) {
    let [node, depth] = queue.shift()
    if (node.left) {
      queue.push([node.left, depth + 1])
    }
    if (node.right) {
      queue.push([node.right, depth + 1])
    }
    else {
      leafDepthsArray.push(depth)
    }
    leafDepthsArray.sort()
    if (leafDepthsArray[leafDepthsArray.length-1] - leafDepthsArray[0] > 1) {
      return false
    }
  }

  return true;
}

  // ---------------------------------------------------------------

/*

Write an efficient function that checks whether any permutation ↴ of an input string is a palindrome. ↴

You can assume the input string only contains lowercase letters.

Examples:

"civic" should return true
"ivicc" should return true
"civil" should return false
"livci" should return false

Big O Time: O(n)
Big O Space: O(n)
*/


function hasPalindromePermutation(string) {
  let memo = {}
    for (let i = 0; i < string.length; i++) {
      let char = string[i]
      if (!memo[char]) {
        memo[char] = 1
      } else {
        memo[char]++
      }
    }
    let number = 0
    let nums = Object.values(memo)
    nums.map(num => {
      if (num % 2 === 1) {
        number++
      }
    })


    return number <= 1;
  }


    // ---------------------------------------------------------------

/*

An array of words has been rotated. Write a function to return the index of the rotation point.

  const words = [
  'ptolemaic',
  'retrograde',
  'supplant',
  'undulate',
  'xenoepist',
  'asymptote',  // <-- rotates here!
  'babka',
  'banoffee',
  'engender',
  'karpatka',
  'othellolagkage',
];

Big O Time: O(nlogn)
Big O Space: O()
*/

function findRotationPoint(words) {

  let middleIndex = Math.floor(words.length/2)
  let firstWord = words[0].toLowerCase()
  let middleWord = words[middleIndex].toLowerCase()

  if(middleWord < words[middleIndex -1].toLowerCase()) {
      return middleIndex
    }

  if (middleWord < firstWord ) {
    return findRotationPoint(words.slice(0, middleIndex))
  }

  if (middleWord > firstWord) {
    return findRotationPoint(words.slice(middleIndex))
  }

  return false;
}

    // ---------------------------------------------------------------

/*

Given an alphabetical array of dictionary entries and a word to search for, find that word's definition (if it exists). A dictionary entry is just a string where the word's name appears first, followed by - [definition].

const dictionary = [
  'a - Used when mentioning someone or something for the first time in a text or conversation',
  'and - Used to connect words of the same part of speech, clauses, or sentences, that are to be taken jointly',
  'be - Exist',
  'in - Expressing the situation of something that is or appears to be enclosed or surrounded by something else',
  'of - Expressing the relationship between a part and a whole',
  'that - Used to identify a specific person or thing observed or heard by the speaker',
  'the - Denoting one or more people or things already mentioned or assumed to be common knowledge',
  'to - Expressing motion in the direction of (a particular location)'
];
definitionOf('be', dictionary); // should return 'Exist'
definitionOf('that', dictionary); // should return 'Used to identify a specific person or thing observed or heard by the speaker'
definitionOf('to', dictionary); // should return 'Expressing motion in the direction of (a particular location)'
definitionOf('wizbing', dictionary); // should return undefined

*/

// RECURSIVE BINARY SEARCH SOLUTION
definitionOf = (word, dict) => {
  let dictLength = dict.length

  if (dictLength === 0 || dictLength === 1 && !dictionary[0].startsWith(word)) {
    return undefined
  }

  if (dictLength === 1 && dict[0].startsWith(word)) {
    return dict[0].slice(dict[0].length+3, dict[0].length)
  }

  let middleIndex = Math.floor((dictLength)/2)
  let middleWordAndDef = dict[middleIndex]
  let middleWord = middleWordAndDef.slice(0, middleWordAndDef.indexOf(' '))

  if(middleWord === word) {
    // slice's second parameter is exclusive.
    return middleWordAndDef.slice(middleWord.length+3, middleWordAndDef.length)
  }

  else if(middleWord > word) {
    return definitionOf(word, dict.slice(0, middleIndex))
  }
  else if (middleWord < word) {
    return definitionOf(word, dict.slice(middleIndex))
  }
}

// ITERATIVE BINARY SEARCH SOLUTION
definitionOf(word, dict) {

}

// OPTIMIZED, CACHING BINARY SEARCH SOLUTION
definitionOf(word, dict) {

}

    // ---------------------------------------------------------------

/*

Implement a priority queue with the following 3 methods:

insert(data, priority) // inserts data into the priority queue with the given priority

peek() // returns the value of the item with the highest priority without removing it from the priority queue

popMax() // returns the value of the item with the highest priority and also removes it from the priority queue

For the purposes of our implementation, "higher priority" corresponds to a higher integer value. Note, however, that this could be implemented either way.

const pq = new PriorityQueue();
pq.insert('Jill, concussion', 7);
pq.insert('John, stomach pain', 5);
pq.peek() // ==> 'Jill, concussion'
pq.peek() // ==> 'Jill, concussion'  // Jill is still in the PQ
pq.insert('Dave, sprained ankle', 1);
pq.insert('Bob, breathing problems', 8)
pq.peek() // ==> 'Bob, breathing problems'
pq.popMax() // ==> 'Bob, breathing problems'
pq.peek() // ==> 'Jill, concussion' // Bob has been removed from the PQ

*/

/* Naive, Linked List Approach
Big O Time:
  peek: O(1)
  popMax: O(1)
  insert: O(n)
Big O Space:O(n)
*/


class Node {
  constructor(data, priority) {
    this.data = data
    this.priority = priority
    this.next = null
  }
}

class PriorityQueue {
  constructor() {
    this.first = null
  }

  insert(data, priority) {
    let newNode = new Node(data, priority)
    if(!this.first || this.first.priority <= priority) {
      newNode.next = this.first.next
      this.first = newNode
    }
    else {
      let currentNode = this.first
      while(currentNode.next && currentNode.next.priority >= priority) {
        currentNode = currentNode.next
      }
      newNode.next = currentNode.next
      currentNode.next = newNode
    }
  }

  peek() {
    return this.first.data
  }

  popMax() {
    let max = this.first.data
    this.first = this.first.next
    return max
  }
}

// Optimized, Heap Approach

class PriorityQueueHeap {
  constructor() {
    this._items = []
  }
  _swap(childIdx, parentIdx) {
    [this._items[childIdx], this._items[parentIdx]] = [this._items[parentIdx], this._items[childIdx]]
  }

  _parentIdx(childIdx) {
    return Math.floor((childIdx-1)/2)
  }

  _childrenIndeces(parentIdx) {
    return [parentIdx*2 +1, parentIdx*2 + 2]
  }

  _priority(idx) {
    return this._items[idx].priority
  }

  insert(data, priority) {
    this._items.push({data, priority})
    this._heapifyUp()
  }

  _heapifyUp() {
    let currentIdx = this._items.length -1
    let currentIdx = this._items.length - 1;
    while (currentIdx > 0 &&
        this._items[currentIdx].priority >
        this._items[this._parentIdx(currentIdx)].priority) {
      this._swap(currentIdx, this._parentIdx(currentIdx));
      currentIdx = this._parentIdx(currentIdx);
    }
  }

  peek() {
    return this._items[0].data
  }

  popMax() {
    let max = this._items[0].data
    this._items[0] = this._items.pop()
    this._heapifyDown()
    return max.data
  }

//   _heapifyDown() {
//     let currentIdx = 0;
//     let [left, right] = this._childrenIndices(currentIdx);
//     let idxLarger;
//     const length = this._items.length;
//     while (left < length) {
//       if (right < length) {
//         idxLarger = this._priority(left) >= this._priority(right) ? left : right;
//       }
//       else idxLarger = left;

//       if (this._priority(currentIdx) < this._priority(idxLarger)) {
//         this._swap(idxLarger, currentIdx);
//         currentIdx = idxLarger;
//         [left, right] = this._childrenIndices(currentIdx);
//       }
//       else return;
//     }
//   }
//   }
// }


    // ---------------------------------------------------------------

// Reverse an integer without converting it to a string (i.e. 123 -> 321 and 120 -> 21 and -54 -> -45)

/*
Big O Time: O(n)
Big O Space:O(1)
*/


function reverseInt(int) {
  if(int === 0) {
    return 0
  }
  let reversedNum = 0;
  let originalInt = int

  if (originalInt < 0) {
    int = int * (-1)
  }
  while(int >= 1) {
    numToAdd = int % 10
    reversedNum = reversedNum * 10 + numToAdd
    int = Math.floor(int / 10)
  }

  if(originalInt < 0) {
    reversedNum *= (-1)
  }

  return reversedNum
}

console.log(reverseInt(123))
console.log(reverseInt(120))
console.log(reverseInt(-54))

    // ---------------------------------------------------------------

// Return all duplicate numbers in an array

// O(n) time, O(n) space

returnDups = (array) => {
  let arraySet = new Set()
  let dupSet = new Set()
  for(let i = 0; i < array.length; i++) {
    if(!arraySet.has(array[i])){
      arraySet.add(array[i])
    }
    else {
      dupSet.add(array[i])
    }
  }
  return dupSet
}

returnDups([5, 4, 3, 2, 1, 5, 6, 4, 2, 11, 11])


    // ---------------------------------------------------------------

/* Prompt: Given two sorted arrays of numbers, return an array containing all values that appear in both arrays. The numbers in the resulting array (the "intersection") may be returned in any order; they needn't be sorted. You can assume that each array has only unique values.

Example involving two sorted arrays:

intersection([1,4,9,10,11], [2,3,4,5,8,10]); // should return [4, 10]
(numbers can be in any order)

*/

/*
O(n + m) time complexity
O(n) space complexity
*/

// ratcheting technique assumes the arrays are sorted.
function intersection(arrA, arrB) {
  const duplicates = [];
  while (i < arrA.length && j < arrB.length) {
    if (arrA[i] === arrB[j]) {
      duplicates.push(arrA[i]);
    }
    if (arrA[i] <= arrB[j]) {
      i++;
    }
    if (arrA[i] >= arrB[j]) {
      j++;
    }
  }
  return duplicates;
}

/* Optimized Solution for Unsorted Arrays

Big O
Time: O(n)
Space: O(n)
*/

    function intersection (arrA, arrB) {
      const smaller = arrB.length < arrA.length ? arrB : arrA;
      const larger = arrB.length >= arrA.length ? arrB : arrA;

      const smallerArraySet = new Set(smaller);

      return larger.filter(el => smallerArraySet.has(el));
    }

// ---------------------------------------------------------------

/*

Prompt: Given a matrix, return the coordinates ([row, col]) of the element that differs from the rest.

Examples
whereIsWaldo([
  ["A", "A", "A"],
  ["A", "A", "A"],
  ["A", "B", "A"]
]) ➞ [3, 2]

whereIsWaldo([
  ["c", "c", "c", "c"],
  ["c", "c", "c", "d"]
]) ➞ [2, 4]

whereIsWaldo([
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["P", "O", "O", "O"],
  ["O", "O", "O", "O"]
]) ➞ [5, 1]

Notes
Rows and columns are 1-indexed (not zero-indexed).

Big O:
Time: O(n^2)
Space: O(1)

*/

wheresWaldo = (matrix) => {
  if(matrix[0][0] === matrix[0][1]) {
    let char = matrix[0][0]
  }
  else {
    let char = matrix[0][2]
  }
  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== char) {
        return [i+1, j+1]
      }
    }
  }
}

// ---------------------------------------------------------------

/*

Prompt: Given a string and a number indicating the point of rotation, return the rotated string.

Big O:
Time: O(1)
Space: O(1)

*/

function rotateString(string, d) {

  d = d % string.length

  let firstHalf = string.slice(d)
  let secondHalf = string.slice(0, d)
  let rotatedLetters = firstHalf.concat(secondHalf)
  return rotatedLetters
}

rotateString('Microsoft', 5)

// ---------------------------------------------------------------
/*

Prompt: Given an nxn dimensional matrix m and an integer k, rotate the nondiagonal values of the matrix clockwise k times

each rotation is 90 degrees clockwise

return the newly rotated matrix

Big O:
Time: O(n^2)
Space: O(1)

*/
function rotateMatrixWithoutDiagonals(matrix, num){
  num %= 4;

  if(matrix.length < 3 || num === 0){
    return matrix;
  }

    while(num > 0){
      for(let i = 0; i < Math.floor(matrix.length/2); i++){
        for(let j = i + 1; j < matrix.length - 1 - i; j++){
          // store elements
          let top = matrix[i][j];
          let left = matrix[matrix.length - 1 - j][i];
          let bottom = matrix[matrix.length - 1 - i][matrix.length - 1 - j];
          let right = matrix[j][matrix.length - 1 - i];

          // reassign elements
          matrix[i][j] = left;
          matrix[matrix.length - 1 - j][i] = bottom
          matrix[matrix.length - 1 - i][m.length - 1 - j] = right;
          matrix[j][matrix.length - 1 - i] = top;
        }
    }
    num--;
  }
return matrix;
}

// ---------------------------------------------------------------
/*

Prompt: Given an an array of numbers, find the length of the longest possible subsequence that is increasing. This subsequence can "jump" over numbers in the array. For example in [3, 10, 4, 5] the longest increasing subsequence (LIS) is [3, 4, 5].


Big O:
Time: O(n)
Space: O(n)

*/

function maximumIncreasingSubsequence(array) {
  const lengths = new Array(array.length).fill(1);

  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      const isIncreasing = array[j] < array[i];
      const sequenceLength = lengths[j] + 1;
      const isLonger = sequenceLength > lengths[i];

      if (isIncreasing && isLonger) {
        lengths[i] = sequenceLength;
      }
    }
  }
  return Math.max(...lengths);
}


/* ---------------------------------------------------------------

Prompt: Write a function that determines if a path exists between two vertices of a directed graph.

The graph will be represented as an object, each of whose keys represents a vertex of the graph and whose value represents all vertices that can be reached from the aforementioned key.

In the example below, there is a connection from vertex a to vertex b and a connection from vertex b to vertices c and d but not a connection from vertex b to vertex a.

{
  a: ['b'],
  b: ['c', 'd'],
  c: ['d']
}

Big O:
Time: O(V + E) where V = number of vertices and E = number of edges
Space: O(V)

*/

function doesPathExist(graph, node1, node2, seen = new Set()) {
  if(!seen.has(node1)) {
    seen.add(node1)
    for(let i = 0; i < graph[node1].length; i++) {
      if (graph[node1][i] === node2) return true
      else {
        return doesPathExist(graph, graph[node1][i], node2, seen)
        }
    }
  }
return false
}

/* ---------------------------------------------------------------

Prompt: Given a string, return an array of all the permutations of that string. The permutations of the string should be the same length as the original string (i.e. use each letter in the string exactly once) but do not need to be actual words.

The array that is returned should only contain unique values and its elements should be in alphabetical order.

Big O:
Time: O()
Space: O()

*/


/* ---------------------------------------------------------------

Prompt: Given an array of stock prices, write a function that returns the max profit you can make from buying and selling once.

Brute Force Solution Big O:
Time: O(n^2)
Space: O(1)

*/

function maxProfit(stockPrices) {
  let maxProfit = 0;
  for(let i = 0; i < stockPrices.length -1; i++) {
    for(let j = i+1; j < stockPrices.length; j++) {
      maxProfit = Math.max((array[j] - array[i]), maxProfit)
    }
  }
  return maxProfit
}

/*
Optimized Solution Big O:
Time: O(n)
Space: O(1)
*/

function optimizedMaxProfit(stockPrices) {
  let maxProfit = 0
  let minPrice = Infinity
  for(let i = 0; i < stockPrices.length; i++) {
    if(stockPrices[i] < minPrice) minPrice = stockPrices[i]
    else if ((stockPrices[i] - minPrice) > maxProfit) {
      maxProfit = stockPrices[i] - minPrice
    }
  }
  return maxProfit
}
