#include <stdio.h>
#include <iostream>
#include <vector>

int main(int argc, char const *argv[])
{
	int total_number = 0;
	int max_number = argv[1] ? 
		strtol(argv[1], NULL, 10) : 10;

	for (size_t i = 1; i < max_number; i++) {
		if (i % 3 == 0 || i % 5 == 0) {
			total_number += i;
		}
	}

	std::cout << total_number;
	return 0;
}
