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

Big O Time: O()
Big O Space: O()
*/


