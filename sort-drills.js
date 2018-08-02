'use strict';

const str = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5';

const data1 = str.split(' ').map(each => Number(each));
const data2 = str.split(' ').map(each => Number(each));
const data3 = [8,3,2,9,4,7,5,1,6];
const data4 = [1,2,3,4,5,6,7,8,9];

const books = [
  'Windows for Dummies',
  '10 Facts About Chuck Norris',
  'The REXX Language',
  'The C++ Programming Language',
  'JavaScript: The Good Parts',
  'Starlight and Time',
  'Teach Yourself C++ In 21 Days',
  'Pride and Prejudice',
  'To Kill A Mocking Bird',
  'The Great Gatsby',
  '1984',
  'The Ultimate Guide to Stuff',
  'DaVinci Code',
  'Star Wars: Yoda Stories',
  'The REXX Language',
  'A Series of Unfortunate Events',
  'Jurassic Park',
  'Harry Potter and the Half-Blood Prince',
  'The Lord of the Rings: Two Towers',
  'Moby Dick'
];

let qSortPartitionCount = 0;
let qSortSwapCount = 0;
let mSortMergeCount = 0;
let bookSortCount = 0;
let bookSortSwapCount = 0;

function _swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function _partition(arr, start, end) {
  const pivot = arr[end - 1];
  let dividerIndex = start;

  for (let i = start; i < arr.length; i++) {
    if (arr[i] < pivot) {
      _swap(arr, i, dividerIndex);
      dividerIndex++;
      qSortSwapCount++; // custom counter for tracking efficiency
    }
  }

  _swap(arr, end-1, dividerIndex);

  qSortSwapCount++;  // custom counter for tracking efficiency
  qSortPartitionCount++; // custom counter for tracking efficiency

  return dividerIndex;
}

function quickSort(arr, start=0, end=arr.length) {
  if (start >= end) {
    return arr;
  }

  const dividerIndex = _partition(arr, start, end);
  arr = quickSort(arr, start, dividerIndex);
  arr = quickSort(arr, dividerIndex+1, end);

  return arr;
}

function _merge(left, right, arr) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      arr[outputIndex++] = left[leftIndex++];
      // either way works, but ++ evaluates at the end, outside of all the other operations
      // leftIndex++;
      // outputIndex++;
    } else {
      arr[outputIndex] = right[rightIndex];
      rightIndex++;
      outputIndex++;
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    arr[outputIndex] = left[i];
    outputIndex++;
  }

  for (let i = rightIndex; i < right.length; i++) {
    arr[outputIndex] = right[i];
    outputIndex++;
  }

  mSortMergeCount++; // cusutom counter for tracking efficiency

  return arr;
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length/2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, arr.length);

  left = mergeSort(left);
  right = mergeSort(right);

  return _merge(left, right, arr);
}

// must be O(n) runtime
// already know in advance the smallest and largest values in array
// assume no duplicate values in array
function bucketSort(arr, lowest, highest) {
  let hash = new Array(highest+1).fill(0);
  hash.fill(0);

  for (let i=0; i<arr.length; i++) {
    hash[arr[i]]++;
  }
  
  let iter = lowest+1;
  const order = [lowest];
  
  while (iter <= hash.length) {
    if (hash[iter] !== 0) {
      for (let i=0; i<hash[iter]; i++) {
        order.push(iter);
      }
    }
    iter++;
  }

  return order;
}

function arrayRandomizer(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    _swap(arr, i, randomIndex);
  }

  return arr;
}

function _compareString(word1, word2) {
  let i = 0;

  while (word1[i] && word2[i]) {
    if (word1.charCodeAt(i) === word2.charCodeAt(i)) {
      i++;
      continue;
    }
    if (word1.charCodeAt(i) < word2.charCodeAt(i)) {
      return -1;
    } else {
      return 1;
    }
  }

  return 0;
}

function bookSort(arr) {
  bookSortCount++; // custom tracker for tracking efficiency

  let swaps = 0;
  let i = 0;

  for (let i = 0; i < arr.length-1; i++) {
    if (_compareString(arr[i], arr[i+1]) === 1) {
      _swap(arr, i, i+1);
      swaps++;
      bookSortSwapCount++; // custom counter for tracking efficiency
    }
  }

  if (swaps > 0) {
    return bookSort(arr);
  }

  return arr;
}

function main() {
  console.log(quickSort(data1));
  console.log(`quickSort: # of partitions: ${qSortPartitionCount}, # of swaps: ${qSortSwapCount}`);

  console.log(mergeSort(data2));
  console.log(`mergeSort: # of merges: ${mSortMergeCount}`);

  console.log('bucketSort:', bucketSort(data3, 1, 9));

  console.log('Randomized array:', arrayRandomizer(data4));

  console.log(bookSort(books));
  console.log(`bookSort: # of loops: ${bookSortCount}, # of swaps: ${bookSortSwapCount}`);
}

main();