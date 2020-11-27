simple: simple_build clean-cmd exec clean
simple_build: 
	@g++ ./simple/main.cpp -o app

vector: vector_build clean-cmd exec clean
vector_build: 
	@g++ ./vector/main.cpp ../utils/vector.cpp -o app

clean:
	@del app.exe
exec: 
	@app.exe
clean-cmd:
	@cls