all: testEngine

tmp/CuraJS-Engine.js:
	mkdir -p $(dir $@)
	./tools/CuraJS-Engine.sh > $@


build/CuraEngineInternal.js: tmp/CuraJS-Engine.js res/CuraEngineInternal.js
	mkdir -p $(dir $@)
	sed -e '/INSERT-CURA-ENGINE-COMPILED/ {' -e 'r $<' -e 'd' -e '}' res/CuraEngineInternal.js > $@


testEngine: build/CuraEngineInternal.js examples/index.js
	node examples/index.js
