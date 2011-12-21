

all: deps
	make combine

deps:
	cd closure && make
	cd third_party && make

combine:
	cat third_party/closure/goog/deps.js >> closure/goog/deps.js
	cat third_party/closure/mt/deps.js >> closure/goog/deps.js

.PHONY: all deps combine
