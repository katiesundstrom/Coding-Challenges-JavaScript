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
