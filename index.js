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

pairSumUnsorted = (array,targetSum) => {
  let complementSet = new Set()
  for(let i = 0; i < array.length; i++) {
    if(complementSet.has(targetSum - array[i])) return true
    else complementSet.add(array[i])
  }
  return false
}

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

multiDimSum = (array) => {
  let sum = 0
  for(let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) return sum += multiDimSum(array[i])
    else sum += array[i]
  }
  return sum
}


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

linkedListLoopCheck = (head) => {
  const tortoise = head
  const hare = head.next.next
  if(tortoise === hare) return true
  else if (head.next.next) return linkedListLoopCheck(head.next)
  return false
}
