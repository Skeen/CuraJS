#################
# PHONY TARGETS #
#################
all: build/browser/CuraJS.js build/node/CuraJS.js

example: all
	node examples/index.js

test: all
	./node_modules/mocha/bin/mocha --timeout 15000

docs: all
	./node_modules/typedoc/bin/typedoc --out docs src/

clean:
	rm -rf dist build

.PHONY: example test docs clean

#################
# BUILD TARGETS #
#################
tmp/CuraJS-Engine.js:
	mkdir -p $(dir $@)
	./tools/CuraJS-Engine.sh > $@

build/CuraEngineInternal.js: tmp/CuraJS-Engine.js res/CuraEngineInternal.js
	mkdir -p $(dir $@)
	sed -e '/INSERT-CURA-ENGINE-COMPILED/ {' -e 'r $<' -e 'd' -e '}' res/CuraEngineInternal.js > $@

build/browser/CuraJS.js: dist/CuraJS.js build/CuraEngineInternal.js
	mkdir -p $(dir $@)
	./node_modules/browserify/bin/cmd.js $< -s slicer -o $@

build/node/CuraJS.js: dist/CuraJS.js build/CuraEngineInternal.js
	mkdir -p $(dir $@)
	./node_modules/browserify/bin/cmd.js $< -s slicer --node -o $@

typings/index.d.ts:
	./node_modules/typings/dist/bin.js install

TSFILES=$(wildcard src/*.ts)
dist/CuraJS.js: $(TSFILES) typings/index.d.ts
	mkdir -p $(dir $@)
	./node_modules/typescript/bin/tsc --outDir dist/ src/CuraJS.ts
