all: testEngine

tmp/CuraJS-Engine.js:
	mkdir -p $(dir $@)
	./tools/CuraJS-Engine.sh > $@

build/CuraEngineInternal.js: tmp/CuraJS-Engine.js res/CuraEngineInternal.js
	mkdir -p $(dir $@)
	sed -e '/INSERT-CURA-ENGINE-COMPILED/ {' -e 'r $<' -e 'd' -e '}' res/CuraEngineInternal.js > $@

testEngine: build/CuraEngineInternal.js examples/index.js
	node examples/index.js


build/CuraJS.js: dist/CuraJS.js build/CuraEngineInternal.js
	./node_modules/browserify/bin/cmd.js $< -o $@

dist/CuraJS.js: src/CuraJS.ts
	./node_modules/typescript/bin/tsc --outDir dist/ $<
