#include "vector.hpp"

/**
 * @brief Print a vector into the console.
 * 
 * @param vector a vector
 */
void printVector(vector<int> vector) {
  cout << '[';
    for (size_t i = 0; i < vector.size(); i++) {
      cout << ' ' << vector[i];
      if(i != vector.size() - 1) cout << ',';
    }
  cout << ']';
}