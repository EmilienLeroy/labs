#include <stdio.h>
#include <iostream>

int main(int argc, char const *argv[])
{
  int a = 1;
  int b = 2;
  int total = 0;

  for (size_t i = 0; b < 4000000; i++) {
    int c = b;
    if (c % 2 == 0) {
      total += c;
    }

    b = a + b;
    a = c;
  }

  std::cout << total;
  return 0;
}