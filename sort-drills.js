'use strict';

const str = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5';
const data1 = str.split(' ').map(each => Number(each));
const data2 = str.split(' ').map(each => Number(each));

let swapCount = 0;
let partitionCount = 0;
let mergeCount = 0;

function _swap(arr, i, j) {
  swapCount++;
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function _partition(arr, start, end) {
  partitionCount++;
  const pivot = arr[end - 1];
  let pivotIndex = start;
  for (let i = start; i < arr.length; i++) {
    if (arr[i] < pivot) {
      _swap(arr, i, pivotIndex);
      pivotIndex++;
    }
  }
  _swap(arr, end-1, pivotIndex);
  return pivotIndex;
}

function qSort(arr, start=0, end=arr.length) {
  if (start >= end) {
    return arr;
  }
  const pivotIndex = _partition(arr, start, end);
  arr = qSort(arr, start, pivotIndex);
  arr = qSort(arr, pivotIndex+1, end);
  return arr;
}

function _merge(left, right, arr) {
  mergeCount++;

  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      arr[outputIndex] = left[leftIndex];
      leftIndex++;
      outputIndex++;
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

  return arr;
}

function mSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length/2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, arr.length);

  left = mSort(left);
  right = mSort(right);

  return _merge(left, right, arr);
}

function main() {
  console.log(qSort(data1));
  console.log(mSort(data2));
  console.log(`qSort: # of partitions: ${partitionCount}, # of swaps: ${swapCount}`);
  console.log(`mSort: # of merges: ${mergeCount}`);
}

main();