#include <stdio.h>
#include <iostream>
#include <vector>
#include <math.h> 
#include "../utils/vector.hpp"
#include "../utils/prime.hpp"

using namespace std;

int main(int argc, char const *argv[])
{
  int number = argv[1] ? 
		strtol(argv[1], NULL, 10) : 15;

  vector<int> array = {};
  
  while (number % 2 == 0) {
    array.push_back(2);
    number = number / 2;
  } 

  for (int i = 3; i <= sqrt(number); i = i + 2) {
    while (number % i == 0) {
      number = number / i;
      array.push_back(i);
    }
  }

  if(number > 2) {
    array.push_back(number);
  }
  
  printVector(array);
  return 0;
}
