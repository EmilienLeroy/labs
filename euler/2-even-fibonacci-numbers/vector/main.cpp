#include <stdio.h>
#include <iostream>
#include <vector>
#include "../../utils/vector.hpp"

using namespace std;

int main(int argc, char const *argv[])
{
  vector<int> fibonacci = { 1, 2 };
  int total = 2;

  for (size_t i = fibonacci.size(); fibonacci[i - 2] + fibonacci[i - 1] < 4000000; i++) {
    int value = fibonacci[i - 2] + fibonacci[i - 1];
    fibonacci.push_back(value); 
    
    if (value % 2 == 0) {
      total += value;
    }
  }

  cout << total;
  return 0;
}

